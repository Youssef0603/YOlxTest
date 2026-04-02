import {
  OLX_ADS_INDEX_SUFFIX,
  OLX_CATEGORIES_ENDPOINT,
  OLX_CATEGORY_FIELDS_ENDPOINT,
  OLX_LOCATIONS_INDEX_SUFFIX,
  OLX_PUBLIC_SEARCH_AUTHORIZATION_HEADER,
  OLX_SEARCH_ENDPOINT,
} from '@/shared/api/olx/config';
import type {
  OlxAd,
  OlxCategory,
  OlxCategoryFieldsResponse,
  OlxLocation,
  OlxSearchHits,
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
  const payload = `${JSON.stringify({
    index: `olx-lb-production-ads-${OLX_ADS_INDEX_SUFFIX}`,
  })}\n${JSON.stringify(body)}\n`;

  return postMsearch<OlxAd>(payload);
}

export function getOlxSearchHits<TDocument>(response: OlxSearchResponse<TDocument>) {
  const firstResponse = response.responses[0];

  if (!firstResponse) {
    throw new Error('Search response was empty');
  }

  if (!firstResponse.hits) {
    throw new Error(
      firstResponse.error?.reason ?? `Search response failed with ${firstResponse.status}`,
    );
  }

  return firstResponse.hits as OlxSearchHits<TDocument>;
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
  const cacheKey = `${language}:${hierarchyExternalId}:${level}:${size}`;

  if (!locationsPromises.has(cacheKey)) {
    const payload = `${JSON.stringify({
      index: `olx-lb-production-locations-${OLX_LOCATIONS_INDEX_SUFFIX}`,
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
        getOlxSearchHits(result).hits.map(hit => hit._source),
      ),
    );
  }

  return locationsPromises.get(cacheKey)!;
}
