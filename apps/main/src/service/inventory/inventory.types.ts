export interface ProductAttribute {
  [key: string]: string[];
}

export interface Product {
  id: number;
  name: string;
  SKU: string;
  unit_cost_price: number;
  unit_retail_price: number;
  quantity: number;
  reorder_value: number;
  description: string;
  tags: string;
  images?: { url: string }[];
  product_creation_format?: 'catalogue' | 'manual';
  attributes?: ProductAttribute;
  identifier_no?: string;
  measurement_unit?: string;
}

export interface ProductSearchParams {
  paginate?: number;
  q?: string;
  limit?: number;
  date_filter?: string;
  sort_by?: 'alphabetically' | 'date_ascending' | 'date_descending';
  export?: 'csv';
}
