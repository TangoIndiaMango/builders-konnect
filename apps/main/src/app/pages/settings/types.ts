export interface MerchantAccount {
  id: string;
  name: string;
}

export interface StaffProfile {
  id: string;
  avatar: string | null;
  name: string;
  email: string;
  phone: string;
  role: string | null;
  role_id: string | null;
  status: string;
  store: string;
  store_id: string;
  staffID: string;
  last_active: string | null;
  merchant_account: MerchantAccount[];
  permissions: string[];
}
