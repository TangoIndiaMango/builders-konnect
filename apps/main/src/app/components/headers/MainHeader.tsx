import { DownOutlined } from '@ant-design/icons';

import { BellOutlined } from '@ant-design/icons';

import { MenuFoldOutlined } from '@ant-design/icons';

import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { Header } from 'antd/es/layout/layout';

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
        <div className="flex items-center gap-3">
          {isMobile && (
            <div onClick={toggleSidebar} className="cursor-pointer text-xl">
              {showMobileSidebar ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium text-gray-800">{storeName}</h2>
            <span className="text-xs text-sky-700 bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-full">
              {storeType}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 cursor-pointer">
          <Badge count={notificationCount} size="small">
            <BellOutlined color='#000000D9' className=" cursor-pointer text-xl"  />
          </Badge>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
            size="default"
            style={{ backgroundColor: '#87d068' }}
          />
          <span className="text-sm font-medium text-gray-700">{userName}</span>
          <DownOutlined className="text-xs text-gray-500" />
        </div>
      </div>
    </Header>
  );
};

export default MainHeader;
