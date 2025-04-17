 import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/data'; 

// Define a User interface with the expected properties
export type User = {
  success: boolean;
  message: string;
  data: any;
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

export const userAtom = atom<any>(loadUserFromStorage());

export const clearUser = () => {
  window.sessionStorage.clear();
};

export const useSessionStorage = () => {
  const [user, setUser] = useAtom(userAtom);

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

  const clearUser = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
    setUser(null);
  };

  return { user, setUser, updateUser, clearUser };
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
