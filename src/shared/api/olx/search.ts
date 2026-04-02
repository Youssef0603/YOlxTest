import type { ImageSourcePropType } from 'react-native';

import {
  OLX_DEFAULT_THUMBNAIL_SIZE,
  OLX_THUMBNAILS_BASE_URL,
} from '@/shared/api/olx/config';
import type {
  OlxAd,
  OlxCategory,
  OlxCategoryField,
  OlxLanguage,
  OlxLocation,
} from '@/shared/api/olx/types';

export function resolveOlxLanguage(language?: string | null): OlxLanguage {
  return language === 'ar' ? 'ar' : 'en';
}

export function getLocalizedLabel({
  arabic,
  english,
  language,
}: {
  arabic?: string | null;
  english?: string | null;
  language: string;
}) {
  if (language === 'ar') {
    return arabic ?? english ?? '';
  }

  return english ?? arabic ?? '';
}

export function buildOlxThumbnailSource(
  photoId?: number,
  fallbackSource?: ImageSourcePropType,
): ImageSourcePropType {
  if (!photoId) {
    return fallbackSource ?? require('../../../assets/images/banner1.jpg');
  }

  return {
    uri: `${OLX_THUMBNAILS_BASE_URL}/${photoId}-${OLX_DEFAULT_THUMBNAIL_SIZE}.webp`,
  };
}

export function getOlxFormattedFieldValue({
  ad,
  attribute,
  language,
}: {
  ad: OlxAd;
  attribute: string;
  language: string;
}) {
  const field = ad.formattedExtraFields?.find(item => item.attribute === attribute);

  if (!field) {
    return null;
  }

  const value =
    language === 'ar' ? field.formattedValue_l1 ?? field.formattedValue : field.formattedValue;

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value;
}

export function buildOlxLocationLabel({
  ad,
  language,
}: {
  ad: Pick<OlxAd, 'location'>;
  language: string;
}) {
  const locationParts = [...ad.location]
    .sort((left, right) => left.level - right.level)
    .slice(-2)
    .map(item =>
      getLocalizedLabel({
        arabic: item.name_l1,
        english: item.name,
        language,
      }),
    )
    .filter(Boolean);

  return locationParts.join(', ');
}

export function getOlxAgencyLogoSource(ad: OlxAd) {
  if (!ad.agency?.logo?.url) {
    return undefined;
  }

  return {
    uri: ad.agency.logo.url,
  } as const;
}

export function getOlxLocalizedCategoryName({
  category,
  language,
}: {
  category: Pick<OlxCategory, 'name' | 'name_l1'>;
  language: string;
}) {
  return getLocalizedLabel({
    arabic: category.name_l1,
    english: category.name,
    language,
  });
}

export function getOlxLocalizedLocationName({
  location,
  language,
}: {
  language: string;
  location: Pick<OlxLocation, 'name' | 'name_l1'>;
}) {
  return getLocalizedLabel({
    arabic: location.name_l1,
    english: location.name,
    language,
  });
}

export function getOlxLocalizedFieldName({
  field,
  language,
}: {
  field: Pick<OlxCategoryField, 'name'> & {
    name_l1?: string;
  };
  language: string;
}) {
  return getLocalizedLabel({
    arabic: field.name_l1,
    english: field.name,
    language,
  });
}

export function escapeOlxQueryStringTerm(term: string) {
  return term.replace(/([+\-=&|><!(){}\[\]^"~*?:\\/])/g, '\\$1');
}

export function buildOlxQueryString(query: string) {
  const tokens = query
    .trim()
    .split(/\s+/)
    .map(token => escapeOlxQueryStringTerm(token))
    .filter(Boolean);

  if (!tokens.length) {
    return null;
  }

  return tokens.map(token => `${token}*`).join(' AND ');
}
