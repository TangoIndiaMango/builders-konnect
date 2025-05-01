import { PaginatedResponse } from "../../types/paginatedData";

export interface Staff {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  last_active: string;
  location_ids?: string[];
  role_id?: number;
}

export interface StaffStats {
  active: number;
  inactive: number;
  total: number;
}

export interface StaffListResponse {
  data: PaginatedResponse<Staff>;
  stats: StaffStats;
}

export interface Stores {
  id: string;
  storeID: string;
  name: string;
  address: string;
  total_customers: number;
  total_products: number;
  total_sales: number;
  total_staff: number;
  date_created: string;
  status: string;
}

export interface Roles {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}
