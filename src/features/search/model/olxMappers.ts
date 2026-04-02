import type { ImageSourcePropType } from 'react-native';

import { formatCurrency } from '@/shared/lib/formatCurrency';
import { formatRelativeTime } from '@/shared/lib/formatRelativeTime';
import type { OlxAd } from '@/shared/api/olx/types';
import {
  buildOlxLocationLabel,
  buildOlxThumbnailSource,
  getOlxAgencyLogoSource,
  getOlxFormattedFieldValue,
} from '@/shared/api/olx/search';
import type { ListingItem, ListingStatItem } from '@/features/listings/model/listing';
import type {
  EliteSearchListing,
  FeaturedBusiness,
  FeaturedSearchListing,
  SearchResultsCategory,
} from '@/features/search/model/searchResults';
import { getSearchResultsCategoryDefinition } from '@/features/search/model/searchResults';

function buildHomeListingStats({
  ad,
  category,
  language,
}: {
  ad: OlxAd;
  category: SearchResultsCategory;
  language: string;
}): ListingStatItem[] {
  if (category === 'Cars for Sale') {
    const year = getOlxFormattedFieldValue({
      ad,
      attribute: 'year',
      language,
    });
    const mileage = getOlxFormattedFieldValue({
      ad,
      attribute: 'mileage',
      language,
    });

    if (!year && !mileage) {
      return [];
    }

    return [
      {
        iconName: 'speed',
        id: 'vehicle-meta',
        value: [year, mileage ? `${mileage} km` : null].filter(Boolean).join(' - '),
      },
    ];
  }

  if (category === 'Apartments & Villas For Sale') {
    return [
      {
        iconName: 'hotel',
        id: 'rooms',
        value:
          getOlxFormattedFieldValue({
            ad,
            attribute: 'rooms',
            language,
          }) ?? '-',
      },
      {
        iconName: 'bathtub',
        id: 'bathrooms',
        value:
          getOlxFormattedFieldValue({
            ad,
            attribute: 'bathrooms',
            language,
          }) ?? '-',
      },
      {
        iconName: 'square-foot',
        id: 'size',
        value:
          getOlxFormattedFieldValue({
            ad,
            attribute: 'ft',
            language,
          }) ?? '-',
      },
    ];
  }

  return [];
}

function buildEliteListingStats({
  ad,
  category,
  language,
}: {
  ad: OlxAd;
  category: SearchResultsCategory;
  language: string;
}) {
  if (category === 'Cars for Sale') {
    return [
      {
        iconName: 'calendar-month',
        id: 'year',
        value:
          getOlxFormattedFieldValue({
            ad,
            attribute: 'year',
            language,
          }) ?? '-',
      },
      {
        iconName: 'speed',
        id: 'mileage',
        value:
          getOlxFormattedFieldValue({
            ad,
            attribute: 'mileage',
            language,
          }) ?? '-',
      },
      {
        iconName: 'local-gas-station',
        id: 'fuel',
        value:
          getOlxFormattedFieldValue({
            ad,
            attribute: 'petrol',
            language,
          }) ?? '-',
      },
    ] as ListingStatItem[];
  }

  return buildHomeListingStats({
    ad,
    category,
    language,
  });
}

function getAdPrice({
  ad,
  language,
}: {
  ad: OlxAd;
  language: string;
}) {
  const priceValue = ad.extraFields.price;
  const numericPrice =
    typeof priceValue === 'number' ? priceValue : Number(priceValue ?? 0);

  return formatCurrency({
    language,
    value: numericPrice,
  });
}

function getPostedAt({
  ad,
  language,
}: {
  ad: OlxAd;
  language: string;
}) {
  return formatRelativeTime({
    language,
    timestampSeconds: ad.timestamp ?? ad.createdAt,
  });
}

export function mapOlxAdToHomeListing({
  ad,
  category,
  language,
}: {
  ad: OlxAd;
  category: SearchResultsCategory;
  language: string;
}): ListingItem {
  const definition = getSearchResultsCategoryDefinition(category);

  return {
    id: ad.externalID,
    imageSource: buildOlxThumbnailSource(
      ad.coverPhoto?.id ?? ad.photos?.[0]?.id,
      definition.fallbackCardImageSource,
    ),
    location: buildOlxLocationLabel({
      ad,
      language,
    }),
    postedAt: getPostedAt({
      ad,
      language,
    }),
    price: getAdPrice({
      ad,
      language,
    }),
    stats: buildHomeListingStats({
      ad,
      category,
      language,
    }),
    title: language === 'ar' ? ad.title_l1 ?? ad.title : ad.title,
  };
}

export function mapOlxAdToEliteSearchListing({
  ad,
  category,
  language,
}: {
  ad: OlxAd;
  category: SearchResultsCategory;
  language: string;
}): EliteSearchListing {
  const definition = getSearchResultsCategoryDefinition(category);

  return {
    id: ad.externalID,
    imageSource: buildOlxThumbnailSource(
      ad.coverPhoto?.id ?? ad.photos?.[0]?.id,
      definition.fallbackCardImageSource,
    ),
    location: buildOlxLocationLabel({
      ad,
      language,
    }),
    partnerLogoSource:
      getOlxAgencyLogoSource(ad) ?? definition.fallbackPartnerLogoSource,
    postedAt: getPostedAt({
      ad,
      language,
    }),
    price: getAdPrice({
      ad,
      language,
    }),
    primaryActionIconName: category === 'Cars for Sale' ? 'mail-outline' : 'message',
    primaryActionLabel: category === 'Cars for Sale' ? 'SMS' : undefined,
    primaryActionVariant: category === 'Cars for Sale' ? 'outlined' : 'soft',
    stats: buildEliteListingStats({
      ad,
      category,
      language,
    }),
    title: language === 'ar' ? ad.title_l1 ?? ad.title : ad.title,
  };
}

export function mapOlxAdToFeaturedSearchListing({
  ad,
  category,
  language,
}: {
  ad: OlxAd;
  category: SearchResultsCategory;
  language: string;
}): FeaturedSearchListing {
  const definition = getSearchResultsCategoryDefinition(category);

  return {
    id: ad.externalID,
    imageSource: buildOlxThumbnailSource(
      ad.coverPhoto?.id ?? ad.photos?.[0]?.id,
      definition.fallbackCardImageSource,
    ),
    location: buildOlxLocationLabel({
      ad,
      language,
    }),
    partnerLogoSource:
      getOlxAgencyLogoSource(ad) ?? definition.fallbackPartnerLogoSource!,
    postedAt: getPostedAt({
      ad,
      language,
    }),
    price: getAdPrice({
      ad,
      language,
    }),
    title: language === 'ar' ? ad.title_l1 ?? ad.title : ad.title,
    verifiedLabel:
      ad.agency || ad.isSellerVerified ? 'Verified Business' : undefined,
  };
}

export function buildFeaturedBusinessesFromAds({
  ads,
  language,
}: {
  ads: OlxAd[];
  language: string;
}): FeaturedBusiness[] {
  const byAgencyId = new Map<number, FeaturedBusiness>();

  ads.forEach(ad => {
    if (!ad.agency?.logo?.url || byAgencyId.has(ad.agency.id)) {
      return;
    }

    byAgencyId.set(ad.agency.id, {
      id: String(ad.agency.id),
      logoSource: {
        uri: ad.agency.logo.url,
      },
      name: language === 'ar' ? ad.agency.name_l1 ?? ad.agency.name : ad.agency.name,
    });
  });

  return [...byAgencyId.values()].slice(0, 3);
}
