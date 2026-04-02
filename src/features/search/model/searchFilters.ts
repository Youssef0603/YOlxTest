import type { ImageSourcePropType } from 'react-native';

import {
  OLX_ROOT_LOCATION_EXTERNAL_ID,
  OLX_ROOT_LOCATION_LABEL,
} from '@/shared/api/olx/config';
import type {
  OlxCategoryField,
  OlxCategoryFieldChoice,
  OlxLanguage,
  OlxLocation,
} from '@/shared/api/olx/types';
import {
  getLocalizedLabel,
  getOlxLocalizedFieldName,
  getOlxLocalizedLocationName,
} from '@/shared/api/olx/search';
import {
  getSearchResultsCategoryDefinition,
  SEARCH_RESULTS_CATEGORIES,
  SearchResultsCategory,
} from '@/features/search/model/searchResults';
import {
  ANY_FILTER_OPTION_VALUE,
  SearchFiltersState,
} from '@/features/search/types/search';

export type SearchFiltersOption = {
  label: string;
  value: string;
};

export type SearchFiltersSection =
  | {
      actionLabel: string;
      id: string;
      imageSource: ImageSourcePropType;
      kind: 'category';
      parentLabel: string;
      title: string;
      valueLabel: string;
    }
  | {
      fieldAttribute?: string;
      id: string;
      kind: 'row';
      options: SearchFiltersOption[];
      sectionTitle?: string;
      showChevron?: boolean;
      title: string;
      value: string;
    }
  | {
      fieldAttribute: string;
      id: string;
      kind: 'choice';
      options: SearchFiltersOption[];
      title: string;
    }
  | {
      fieldAttribute: string;
      id: string;
      kind: 'range';
      maxPlaceholder: string;
      minPlaceholder: string;
      title: string;
    }
  | {
      fieldAttribute: string;
      id: string;
      kind: 'toggle';
      title: string;
    };

export type SearchFiltersContent = {
  sections: SearchFiltersSection[];
  title: string;
};

type SearchFiltersLayoutConfig = {
  fieldOrder: string[];
  inlineChoiceAttributes: string[];
  sectionTitlesByAttribute?: Partial<Record<string, string>>;
  titleOverrides?: Partial<Record<string, string>>;
};

const HIDDEN_FILTER_ATTRIBUTES = new Set([
  'autumn',
  'black_friday',
  'discounted',
  'eid_collection',
  'highlights',
  'holidays',
  'hot',
  'new_collection',
  'price_type',
  'ramadan',
  'reference_id',
  'save_fifty_percent',
  'save_forty_percent',
  'save_seventy_percent',
  'save_sixty_percent',
  'save_ten_percent',
  'save_thirty_percent',
  'save_twenty_percent',
  'secondary_price',
  'summer',
  'weekly_finds',
  'zero_km',
]);

const filtersLayoutConfig: Record<SearchResultsCategory, SearchFiltersLayoutConfig> =
  {
    [SEARCH_RESULTS_CATEGORIES.CARS_FOR_SALE]: {
      fieldOrder: [
        'make',
        'payment_option',
        'price',
        'new_used',
        'mileage',
        'year',
        'petrol',
        'transmission',
        'body_type',
        'power',
        'consumption',
        'air_con',
        'color',
        'seats',
        'doors',
        'interior',
        'extra_features',
        'seller_type',
        'owners',
        'source',
        'video',
      ],
      inlineChoiceAttributes: ['new_used', 'transmission', 'doors', 'seller_type', 'video'],
      sectionTitlesByAttribute: {
        petrol: 'Highlights',
      },
    },
    [SEARCH_RESULTS_CATEGORIES.APARTMENTS_VILLAS_FOR_SALE]: {
      fieldOrder: [
        'new',
        'property_type',
        'video',
        'ownership',
        'panorama',
        'price',
        'payment_option',
        'rooms',
        'bathrooms',
        'ft',
        'furnished',
        'condition',
        'floor_level',
        'features',
        'property_age',
        'seller_type',
      ],
      inlineChoiceAttributes: [
        'new',
        'video',
        'ownership',
        'panorama',
        'condition',
        'property_age',
        'seller_type',
      ],
      titleOverrides: {
        new: 'Highlights',
      },
    },
    [SEARCH_RESULTS_CATEGORIES.MOBILE_PHONES]: {
      fieldOrder: [
        'deliverable',
        'delivery',
        'video',
        'make',
        'price',
        'new_used',
        'storage',
        'color',
        'seller_type',
      ],
      inlineChoiceAttributes: ['deliverable', 'delivery', 'video', 'new_used', 'seller_type'],
    },
  };

function getAnyOption() {
  return {
    label: 'Any',
    value: ANY_FILTER_OPTION_VALUE,
  };
}

function sortChoices(choices: OlxCategoryFieldChoice[] = []) {
  return [...choices].sort(
    (left, right) => (left.displayPriority ?? 9999) - (right.displayPriority ?? 9999),
  );
}

function mapChoicesToOptions({
  choices,
  language,
}: {
  choices?: OlxCategoryFieldChoice[];
  language: OlxLanguage;
}) {
  const sortedChoices = sortChoices(choices);

  if (!sortedChoices.length) {
    return [];
  }

  return [
    getAnyOption(),
    ...sortedChoices.map(choice => ({
      label: getLocalizedLabel({
        arabic: choice.label_l1,
        english: choice.label,
        language,
      }),
      value: choice.value,
    })),
  ];
}

