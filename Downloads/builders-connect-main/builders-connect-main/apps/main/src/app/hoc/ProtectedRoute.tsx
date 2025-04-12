import { login } from '../../utils/data';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, clearUser } = useSessionStorage();

  if (!user) {
    clearUser();
    return <Navigate to={login} />;
  }

  return <div>{children}</div>;
};
