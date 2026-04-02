import type { NavigatorScreenParams } from '@react-navigation/native';

import type { AppTabParamList } from '@/app/navigation/tabs/tabTypes';
import type { SearchResultsCategory } from '@/features/search/model/searchResults';
import type { SearchFiltersState } from '@/features/search/types/search';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList> | undefined;
  Search: undefined;
  SearchFilters: {
    activeTabKey?: string;
    category: SearchResultsCategory;
    filtersState: SearchFiltersState;
    query: string;
  };
  SearchResults: {
    activeTabKey?: string;
    category: SearchResultsCategory;
    filtersState?: SearchFiltersState;
    query?: string;
  };
};
