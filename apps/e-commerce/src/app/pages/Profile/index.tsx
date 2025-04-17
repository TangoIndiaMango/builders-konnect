import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { removeAuthUser } from '../../../utils/auth';
import { MenuOutlined } from '@ant-design/icons';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeTab = location.pathname.split('/').pop() || 'orders';

  const handleLogout = () => {
    removeAuthUser();
    navigate('/auth/login');
  };



  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
           
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <MenuOutlined className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className={`lg:w-64 border-b lg:border-b-0 lg:border-r ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <nav className="space-y-1">
              <Link
                to="/profile/orders"
                className={`block w-full text-left px-6 py-3 ${activeTab === 'orders' ? 'bg-[#EBF1FF]' : 'hover:bg-gray-50'}`}
              >
                Orders
              </Link>
              <Link
                to="/profile/addresses"
                className={`block w-full text-left px-6 py-3 ${activeTab === 'addresses' ? 'bg-[#EBF1FF]' : 'hover:bg-gray-50'}`}
              >
                Addresses
              </Link>
              <Link
                to="/profile/payment"
                className={`block w-full text-left px-6 py-3 ${activeTab === 'payment' ? 'bg-[#EBF1FF]' : 'hover:bg-gray-50'}`}
              >
                Payment Method
              </Link>
              <Link
                to="/profile/account"
                className={`block w-full text-left px-6 py-3 ${activeTab === 'account' ? 'bg-[#EBF1FF]' : 'hover:bg-gray-50'}`}
              >
                Account Details
              </Link>
            </nav>
            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-3 text-red-500 mt-4 hover:bg-red-50"
            >
              Log Out
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 lg:pl-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;