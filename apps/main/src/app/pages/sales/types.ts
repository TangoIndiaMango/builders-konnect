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

  export interface SalesOrder {
    id: string;
    order_number: string;
    receipt_no: string;
    items_count: number;
    customer: Customer;
    date: string;
    amount: number;
    payment_status: string;
    status: string;
  }

  export interface Customer {
    name: string;
    email: string;
    phone: string;
  }

  export interface SingleSalesOrder {
    id: string;
    order_number: string;
    receipt_no: string;
    items_count: number;
    customer: Customer;
    date: string;
    amount: number;
    payment_status: string;
    status: string;
    sales_type: string;
    payment_methods: PaymentMethod[];
    billing_address: string;
    shipping_address: string;
    line_items: LineItem[];
    subtotal: number;
    discount_breakdown: DiscountBreakdown;
    fees: Fees;
  }


  export interface PaymentMethod {
    method: string;
    amount: string;
  }

  export interface LineItem {
    product: string;
    quantity: number;
    unit_cost: number;
    discounted_amount: number;
    total_cost: string;
  }

  export interface DiscountBreakdown {
    total_product_discounts: number;
    order_discount: number;
  }

  export interface Fees {
    tax: number;
    service_fee: number;
  }
