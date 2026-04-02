import { searchResultsCategories } from '@/features/search/model/searchResults';

export const popularSearchCategories = searchResultsCategories;

export type PopularSearchCategory = (typeof popularSearchCategories)[number];
