export interface ProductAttribute {
  [key: string]: string[];
}

export interface ProductData {
  id: string;
  key?: string; // Added for table compatibility
  export?: 'csv' | 'pdf'; // Added for table compatibility
  name: string;
  SKU: string;
  ean: string;
  category: string | null;
  subcategory: string | null;
  product_type: string | null;
  retail_price: string;
  cost_price: string;
  metadata: Record<string, unknown> | null; // Fixed any type
  description: string | null;
  tags: string | null;
  quantity: number;
  measurement_unit: string;
  reorder_value: string | null;
  primary_media_url: string;
  media: string[];
}

export interface ProductStats {
  total_products: string;
  total_products_value: string;
  total_sales: number;
}

export interface ProductResponse {
  error: boolean;
  message: string;
  data: {
    stats: ProductStats;
    data: {
      current_page: number;
      data: ProductData[];
    };
  };
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
  export?: 'csv' | 'pdf';
}
