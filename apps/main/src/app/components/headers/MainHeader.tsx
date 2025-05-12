import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import NotificationPanel from './NotificationPanel';
import ProfileCard from './ProfileCard';

interface MainHeaderProps {
  isMobile: boolean;
  collapsed: boolean;
  showMobileSidebar: boolean;
  toggleSidebar: () => void;
  storeName?: string;
  storeType?: string;
  userName?: string;
  notificationCount?: number;
}

const ProfileDropdown = () => (
  <div className="bg-white shadow-lg rounded-md border border-gray-100 w-72">
    <ProfileCard />
  </div>
);

const MainHeader: React.FC<MainHeaderProps> = ({
  isMobile,
  collapsed,
  showMobileSidebar,
  toggleSidebar,
  storeName = "Builder's Hub Construction",
  storeType = 'Mainland Store',
  userName = 'Olugbenga Danield',
  notificationCount = 11,
}) => {
  return (
    <Header
      style={{
        background: '#fff',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
        height: '80px',
      }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: Store Info */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <div onClick={toggleSidebar} className="cursor-pointer text-xl">
              {showMobileSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          )}

          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium text-gray-800">{storeName}</h2>
            <span className="text-xs text-sky-700 bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-full">
              {storeType}
            </span>
          </div>
        </div>

        {/* Right: Notifications and User */}
        <div className="flex items-center justify-end gap-5">
          <NotificationPanel />

          {/* User Avatar & Profile Dropdown */}
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            dropdownRender={() => <ProfileDropdown />}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <Avatar
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                size="default"
                style={{ backgroundColor: '#87d068' }}
              />
              <span className="text-sm font-medium text-gray-700">{userName}</span>
              <DownOutlined className="text-xs text-gray-500" />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default MainHeader;