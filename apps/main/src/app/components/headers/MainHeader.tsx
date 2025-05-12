
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined, BellOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Card, Badge } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotificationPanel from './NotificationPanel';

interface MainHeaderProps {
  isMobile: boolean;
  collapsed: boolean;
  showMobileSidebar: boolean;
  toggleSidebar: () => void;
  storeName?: string;
  storeType?: string;
  userName?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  isMobile,
  collapsed,
  showMobileSidebar,
  toggleSidebar,
  storeName = "Builder's Hub Construction",
  storeType = 'Mainland Store',
  userName = 'Olugbenga Daniels',
}) => {
  
  const [visibleTab, setVisibleTab] = useState<'profile' | 'notifications'>('notifications');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'notifications') {
      setVisibleTab('notifications');
    } else {
      setVisibleTab('profile');
    }
  }, [searchParams]);

  const ProfileDropdown = () => (
    <div className="bg-white shadow-lg rounded-md border border-gray-100 w-72 max-w-full">
      <Card className="w-full p-0 overflow-hidden rounded-lg border-0 shadow-none">
        {visibleTab === 'profile' ? (
          <>
            {/* Profile Section */}
            <div className="flex flex-col items-center py-4 px-2">
              <div className="bg-sky-200 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden mb-3">
                <img
                  src="/Avatar.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h4 className="text-sm font-semibold mb-0">{userName}</h4>
              <p className="text-xs text-gray-500 mb-1 text-center break-all">
                daniels@buildershub.com
              </p>
              <div className="bg-gray-100 rounded-full px-3 py-0.5 text-xs">
                <span className="text-gray-600">Finance Manager</span>
              </div>
            </div>

            {/* Current Account Section */}
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex items-center mb-1">
                <span className="text-xs text-gray-500">Current account</span>
                <span className="ml-2 w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
              </div>
              <h5 className="text-sm font-medium mb-1">{storeName}</h5>
              <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-sky-100 text-sky-600">
                {storeType}
              </span>
            </div>

            {/* Switch Account Section */}
            <div className="px-4 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 block mb-2">Switch account/store</span>
              <div className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-sm font-medium truncate">Builder's Hub Constructions</span>
                <RightOutlined className="text-gray-400 text-xs" />
              </div>
              <div className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50 border-t border-gray-100">
                <span className="text-sm font-medium truncate">Builder's Hub Tools and Machinery</span>
                <RightOutlined className="text-gray-400 text-xs" />
              </div>
            </div>
          </>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            <NotificationPanel />
          </div>
        )}
      </Card>

      {/* Footer Toggle for mobile */}
      {isMobile && (
        <div className="border-t border-gray-200">
          <button
            onClick={() => {
              if (visibleTab === 'profile') {
                navigate('/pos/settings?tab=notifications');
              } else {
                navigate('/pos/settings?tab=profile');
              }
            }}
            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-700"
          >
            {visibleTab === 'profile' ? '🔔 View Notifications' : '👤 Back to Profile'}
          </button>
        </div>
      )}
    </div>
  );

  return (
<Header
  className="px-4 py-2 flex items-center justify-between border-b border-gray-100 h-[80px] overflow-hidden"
  style={{ backgroundColor: 'white' }} // Inline style to enforce white background
>

      <div className="flex items-center justify-between w-full gap-x-4 overflow-hidden">
        {/* Left: Store Info */}
        <div className="flex items-center gap-3 min-w-0">
          {isMobile && (
            <div onClick={toggleSidebar} className="cursor-pointer text-xl shrink-0">
              {showMobileSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          )}
          <div className="flex items-center gap-2 min-w-0 truncate">
            <h2 className="text-base font-medium text-gray-800 truncate">{storeName}</h2>
            <span className="text-xs text-sky-700 bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-full shrink-0">
              {storeType}
            </span>
          </div>
        </div>

        {/* Right: Notification Bell + Profile */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Notification Bell for large screens */}
          {!isMobile && (
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              dropdownRender={() => (
                <div className="bg-white shadow-lg rounded-md border border-gray-100 w-80 max-w-full max-h-96 overflow-y-auto">
                  <NotificationPanel />
                </div>
              )}
            >
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                <Badge
                  count={5}
                  size="small"
                  offset={[-2, 2]}
                  style={{ backgroundColor: '#f5222d' }}
                >
                  <BellOutlined className="text-lg text-gray-700" />
                </Badge>
              </div>
            </Dropdown>
          )}

          {/* Profile Dropdown */}
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            dropdownRender={ProfileDropdown}
            onOpenChange={(open) => open && setVisibleTab('profile')}
          >
            <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md">
              <Avatar
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                size="default"
                style={{ backgroundColor: '#87d068' }}
              />
              {!isMobile && (
                <>
                  <span className="text-sm font-medium text-gray-700">{userName}</span>
                  <DownOutlined className="text-xs text-gray-500" />
                </>
              )}
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default MainHeader;
