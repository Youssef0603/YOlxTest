import { useEffect, useMemo, useState } from 'react';

import { fetchOlxCategoryFields, fetchOlxLocations } from '@/shared/api/olx/client';
import { OLX_ROOT_LOCATION_EXTERNAL_ID } from '@/shared/api/olx/config';
import { resolveOlxLanguage } from '@/shared/api/olx/search';
import type { OlxCategoryField, OlxLocation } from '@/shared/api/olx/types';
import { buildSearchFiltersContent } from '@/features/search/model/searchFilters';
import {
  getSearchResultsCategoryDefinition,
  SearchResultsCategory,
} from '@/features/search/model/searchResults';
import type { SearchFiltersState } from '@/features/search/types/search';
import type { SearchFiltersContent } from '@/features/search/model/searchFilters';

export function useSearchFiltersData({
  category,
  filtersState,
  language,
}: {
  category: SearchResultsCategory;
  filtersState: SearchFiltersState;
  language: string;
}) {
  const [content, setContent] = useState<SearchFiltersContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<OlxCategoryField[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<OlxLocation[] | null>(null);
  const definition = useMemo(
    () => getSearchResultsCategoryDefinition(category),
    [category],
  );
  const languageKey = resolveOlxLanguage(language);

  useEffect(() => {
    let isMounted = true;

    setContent(null);
    setFields(null);
    setIsLoading(true);
    setLocations(null);
    setError(null);

    Promise.all([
      fetchOlxCategoryFields(),
      fetchOlxLocations({
        hierarchyExternalId: OLX_ROOT_LOCATION_EXTERNAL_ID,
        language: languageKey,
        level: 1,
      }),
    ])
      .then(([categoryFields, locations]) => {
        if (!isMounted) {
          return;
        }

        setFields(categoryFields[String(definition.categoryId)]?.flatFields ?? []);
        setLocations(locations);
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
  }, [definition.categoryId, languageKey]);

  useEffect(() => {
    if (!fields || !locations) {
      return;
    }

    setContent(
      buildSearchFiltersContent({
        category,
        fields,
        filtersState,
        language: languageKey,
        locations,
      }),
    );
  }, [category, fields, filtersState, languageKey, locations]);

  return {
    content,
    error,
    isLoading,
  };
}
