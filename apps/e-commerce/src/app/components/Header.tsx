import { Link, useNavigate } from 'react-router-dom';
import { SearchOutlined, ShoppingCartOutlined, MenuOutlined, CloseOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Input, Badge, Drawer } from 'antd';
import { header_logo } from '../lib/assets/logo';
import { useEffect, useState } from 'react';
import { getAuthUser, isAuthenticated, removeAuthUser } from '../../utils/auth';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(getAuthUser());

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated());
      setUser(getAuthUser());
    };

    // Check auth initially
    checkAuth();

    // Listen for auth changes
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);


  const handleLogout = () => {
    removeAuthUser();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/auth/login');
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Top blue bar */}
      <div className="!bg-[#003399] !text-white py-1 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-8">
            <div className="hidden md:flex items-center divide-x divide-white">
              <Link to="/" className="!text-white hover:!text-gray-200 !text-xs px-6 first:pl-0">Builders konnect Loyalty</Link>
              <Link to="/customer-support" className="!text-white hover:!text-gray-200 !text-xs px-6">Customer Support</Link>
            </div>
            <div className="hidden md:flex items-center divide-x divide-white">
              <Link to="/bulk-orders" className="!text-white hover:!text-gray-200 !text-xs px-6">Bulk Orders</Link>
              <Link to="/artisan-hub" className="!text-white hover:!text-gray-200 !text-xs px-6">Artisan Hub</Link>
              <Link to="/learning" className="!text-white hover:!text-gray-200 !text-xs px-6">Learning</Link>
              <Link to="/suggestions" className="!text-white hover:!text-gray-200 !text-xs px-6">Suggestions</Link>
              <Link to="/track-order" className="!text-white hover:!text-gray-200 !text-xs px-6">Track Order</Link>
            </div>

          </div>
        </div>
      </div>

      {/* Main white header */}
      <AntHeader className="!bg-[#E6F7FF] md:!bg-white shadow px-0 h-auto">
      <div className="container mx-auto px-4 ">
          <div className="flex items-center justify-between py-1">
            {/* Logo */}
            <Link to="/" className="shrink-0 hidden md:block">
              <img
                src={header_logo}
                alt="Builders Connect Logo"
                className="h-7 w-auto object-contain"
              />
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block flex-1 max-w-xl mx-6">
              <Input
                placeholder="Search for products"
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full rounded border-gray-200"
                style={{ height: '36px' }}
              />
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2" >
              <button className="!text-[#003399] !text-xs px-6 !border !border-[rgba(217, 217, 217, 1)] rounded py-1.5 ">
                <a href="https://builders-konnect-app.netlify.app/vendor/auth/login" target="_blank" rel="noopener noreferrer">
                Become A Vendor
                </a>
              </button>
              <div className='w-[3px] h-[40px] !bg-[#9CAFFC]'></div>
              {!isLoggedIn && (
                <>
                    <Link to="/auth/register" className="!text-[#003399] !text-xs hover:!text-[#9CAFFC] transition-colors px-6">
                    Sign Up
                    </Link>
                    <Link to="/auth/login" className=" !text-xs px-6 !bg-[#003399] !text-white rounded py-1.5 ">
                    Log In
                    </Link>
              </>
              )}

              <Link to="/cart" className="text-[#003399] hover:text-[#9CAFFC] px-6">
                <Badge count={0} color="#003399">
                  <ShoppingCartOutlined style={{ fontSize: '18px' }} />
                </Badge>
              </Link>

              {isLoggedIn && ( <>
                    <Link to="/profile" className="px-6">
                  <UserOutlined style={{ fontSize: '20px' }} />
                </Link>

                {/* <Link to="/" onClick={handleLogout} className=" hover:text-[#9CAFFC] px-6">
                <LogoutOutlined style={{ fontSize: '20px' }} />
              </Link> */}
                </>)}


            </div>

            {/* Mobile Actions */}
            <div className="w-full flex items-center justify-between md:hidden">
              <div>
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2"
                >
                  <MenuOutlined style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.45) !important' }} />
                </button>
              </div>

              <div className="flex items-center">
                <Link to="/cart" className="px-6">
                  <Badge count={0} color="#003399">
                    <ShoppingCartOutlined style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.45) !important' }} />
                  </Badge>
                </Link>
                {isLoggedIn && ( <>
                <Link to="/profile" className="px-6">
                  <UserOutlined style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.45) !important' }} />
                </Link>
                </>)}

              </div>
            </div>
          </div>

          {/* Mobile Search - Below Header */}
          <div className="md:hidden pb-3">
            <Input
              placeholder="Search for products"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-full rounded border-gray-200"
              style={{ height: '36px' }}
            />
          </div>
        </div>
      </AntHeader>

      {/* Mobile Menu Drawer */}
      <Drawer
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closable={false}
        width="85%"
        style={{ padding: 0 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="!text-[#003399]"
            >
              <CloseOutlined style={{ fontSize: '18px' }} />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            {!isLoggedIn && (
                <>
                <Link to="/auth/login" className="px-4 h-10 flex items-center justify-center !bg-[#003399] !text-white !text-xs rounded hover:!bg-[#9CAFFC] transition-colors">
                  Log In
                </Link>
                <Link to="/auth/register" className="px-4 h-10 flex items-center justify-center !border !border-[#003399] !text-[#003399] !text-xs rounded hover:!bg-[#9CAFFC] hover:!text-white hover:!border-[#9CAFFC] transition-colors">
                  Sign Up
                </Link>
              </>
            )}
            {isLoggedIn && (
              <Link to="/profile" className="px-4 h-10 flex items-center justify-center !border !border-[#003399] !text-[#003399] !text-xs rounded hover:!bg-[#9CAFFC] hover:!text-white hover:!border-[#9CAFFC] transition-colors">
                Profile
              </Link>
            )}
            <button className="px-4 h-10 flex items-center justify-center !border !border-[#003399] !text-[#003399] !text-xs rounded hover:!bg-[#9CAFFC] hover:!text-white hover:!border-[#9CAFFC] transition-colors">
              Become A Vendor
            </button>
            <div className="h-[1px] !bg-gray-200 my-2"></div>
            <Link to="/bulk-orders" className="px-4 py-2 !text-xs !text-gray-600 hover:!text-[#003399]">Bulk Orders</Link>
            <Link to="/artisan-hub" className="px-4 py-2 !text-xs !text-gray-600 hover:!text-[#003399]">Artisan Hub</Link>
            <Link to="/learning" className="px-4 py-2 !text-xs !text-gray-600 hover:!text-[#003399]">Learning</Link>
            <Link to="/suggestions" className="px-4 py-2 !text-xs !text-gray-600 hover:!text-[#003399]">Suggestions</Link>
            <Link to="/customer-support" className="px-4 py-2 !text-xs !text-gray-600 hover:!text-[#003399]">Customer Support</Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
