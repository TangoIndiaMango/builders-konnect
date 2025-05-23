interface AuthUser {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export const setAuthUser = (data: AuthUser) => {
  sessionStorage.setItem('auth_user', JSON.stringify(data));
  window.dispatchEvent(new Event('auth-change'));
};

export const getAuthUser = (): AuthUser | null => {
  const user = sessionStorage.getItem('auth_user');
  return user ? JSON.parse(user) : null;
};

export const removeAuthUser = () => {
  sessionStorage.removeItem('auth_user');
  window.dispatchEvent(new Event('auth-change'));
};

export const isAuthenticated = (): boolean => {
  return !!getAuthUser();
};
