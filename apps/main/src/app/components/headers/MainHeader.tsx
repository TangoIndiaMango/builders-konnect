<<<<<<< HEAD
import {
  DownOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
=======
import { DownOutlined } from '@ant-design/icons';

import { BellOutlined } from '@ant-design/icons';

import { MenuFoldOutlined } from '@ant-design/icons';

import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Badge, Tag } from 'antd';
import { Header } from 'antd/es/layout/layout';
import NotificationPanel from './NotificationPanel'; // Make sure path is correct

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
  // notificationCount = 11,
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
      <div className="flex items-center justify-between w-full gap-5">
        <div className="flex items-center gap-3">
          {isMobile && (
            <div onClick={toggleSidebar} className="text-xl cursor-pointer">
              {showMobileSidebar ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )}
            </div>
          )}

          <div className="flex items-center max-w-full gap-2">
            <h2 className="text-base font-medium text-gray-800">
              {storeName}
            </h2>
            <Tag className="inline-flex items-center flex-shrink-0 text-xs text-sky-700 bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-full">
              {storeType}
            </Tag>
          </div>
        </div>
        {/* Right: Notification and User */}
        <div className="flex items-center justify-end gap-5 cursor-pointer">
          <NotificationPanel />

          <div className="flex items-center gap-1 cursor-pointer">
  <Avatar
    src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
    size="default"
    style={{ backgroundColor: '#87d068' }}
  />
  <span className="text-sm font-medium text-gray-700">{userName}</span>
  <DownOutlined className="text-xs text-gray-500" />
</div>
        <div className="flex items-center justify-end gap-3 cursor-pointer">
          <Badge count={notificationCount} size="small">
            <BellOutlined
              color="#000000D9"
              className="text-xl cursor-pointer "
            />
          </Badge>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
            size="default"
            style={{ backgroundColor: '#87d068' }}
          />
          <span className="hidden text-sm font-medium text-gray-700 md:block">{userName}</span>
          <DownOutlined className="text-xs text-gray-500" />
        </div>
      </div>
    </Header>
  );
};

export default MainHeader;
