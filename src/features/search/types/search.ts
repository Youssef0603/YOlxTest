export const ANY_FILTER_OPTION_VALUE = '__any__';

export type SearchFilterRange = {
  max: string;
  min: string;
};

export type SearchFiltersState = {
  locationExternalId: string;
  locationLabel: string;
  ranges: Record<string, SearchFilterRange>;
  selectedOptionLabels: Record<string, string>;
  selectedOptions: Record<string, string>;
  toggles: Record<string, boolean>;
};
