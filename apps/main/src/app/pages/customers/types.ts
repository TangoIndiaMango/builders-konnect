export interface Review {
    id: number;
    customerID: string;
    customer_name: string;
    feedback: string;
    ratings: string;
    feedback_date: string; 
    response: string;
};

export interface Product {
  id?: string;
  name? : string;
  SKU?: string;
  ean?: string;
  category?: string | null;
  subcategory?: string | null;
  product_type?: string | null;
  retail_price?: string;
  cost_price?: string;
  metadata?: any | null;
  description?: string | null;
  tags?: any | null;
  quantity?: number;
  measurement_unit?: string;
  reorder_value?: number | null;
  primary_media_url?: string;
  media?: string[];
  total_reviews?: number;
  ratings?: number;
};
 

