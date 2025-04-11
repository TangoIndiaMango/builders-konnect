import { Outlet } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';

export const frontendBaseUrl = window.location.origin;
const AuthOutlet = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthOutlet;
