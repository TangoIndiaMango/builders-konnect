import { PaginatedResponse } from '../../types/paginatedData';
export interface Discount {
  id: string;
  name: string;
  code: string;
  start_date: string;
  end_date: string;
  percent: string;
  amount: number;
  redemption: number;
  status: string;
}

export interface DiscountStats {
  total: number;
  active: number;
  expired: number;
  scheduled: number;
  used: number;
}

export interface DiscountListResponse {
  data: PaginatedResponse<Discount>;
  stats: DiscountStats;
}

// types/discount.ts
export type DiscountType = 'amount' | 'percentage';

export interface DiscountFormValues {
  name: string;
  transmitter: string;
  code: string | number;
  category: string[];
  start_date: any;
  end_date: any;
  type: DiscountType;
  value: number;
  all_products: boolean;
  discounted_products?: string[];
}