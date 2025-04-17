import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ShopOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Grid, Image, Layout, Menu, Typography } from 'antd';
import { useState } from 'react';
import { sidebar_logo } from '../lib/assets/logo';
import { POSMenus, AccountingMenus, ProcurementMenus } from '../lib/constant';
import MainHeader from '../components/headers/MainHeader';
import SubHeaderTabs from '../components/headers/SubHeaderTabs';
import { currentNavigationAtom, NavigationType } from '../store/navigation';
import { useAtom } from 'jotai';
import type { MenuProps } from 'antd';

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const screens = useBreakpoint();
  const [currentNavigation] = useAtom(currentNavigationAtom);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Get current route

  const toggleSidebar = () => {
    if (!screens.md) {
      setShowMobileSidebar(!showMobileSidebar); // For mobile
    } else {
      setCollapsed(!collapsed); // For desktop
    }
  };

  const closeSidebar = () => {
    setShowMobileSidebar(false);
  };

  const isMobile = !screens.md;

  // Get correct menu based on current section
  const getCurrentMenuItems = (navigation: NavigationType) => {
    switch (navigation) {
      case 'pos':
        return POSMenus;
      case 'accounting':
        return AccountingMenus;
      case 'procurement':
        return ProcurementMenus;
      default:
        return POSMenus;
    }
  };

  const menuItems = getCurrentMenuItems(currentNavigation);

  // Helper to find href from MenuItems based on clicked key
  const findHref = (items: any[], key: string): string | null => {
    for (const item of items) {
      if (item.key === key) return item.href;
      if (item.children) {
        const childHref = findHref(item.children, key);
        if (childHref) return childHref;
      }
    }
    return null;
  };

  // 👇 Helper to find the key based on current location path
  const findActiveKey = (items: MenuProps['items'], path: string): string | undefined => {
    for (const item of items || []) {
      if ('href' in item && item.href === path) return item.key as string;
      if (item?.children) {
        const found = findActiveKey(item.children, path);
        if (found) return found;
      }
    }
    return undefined;
  };

  const activeKey = findActiveKey(menuItems, location.pathname);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Overlay background for mobile */}
      {isMobile && showMobileSidebar && (
        <div
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99,
          }}
        />
      )}

      <Sider
        width={250}
        collapsed={collapsed}
        collapsible={!isMobile}
        collapsedWidth={isMobile ? 0 : 80}
        trigger={null}
        style={{
          background: '#fff',
          position: isMobile ? 'fixed' : 'sticky',
          height: '100vh',
          zIndex: 100,
          transition: 'all 0.3s',
          left: isMobile && !showMobileSidebar ? '-250px' : '0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          top: 0,
        }}
        className="!bg-white h-screen"
      >
        <div className="logo p-5 text-center">
          <Image src={sidebar_logo} alt="logo" preview={false} />
        </div>

        <Menu
          mode="inline"
          selectedKeys={[activeKey || '']}
          items={menuItems}
          style={{ borderRight: 0 }}
          onClick={({ key }) => {
            const href = findHref(menuItems, key);
            if (href) {
              navigate(href);
              if (isMobile) setShowMobileSidebar(false);
            }
          }}
        />
      </Sider>

      <Layout>
        <div className="sticky top-0 z-10">
          <MainHeader
            isMobile={isMobile}
            collapsed={collapsed}
            showMobileSidebar={showMobileSidebar}
            toggleSidebar={toggleSidebar}
          />
          <SubHeaderTabs />
        </div>

        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
