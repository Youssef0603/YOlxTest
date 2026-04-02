import { OLX_ROOT_LOCATION_EXTERNAL_ID } from '@/shared/api/olx/config';
import { buildOlxQueryString } from '@/shared/api/olx/search';
import {
  getSearchResultsCategoryDefinition,
  SearchResultsCategory,
} from '@/features/search/model/searchResults';
import type { SearchFiltersState } from '@/features/search/types/search';

function parseRangeValue(value: string) {
  if (!value.trim()) {
    return null;
  }

  const normalizedValue = Number(value.replace(/[^\d.]/g, ''));

  if (!Number.isFinite(normalizedValue)) {
    return null;
  }

  return normalizedValue;
}

export function buildOlxAdsSearchBody({
  activeTabKey,
  category,
  filters,
  from = 0,
  query,
  size,
}: {
  activeTabKey?: string;
  category: SearchResultsCategory;
  filters: SearchFiltersState;
  from?: number;
  query: string;
  size: number;
}) {
  const definition = getSearchResultsCategoryDefinition(category);
  const must: Array<Record<string, unknown>> = [
    {
      term: {
        'category.externalID': definition.externalCategoryId,
      },
    },
    {
      term: {
        'location.externalID':
          filters.locationExternalId || OLX_ROOT_LOCATION_EXTERNAL_ID,
      },
    },
  ];

  const queryString = buildOlxQueryString(query);

  if (queryString) {
    must.push({
      query_string: {
        query: queryString,
      },
    });
  }

  Object.entries(filters.selectedOptions).forEach(([attribute, value]) => {
    if (!value) {
      return;
    }

    must.push({
      term: {
        [`extraFields.${attribute}`]: value,
      },
    });
  });

  Object.entries(filters.ranges).forEach(([attribute, range]) => {
    const min = parseRangeValue(range.min);
    const max = parseRangeValue(range.max);

    if (min === null && max === null) {
      return;
    }

    must.push({
      range: {
        [`extraFields.${attribute}`]: {
          ...(min !== null ? { gte: min } : {}),
          ...(max !== null ? { lte: max } : {}),
        },
      },
    });
  });

  const tabFilter = definition.tabFilters?.[activeTabKey ?? ''];

  if (tabFilter) {
    must.push({
      term: {
        [`extraFields.${tabFilter.attribute}`]: tabFilter.value,
      },
    });
  }

  const sort: Array<Record<string, unknown>> = [];

  if (filters.toggles.verified) {
    sort.push({
      isSellerVerified: {
        order: 'desc',
      },
    });
  }

  sort.push(
    {
      timestamp: {
        order: 'desc',
      },
    },
    {
      id: {
        order: 'desc',
      },
    },
  );

  return {
    from,
    query: {
      bool: {
        must,
      },
    },
    size,
    sort,
    track_total_hits: 200000,
  };
}
