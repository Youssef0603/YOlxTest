import {
  OLX_CATEGORIES_ENDPOINT,
  OLX_CATEGORY_FIELDS_ENDPOINT,
  OLX_LANGUAGE_INDEX_SUFFIX,
  OLX_PUBLIC_SEARCH_AUTHORIZATION_HEADER,
  OLX_SEARCH_ENDPOINT,
} from '@/shared/api/olx/config';
import type {
  OlxAd,
  OlxCategory,
  OlxCategoryFieldsResponse,
  OlxLanguage,
  OlxLocation,
  OlxSearchResponse,
} from '@/shared/api/olx/types';

let categoriesPromise: Promise<OlxCategory[]> | null = null;
let categoryFieldsPromise: Promise<OlxCategoryFieldsResponse> | null = null;
const locationsPromises = new Map<string, Promise<OlxLocation[]>>();

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

async function postMsearch<TDocument>(payload: string) {
  const response = await fetch(OLX_SEARCH_ENDPOINT, {
    body: payload,
    headers: {
      Accept: 'application/json',
      Authorization: OLX_PUBLIC_SEARCH_AUTHORIZATION_HEADER,
      'Content-Type': 'application/x-ndjson',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Search request failed with ${response.status}`);
  }

  return (await response.json()) as OlxSearchResponse<TDocument>;
}

function getLanguageIndexSuffix(language: string): OlxLanguage {
  return language === 'ar' ? 'ar' : 'en';
}

export async function fetchOlxCategories() {
  if (!categoriesPromise) {
    categoriesPromise = fetchJson<OlxCategory[]>(OLX_CATEGORIES_ENDPOINT);
  }

  return categoriesPromise;
}

export async function fetchOlxCategoryFields() {
  if (!categoryFieldsPromise) {
    categoryFieldsPromise = fetchJson<OlxCategoryFieldsResponse>(
      OLX_CATEGORY_FIELDS_ENDPOINT,
    );
  }

  return categoryFieldsPromise;
}

export async function searchOlxAds({
  body,
  language,
}: {
  body: Record<string, unknown>;
  language: string;
}) {
  const suffix = OLX_LANGUAGE_INDEX_SUFFIX[getLanguageIndexSuffix(language)];
  const payload = `${JSON.stringify({
    index: `olx-lb-production-ads-${suffix}`,
  })}\n${JSON.stringify(body)}\n`;

  return postMsearch<OlxAd>(payload);
}

export async function fetchOlxLocations({
  hierarchyExternalId,
  language,
  level,
  size = 1000,
}: {
  hierarchyExternalId: string;
  language: string;
  level: number;
  size?: number;
}) {
  const suffix = OLX_LANGUAGE_INDEX_SUFFIX[getLanguageIndexSuffix(language)];
  const cacheKey = `${suffix}:${hierarchyExternalId}:${level}:${size}`;

  if (!locationsPromises.has(cacheKey)) {
    const payload = `${JSON.stringify({
      index: `olx-lb-production-locations-${suffix}`,
    })}\n${JSON.stringify({
      from: 0,
      query: {
        bool: {
          must: [
            {
              term: {
                'hierarchy.externalID': hierarchyExternalId,
              },
            },
            {
              term: {
                level,
              },
            },
          ],
        },
      },
      size,
      sort: [
        {
          name: {
            order: 'asc',
          },
        },
      ],
      timeout: '5s',
      track_total_hits: false,
    })}\n`;

    locationsPromises.set(
      cacheKey,
      postMsearch<OlxLocation>(payload).then(result =>
        result.responses[0]?.hits.hits.map(hit => hit._source) ?? [],
      ),
    );
  }

  return locationsPromises.get(cacheKey)!;
}
