import { Outlet } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';

const AuthOutlet = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthOutlet;
