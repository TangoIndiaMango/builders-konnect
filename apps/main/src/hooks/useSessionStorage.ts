
import { login } from '../utils/data';
import { atom, useAtom } from 'jotai';

import { useNavigate } from 'react-router-dom';
import { VendorProfile } from '../app/pages/profile/types';

interface MerchantAccount {
  id: string;
  name: string;
}

interface UserProfile {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  role: string | null;
  assigned_roles: string;
  roles: { id: string, name: string }[];
  role_id: string | null;
  status: 'active' | 'inactive';
  store: { id: string, name: string }[];
  store_id: string;
  staffID: string;
  last_active: string | null;
  merchant_account: MerchantAccount[];
  permissions: string[];
  [key: string]: any;
}


// Define a User interface with the expected properties
export type User = {
  success: boolean;
  message: string;
  data: UserProfile;
  statusCode: number;
};

const loadUserFromStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = window.sessionStorage.getItem('user');
    if (user && user !== 'undefined') {
      try {
        return JSON.parse(user) as User;
      } catch (error) {
        console.error('Error parsing user data from sessionStorage', error);
        return null;
      }
    }
  }
  return null;
};

const loadBusinessProfileFromStorage = (): any => {
  if (typeof window !== 'undefined') {
    const businessProfile = window.sessionStorage.getItem('businessProfile');
    return businessProfile ? JSON.parse(businessProfile) : null;
  }
  return null;
};

export const userAtom = atom<any>(loadUserFromStorage());

export const businessProfileAtom = atom<any>(loadBusinessProfileFromStorage());

export const clearUser = () => {
  window.sessionStorage.clear();
};

export const useSessionStorage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [businessProfile, setBusinessProfile] = useAtom<VendorProfile | null>(businessProfileAtom);

  const updateUser = (value: any) => {
    if (typeof window !== 'undefined') {
      if (value) {
        window.sessionStorage.setItem('user', JSON.stringify(value));
      } else {
        window.sessionStorage.removeItem('user');
      }
    }
    setUser(value);
  };

  const updateBusinessProfile = (value: any) => {
    if (typeof window !== 'undefined') {
      if (value) {
        window.sessionStorage.setItem('businessProfile', JSON.stringify(value));
      } else {
        window.sessionStorage.removeItem('businessProfile');
      }
    }
    setBusinessProfile(value);
  };

  const clearUser = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
    setUser(null);
    setBusinessProfile(null);
  };

  return { user, setUser, updateUser, clearUser, businessProfile, setBusinessProfile, updateBusinessProfile };
};

export const useLoggedOut = () => {
  const router = useNavigate();
  const { clearUser } = useSessionStorage();

  const logout = () => {
    clearUser();

    router(login);
  };

  return logout;
};
