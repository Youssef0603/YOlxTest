import { useEffect, useMemo, useState } from 'react';

import { searchOlxAds } from '@/shared/api/olx/client';
import { resolveOlxLanguage } from '@/shared/api/olx/search';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import {
  buildFeaturedBusinessesFromAds,
  mapOlxAdToEliteSearchListing,
  mapOlxAdToFeaturedSearchListing,
} from '@/features/search/model/olxMappers';
import { buildOlxAdsSearchBody } from '@/features/search/model/searchQuery';
import {
  getSearchResultsCategoryDefinition,
  SearchResultsCategory,
  SearchResultsContent,
} from '@/features/search/model/searchResults';
import type { SearchFiltersState } from '@/features/search/types/search';

export function useSearchResultsData({
  activeTabKey,
  category,
  filters,
  language,
  query,
  size = 12,
}: {
  activeTabKey?: string;
  category: SearchResultsCategory;
  filters: SearchFiltersState;
  language: string;
  query: string;
  size?: number;
}) {
  const [content, setContent] = useState<SearchResultsContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedQuery = useDebouncedValue(query, 350);
  const debouncedFilters = useDebouncedValue(filters, 250);
  const languageKey = resolveOlxLanguage(language);
  const definition = useMemo(
    () => getSearchResultsCategoryDefinition(category),
    [category],
  );

  const requestBody = useMemo(
    () =>
      buildOlxAdsSearchBody({
        activeTabKey,
        category,
        filters: debouncedFilters,
        query: debouncedQuery,
        size,
      }),
    [activeTabKey, category, debouncedFilters, debouncedQuery, size],
  );

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    searchOlxAds({
      body: requestBody,
      language: languageKey,
    })
      .then(result => {
        if (!isMounted) {
          return;
        }

        const hits = result.responses[0]?.hits.hits.map(hit => hit._source) ?? [];
        const totalCount = result.responses[0]?.hits.total?.value ?? 0;

        if (definition.listingVariant === 'elite') {
          setContent({
            featuredBusinesses: definition.featuredBusinessesEnabled
              ? buildFeaturedBusinessesFromAds({
                  ads: hits,
                  language: languageKey,
                })
              : [],
            listingSectionTitle: definition.listingSectionTitle,
            listings: hits.map(ad =>
              mapOlxAdToEliteSearchListing({
                ad,
                category,
                language: languageKey,
              }),
            ),
            listingVariant: 'elite',
            resultCount: totalCount,
            tabs: definition.tabs,
          });

          return;
        }

        setContent({
          featuredBusinesses: definition.featuredBusinessesEnabled
            ? buildFeaturedBusinessesFromAds({
                ads: hits,
                language: languageKey,
              })
            : [],
          listingSectionTitle: definition.listingSectionTitle,
          listings: hits.map(ad =>
            mapOlxAdToFeaturedSearchListing({
              ad,
              category,
              language: languageKey,
            }),
          ),
          listingVariant: 'featured',
          resultCount: totalCount,
          tabs: definition.tabs,
        });
      })
      .catch(fetchError => {
        if (!isMounted) {
          return;
        }

        setError(fetchError instanceof Error ? fetchError.message : 'Unknown error');
        setContent(null);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [category, definition, languageKey, requestBody]);

  return {
    content,
    error,
    isLoading,
  };
}
