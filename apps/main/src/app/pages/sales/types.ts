export interface DiscountType {
  all_products: number;
  category: number | null;
  code: string;
  created_at: string;
  created_by: number;
  end_date: string;
  id: number;
  name: string;
  redemption_count: number;
  start_date: string;
  status: string;
  type: string;
  updated_at: string;
  value: string;
}

export interface ProductType {
  id: string;
  name: string;
  SKU: string;
  ean: string;
  category: string | null;
  subcategory: string | null;
  product_type: string | null;
  retail_price: string;
  cost_price: string;
  metadata: string | null;
  description: string | null;
  tags: string | null;
  quantity: number;
  measurement_unit: string | null;
  reorder_value: string | null;
  primary_media_url: string;
  media: string[];
  totalPrice: number;
}


export interface OrderSummary {
  discount_breakdown: { [key: number]: number };
  fees: {
    tax: number;
    service_fee: number;
  };
  items_count: number;
  sales_order_discount: number;
  subtotal: number;
  total: number;
  total_item_quantity: number;
  total_product_discount: number;
}

export interface CustomerType {
  id: number;
  identifier_no: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  provider: string | null;
  provider_id: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  source: string;
}
