import { useEffect, useState } from 'react';

import { fetchOlxCategories, searchOlxAds } from '@/shared/api/olx/client';
import { OLX_ROOT_LOCATION_EXTERNAL_ID } from '@/shared/api/olx/config';
import { resolveOlxLanguage } from '@/shared/api/olx/search';
import type { CategoryItem } from '@/shared/types/category';
import type { ListingItem } from '@/features/listings/model/listing';
import {
  getSearchResultsCategoryDefinition,
  SEARCH_RESULTS_CATEGORIES,
} from '@/features/search/model/searchResults';
import { mapOlxAdToHomeListing } from '@/features/search/model/olxMappers';

type HomeScreenData = {
  apartmentsAndVillasForSale: ListingItem[];
  categories: CategoryItem[];
  carsForSale: ListingItem[];
  error: string | null;
  isLoading: boolean;
  mobilePhones: ListingItem[];
};

const HOME_CATEGORY_IMAGE_SOURCES: Record<string, number> = {
  '129': require('../../../assets/images/vehicles.png'),
  '138': require('../../../assets/images/property.png'),
  '147': require('../../../assets/images/mobile-phones-accessories.png'),
  '20': require('../../../assets/images/electronics-home-appliances.png'),
  '6': require('../../../assets/images/home-furniture-decor.png'),
  '17': require('../../../assets/images/business-industrial.png'),
};

function buildHomeSearchBody(categoryExternalId: string) {
  return {
    from: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              'category.externalID': categoryExternalId,
            },
          },
          {
            term: {
              'location.externalID': OLX_ROOT_LOCATION_EXTERNAL_ID,
            },
          },
        ],
      },
    },
    size: 10,
    sort: [
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
    ],
    track_total_hits: 200000,
  };
}

export function useHomeScreenData(language: string): HomeScreenData {
  const [data, setData] = useState<HomeScreenData>({
    apartmentsAndVillasForSale: [],
    carsForSale: [],
    categories: [],
    error: null,
    isLoading: true,
    mobilePhones: [],
  });

  useEffect(() => {
    let isMounted = true;
    const languageKey = resolveOlxLanguage(language);
    const propertyDefinition = getSearchResultsCategoryDefinition(
      SEARCH_RESULTS_CATEGORIES.APARTMENTS_VILLAS_FOR_SALE,
    );
    const carsDefinition = getSearchResultsCategoryDefinition(
      SEARCH_RESULTS_CATEGORIES.CARS_FOR_SALE,
    );
    const mobilesDefinition = getSearchResultsCategoryDefinition(
      SEARCH_RESULTS_CATEGORIES.MOBILE_PHONES,
    );

    setData(current => ({
      ...current,
      error: null,
      isLoading: true,
    }));

    Promise.all([
      fetchOlxCategories(),
      searchOlxAds({
        body: buildHomeSearchBody(propertyDefinition.externalCategoryId),
        language: languageKey,
      }),
      searchOlxAds({
        body: buildHomeSearchBody(carsDefinition.externalCategoryId),
        language: languageKey,
      }),
      searchOlxAds({
        body: buildHomeSearchBody(mobilesDefinition.externalCategoryId),
        language: languageKey,
      }),
    ])
      .then(([categories, propertiesResponse, carsResponse, mobilesResponse]) => {
        if (!isMounted) {
          return;
        }

        const homeCategories = categories
          .filter(category => category.level === 0)
          .sort((left, right) => left.displayPriority - right.displayPriority)
          .slice(0, 6)
          .map(category => ({
            id: category.externalID,
            imageSource:
              HOME_CATEGORY_IMAGE_SOURCES[category.externalID] ??
              require('../../../assets/images/vehicles.png'),
            label:
              languageKey === 'ar'
                ? category.name_l1 ?? category.name
                : category.name,
          }));

        setData({
          apartmentsAndVillasForSale:
            propertiesResponse.responses[0]?.hits.hits.map(hit =>
              mapOlxAdToHomeListing({
                ad: hit._source,
                category: SEARCH_RESULTS_CATEGORIES.APARTMENTS_VILLAS_FOR_SALE,
                language: languageKey,
              }),
            ) ?? [],
          carsForSale:
            carsResponse.responses[0]?.hits.hits.map(hit =>
              mapOlxAdToHomeListing({
                ad: hit._source,
                category: SEARCH_RESULTS_CATEGORIES.CARS_FOR_SALE,
                language: languageKey,
              }),
            ) ?? [],
          categories: homeCategories,
          error: null,
          isLoading: false,
          mobilePhones:
            mobilesResponse.responses[0]?.hits.hits.map(hit =>
              mapOlxAdToHomeListing({
                ad: hit._source,
                category: SEARCH_RESULTS_CATEGORIES.MOBILE_PHONES,
                language: languageKey,
              }),
            ) ?? [],
        });
      })
      .catch(fetchError => {
        if (!isMounted) {
          return;
        }

        setData({
          apartmentsAndVillasForSale: [],
          carsForSale: [],
          categories: [],
          error: fetchError instanceof Error ? fetchError.message : 'Unknown error',
          isLoading: false,
          mobilePhones: [],
        });
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return data;
}
