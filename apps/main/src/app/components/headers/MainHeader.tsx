import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Dropdown } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFetchDataSeperateLoading } from '../../../hooks/useApis';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import NotificationPanel, { NotificationAPI } from './NotificationPanel';
import ProfileDropdown from './ProfileCard';

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
  const { user, businessProfile, clearUser } = useSessionStorage();
  // console.log(user);
  const [visibleTab, setVisibleTab] = useState<'profile' | 'notifications'>(
    'notifications'
  );

  const handleLogout = () => {
    clearUser();
    navigate('/auth/login');
  };

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

  const notificationData = useFetchDataSeperateLoading(
    `merchants/notifications?&grouped=false&limit=&paginate=0`
  );
  const notificationResponse = notificationData?.data?.data;
  const notificationsAPI =
    notificationResponse?.notifications as NotificationAPI[];


  return (
    <Header
      className="px-4 py-2 flex items-center justify-between border-b border-gray-100 h-[80px] overflow-hidden"
      style={{ backgroundColor: 'white' }} // Inline style to enforce white background
    >
      <div className="flex items-center justify-between w-full gap-x-4 overflow-hidden">
        {/* Left: Store Info */}
        <div className="flex items-center gap-3 min-w-0">
          {isMobile && (
            <div
              onClick={toggleSidebar}
              className="cursor-pointer text-xl shrink-0"
            >
              {showMobileSidebar ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )}
            </div>
          )}
          <div className="flex items-center gap-2 min-w-0 truncate">
            <h2 className="text-base font-medium text-gray-800 truncate">
              {businessProfile?.business?.name ?? `N/A`}
            </h2>
            <span className="text-xs text-sky-700 bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-full shrink-0">
              {businessProfile?.business?.type ?? 'N/A'}
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
                  <NotificationPanel notificationsAPI={notificationsAPI} />
                </div>
              )}
            >
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                <Badge
                  count={notificationsAPI?.length}
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
            dropdownRender={() => (
              <ProfileDropdown
                user={user}
                visibleTab={visibleTab}
                businessProfile={businessProfile}
                notificationsAPI={notificationsAPI}
                handleLogout={handleLogout}
                isMobile={isMobile}
                navigate={navigate}
              />
            )}
            onOpenChange={(open) => open && setVisibleTab('profile')}
          >
            <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md">
              <Avatar
                src={
                  user?.avatar ??
                  `https://placehold.co/160x160/e0e0e0/e0e0e0?text=${user?.name
                    ?.charAt(0)
                    .toUpperCase()}`
                }
                size="default"
                style={{ backgroundColor: '#87d068' }}
              />
              {!isMobile && (
                <>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name ?? userName}
                  </span>
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
