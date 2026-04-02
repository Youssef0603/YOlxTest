export type OlxLanguage = 'ar' | 'en';

export type OlxCategory = {
  children: OlxCategory[];
  displayPriority: number;
  externalID: string;
  id: number;
  level: number;
  name: string;
  name_l1?: string;
  parentID: number | null;
  slug: string;
};

export type OlxCategoryFieldChoice = {
  displayPriority?: number | null;
  id: number;
  label: string;
  label_l1?: string;
  value: string;
};

export type OlxCategoryField = {
  attribute: string;
  categoryID: number;
  choices?: OlxCategoryFieldChoice[];
  displayPriority: number;
  filterType: string;
  id: number;
  maxValue?: number | null;
  minValue?: number | null;
  name: string;
  roles: string[];
  valueType: string;
};

export type OlxCategoryFieldsResponse = Record<
  string,
  {
    flatFields: OlxCategoryField[];
  }
>;

export type OlxFormattedField = {
  attribute: string;
  formattedValue: string | string[];
  formattedValue_l1?: string | string[];
  name: string;
  name_l1?: string;
};

export type OlxLocationNode = {
  externalID: string;
  id: number;
  level: number;
  name: string;
  name_l1?: string;
  slug: string;
};

export type OlxPhoto = {
  externalID: string;
  id: number;
  orderIndex: number;
  title: string | null;
};

export type OlxAgency = {
  externalID: string;
  id: number;
  logo?: {
    id: number;
    url: string;
  };
  name: string;
  name_l1?: string;
};

export type OlxAd = {
  activeProducts?: Record<string, unknown> | null;
  agency?: OlxAgency;
  category: OlxLocationNode[];
  coverPhoto?: OlxPhoto;
  createdAt?: number;
  description?: string;
  description_l1?: string;
  externalID: string;
  extraFields: Record<string, string | number | string[] | null>;
  formattedExtraFields?: OlxFormattedField[];
  id: number;
  isSellerVerified?: boolean;
  location: OlxLocationNode[];
  photoCount?: number;
  photos?: OlxPhoto[];
  product?: string | null;
  timestamp?: number;
  title: string;
  title_l1?: string;
};

export type OlxLocation = {
  externalID: string;
  hasChildren: boolean;
  hierarchy: OlxLocationNode[];
  id: number;
  level: number;
  name: string;
  name_l1?: string;
  slug: string;
};

export type OlxSearchHits<TDocument> = {
  total?: {
    relation: string;
    value: number;
  };
  hits: Array<{
    _id: string;
    _source: TDocument;
  }>;
};

export type OlxSearchResponse<TDocument> = {
  responses: Array<{
    error?: {
      reason?: string;
      type?: string;
    };
    hits?: OlxSearchHits<TDocument>;
    status: number;
  }>;
};
