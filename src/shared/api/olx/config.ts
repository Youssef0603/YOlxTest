export const OLX_CATEGORIES_ENDPOINT = 'https://www.olx.com.lb/api/categories';

export const OLX_CATEGORY_FIELDS_ENDPOINT =
  'https://www.olx.com.lb/api/categoryFields?includeChildCategories=true&splitByCategoryIDs=true&flatChoices=true&groupChoicesBySection=true&flat=true';

export const OLX_SEARCH_ENDPOINT = 'https://search.mena.sector.run/_msearch';

export const OLX_PUBLIC_SEARCH_AUTHORIZATION_HEADER =
  'Basic b2x4LWxiLXByb2R1Y3Rpb24tc2VhcmNoOj5zK08zPXM5QEk0REYwSWEldWc/N1FQdXkye0RqW0Zy';

export const OLX_THUMBNAILS_BASE_URL = 'https://images.olx.com.lb/thumbnails';

export const OLX_DEFAULT_THUMBNAIL_SIZE = '400x300';

export const OLX_ROOT_LOCATION_EXTERNAL_ID = '0-1';

export const OLX_ROOT_LOCATION_LABEL = 'Lebanon';

export const OLX_LANGUAGE_INDEX_SUFFIX = {
  ar: 'ar',
  en: 'en',
} as const;
