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
  roles: { id: string, name: string }[];
  assigned_roles: string;
  role_id: string | null;
  status: string;
  // store: string;
  // store_id: string;
  store: {
    id: string;
    name: string;
  };
  staffID: string;
  last_active: string | null;
  merchant_account: MerchantAccount[];
  permissions: string[];
}
