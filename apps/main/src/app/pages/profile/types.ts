import { PaginatedResponse } from "../../types/paginatedData";


export interface PersonalInfo {
  avatar: string | null;
  name: string;
  email: string;
}

export interface VendorProfile {
  id: string;
  logo: string | null;
  business: BusinessInfo;
  finance: FinanceInfo;
  documents: Documents;
  personal: PersonalInfo;
}

export interface BusinessInfo {
  name: string;
  email: string;
  category: string;
  type: string;
  phone: string;
  vendorID: string;
  address: string;
}

export interface FinanceInfo {
  bank_name: string;
  account_number: string;
  account_name: string;
}

export interface Documents {
  CAC: DocumentFile;
  TIN: DocumentFile;
  proof_of_address: DocumentFile | null;
}

export interface DocumentFile {
  identifier: string | null;
  file: string | null;
}

export interface Store {
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

export interface StoreStats {
  active: number;
  inactive: number;
  total: number;
}

export interface StoreListResponse {
  data: PaginatedResponse<Store>;
  stats: StoreStats;
}

export interface SingleStoreResponse {
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
  total_sales_value: number;
  completed: number;
  processing: number;
  cancelled: number;
  sales_overview: SalesOverview;
}

export interface SalesOverview {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
