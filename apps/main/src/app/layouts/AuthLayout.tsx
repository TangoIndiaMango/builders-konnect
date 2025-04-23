import React from 'react';

import AuthHeader from '../components/headers/AuthHeader';
import { authBackground } from '../lib/assets/background';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />

      <div
        className="flex-1 p-8 bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(39, 86, 214, 0.3), rgba(0, 51, 153, 0.3)), url(${authBackground})`,
        }}
      >
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