function buildFieldSection({
  category,
  field,
  filtersState,
  language,
}: {
  category: SearchResultsCategory;
  field: OlxCategoryField;
  filtersState: SearchFiltersState;
  language: OlxLanguage;
}): SearchFiltersSection | null {
  const layout = filtersLayoutConfig[category];
  const titleOverride = layout.titleOverrides?.[field.attribute];
  const title =
    titleOverride ??
    getOlxLocalizedFieldName({
      field,
      language,
    });

  if (field.attribute === 'verified') {
    return {
      fieldAttribute: field.attribute,
      id: field.attribute,
      kind: 'toggle',
      title: 'Show Verified Accounts first',
    };
  }

  if (field.filterType === 'range') {
    return {
      fieldAttribute: field.attribute,
      id: field.attribute,
      kind: 'range',
      maxPlaceholder: 'Max',
      minPlaceholder: 'Min',
      title,
    };
  }

  const options = mapChoicesToOptions({
    choices: field.choices,
    language,
  });

  if (!options.length) {
    return null;
  }

  const selectedLabel =
    filtersState.selectedOptionLabels[field.attribute] ?? getAnyOption().label;
  const sectionTitle = layout.sectionTitlesByAttribute?.[field.attribute];

  if (layout.inlineChoiceAttributes.includes(field.attribute)) {
    return {
      fieldAttribute: field.attribute,
      id: field.attribute,
      kind: 'choice',
      options,
      title,
    };
  }

  return {
    fieldAttribute: field.attribute,
    id: field.attribute,
    kind: 'row',
    options,
    sectionTitle,
    showChevron: true,
    title,
    value: selectedLabel,
  };
}

export function createSearchFiltersState(): SearchFiltersState {
  return {
    locationExternalId: OLX_ROOT_LOCATION_EXTERNAL_ID,
    locationLabel: OLX_ROOT_LOCATION_LABEL,
    ranges: {},
    selectedOptionLabels: {},
    selectedOptions: {},
    toggles: {
      verified: false,
    },
  };
}

export function buildSearchFiltersContent({
  category,
  fields,
  filtersState,
  language,
  locations,
}: {
  category: SearchResultsCategory;
  fields: OlxCategoryField[];
  filtersState: SearchFiltersState;
  language: OlxLanguage;
  locations: OlxLocation[];
}): SearchFiltersContent {
  const definition = getSearchResultsCategoryDefinition(category);
  const layout = filtersLayoutConfig[category];
  const fieldsByAttribute = new Map(fields.map(field => [field.attribute, field]));
  const orderedAttributes = new Set(layout.fieldOrder);
  const locationOptions = [
    {
      label: OLX_ROOT_LOCATION_LABEL,
      value: OLX_ROOT_LOCATION_EXTERNAL_ID,
    },
    ...locations.map(location => ({
      label: getOlxLocalizedLocationName({
        language,
        location,
      }),
      value: location.externalID,
    })),
  ];

  const sections: SearchFiltersSection[] = [
    {
      actionLabel: 'Change',
      id: 'category',
      imageSource: definition.categoryImageSource,
      kind: 'category',
      parentLabel: definition.parentLabel,
      title: 'Category',
      valueLabel: definition.categoryChipLabel,
    },
    {
      fieldAttribute: 'location',
      id: 'location',
      kind: 'row',
      options: locationOptions,
      showChevron: true,
      title: 'Location',
      value: filtersState.locationLabel,
    },
  ];

  const orderedFields = layout.fieldOrder
    .map(attribute => fieldsByAttribute.get(attribute))
    .filter((field): field is OlxCategoryField => Boolean(field));

  const remainingFields = [...fields]
    .filter(
      field =>
        !orderedAttributes.has(field.attribute) &&
        !HIDDEN_FILTER_ATTRIBUTES.has(field.attribute) &&
        field.attribute !== 'verified',
    )
    .sort((left, right) => left.displayPriority - right.displayPriority);

  [...orderedFields, ...remainingFields].forEach(field => {
    const section = buildFieldSection({
      category,
      field,
      filtersState,
      language,
    });

    if (section) {
      sections.push(section);
    }
  });

  sections.push({
    fieldAttribute: 'verified',
    id: 'verified',
    kind: 'toggle',
    title: 'Show Verified Accounts first',
  });

  return {
    sections,
    title: 'Filters',
  };
}

export function hasSearchFilters(category: SearchResultsCategory) {
  return Boolean(filtersLayoutConfig[category]);
}

export function isSearchFiltersEntryChip(
  category: SearchResultsCategory,
  chipId: string,
) {
  if (category === SEARCH_RESULTS_CATEGORIES.CARS_FOR_SALE) {
    return chipId === 'cars-filters' || chipId === 'cars-category';
  }

  if (category === SEARCH_RESULTS_CATEGORIES.APARTMENTS_VILLAS_FOR_SALE) {
    return chipId === 'properties-filters' || chipId === 'properties-category';
  }

  if (category === SEARCH_RESULTS_CATEGORIES.MOBILE_PHONES) {
    return chipId === 'mobiles-filters' || chipId === 'mobiles-category';
  }

  return false;
}

export function hasActiveSearchFilters(filtersState: SearchFiltersState) {
  if (filtersState.locationExternalId !== OLX_ROOT_LOCATION_EXTERNAL_ID) {
    return true;
  }

  if (Object.values(filtersState.selectedOptions).some(Boolean)) {
    return true;
  }

  if (
    Object.values(filtersState.ranges).some(
      range => Boolean(range.min.trim() || range.max.trim()),
    )
  ) {
    return true;
  }

  return Object.values(filtersState.toggles).some(Boolean);
}
