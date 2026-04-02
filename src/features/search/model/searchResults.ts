import type { ImageSourcePropType } from 'react-native';

import type { ListingStatItem } from '@/features/listings/model/listing';
import type { IconName } from '@/shared/types/icons';

export const SEARCH_RESULTS_CATEGORIES = {
  APARTMENTS_VILLAS_FOR_SALE: 'Apartments & Villas For Sale',
  CARS_FOR_SALE: 'Cars for Sale',
  MOBILE_PHONES: 'Mobile Phones',
} as const;

export type SearchResultsCategory =
  (typeof SEARCH_RESULTS_CATEGORIES)[keyof typeof SEARCH_RESULTS_CATEGORIES];

export const searchResultsCategories = Object.values(
  SEARCH_RESULTS_CATEGORIES,
) as SearchResultsCategory[];

export function isSearchResultsCategory(
  category: string,
): category is SearchResultsCategory {
  return searchResultsCategories.includes(category as SearchResultsCategory);
}

export type FeaturedBusiness = {
  id: string;
  logoSource?: ImageSourcePropType;
  name: string;
};

export type SearchResultsChip = {
  endIconName?: IconName;
  iconName?: IconName;
  id: string;
  label: string;
  selected?: boolean;
  showChevron?: boolean;
};

export type SearchResultsTabOption = {
  key: string;
  label: string;
};

export type EliteSearchListing = {
  id: string;
  imageSource: ImageSourcePropType;
  location: string;
  partnerLogoSource?: ImageSourcePropType;
  postedAt: string;
  price: string;
  primaryActionIconName: IconName;
  primaryActionLabel?: string;
  primaryActionVariant: 'outlined' | 'soft';
  stats: ListingStatItem[];
  title: string;
};

export type FeaturedSearchListing = {
  id: string;
  imageSource: ImageSourcePropType;
  location: string;
  partnerLogoSource: ImageSourcePropType;
  postedAt: string;
  price: string;
  title: string;
  verifiedLabel?: string;
};

type SearchResultsContentBase = {
  featuredBusinesses: FeaturedBusiness[];
  listingSectionTitle: string;
  resultCount: number;
  tabs: SearchResultsTabOption[];
};

export type SearchResultsContent =
  | (SearchResultsContentBase & {
      listings: EliteSearchListing[];
      listingVariant: 'elite';
    })
  | (SearchResultsContentBase & {
      listings: FeaturedSearchListing[];
      listingVariant: 'featured';
    });

export type SearchResultsTabFilter = {
  attribute: string;
  value: string;
};

export type SearchResultsCategoryDefinition = {
  categoryChipLabel: string;
  categoryId: number;
  categoryImageSource: ImageSourcePropType;
  externalCategoryId: string;
  fallbackCardImageSource: ImageSourcePropType;
  fallbackPartnerLogoSource?: ImageSourcePropType;
  featuredBusinessesEnabled: boolean;
  listingSectionTitle: string;
  listingVariant: 'elite' | 'featured';
  parentLabel: string;
  searchLabel: string;
  tabFilters?: Record<string, SearchResultsTabFilter>;
  tabs: SearchResultsTabOption[];
};

export const searchResultsCategoryDefinitions: Record<
  SearchResultsCategory,
  SearchResultsCategoryDefinition
> = {
  [SEARCH_RESULTS_CATEGORIES.APARTMENTS_VILLAS_FOR_SALE]: {
    categoryChipLabel: 'Apartments & Villas For Sale',
    categoryId: 60,
    categoryImageSource: require('../../../assets/images/property.png'),
    externalCategoryId: '95',
    fallbackCardImageSource: require('../../../assets/images/p1.webp'),
    fallbackPartnerLogoSource: require('../../../assets/images/cproperties.webp'),
    featuredBusinessesEnabled: true,
    listingSectionTitle: 'Elite Ads',
    listingVariant: 'elite',
    parentLabel: 'Properties',
    searchLabel: 'Apartments & Villas For Sale',
    tabFilters: {
      company: {
        attribute: 'ownership',
        value: 'resale',
      },
      owner: {
        attribute: 'ownership',
        value: 'primary',
      },
    },
    tabs: [
      { key: 'all', label: 'All' },
      { key: 'owner', label: 'By Owner' },
      { key: 'company', label: 'By Company' },
    ],
  },
  [SEARCH_RESULTS_CATEGORIES.CARS_FOR_SALE]: {
    categoryChipLabel: 'Cars for Sale',
    categoryId: 51,
    categoryImageSource: require('../../../assets/images/vehicles.png'),
    externalCategoryId: '23',
    fallbackCardImageSource: require('../../../assets/images/v1.webp'),
    featuredBusinessesEnabled: true,
    listingSectionTitle: 'Elite Ads',
    listingVariant: 'elite',
    parentLabel: 'Vehicles',
    searchLabel: 'Cars for Sale',
    tabFilters: {
      new: {
        attribute: 'new_used',
        value: '1',
      },
      used: {
        attribute: 'new_used',
        value: '2',
      },
    },
    tabs: [
      { key: 'all', label: 'All' },
      { key: 'new', label: 'New' },
      { key: 'used', label: 'Used' },
    ],
  },
  [SEARCH_RESULTS_CATEGORIES.MOBILE_PHONES]: {
    categoryChipLabel: 'Mobile Phones',
    categoryId: 70,
    categoryImageSource: require('../../../assets/images/mobile-phones-accessories.png'),
    externalCategoryId: '9',
    fallbackCardImageSource: require('../../../assets/images/m1.webp'),
    fallbackPartnerLogoSource: require('../../../assets/images/mbrand.webp'),
    featuredBusinessesEnabled: false,
    listingSectionTitle: 'Featured Ads',
    listingVariant: 'featured',
    parentLabel: 'Mobile Phones & Accessories',
    searchLabel: 'Mobile Phones',
    tabs: [],
  },
};

export function getSearchResultsCategoryDefinition(
  category: SearchResultsCategory,
) {
  return searchResultsCategoryDefinitions[category];
}
