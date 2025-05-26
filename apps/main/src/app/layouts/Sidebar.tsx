import type { MenuProps } from 'antd';
import { Grid, Image, Layout, Menu, Typography } from 'antd';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../components/headers/MainHeader';
import SubHeaderTabs from '../components/headers/SubHeaderTabs';
import { sidebar_logo } from '../lib/assets/logo';
import { AccountingMenus, POSMenus, ProcurementMenus } from '../lib/constant';
import { currentNavigationAtom, NavigationType } from '../store/navigation';
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
    let matchedKey: string | undefined;
    let maxMatchLength = 0;

    for (const item of items || []) {
      if (item && 'href' in item && typeof item.href === 'string') {
        // Special case for dashboard
        if (item.href === '/' && path === '/') {
          if (item.href.length > maxMatchLength) {
            matchedKey = item.key as string;
            maxMatchLength = item.href.length;
          }
        }
        // For all other items, match if path starts with href
        else if (item.href !== '/' && path.startsWith(item.href)) {
          if (item.href.length > maxMatchLength) {
            matchedKey = item.key as string;
            maxMatchLength = item.href.length;
          }
        }
      }
      if (item && 'children' in item && item.children) {
        const found = findActiveKey(item.children, path);
        if (found) return found;
      }
    }
    return matchedKey;
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
          overflowX: 'visible',
        }}
        className="!bg-white h-screen"
      >
        <div className="p-5 text-center logo">
          <Image src={sidebar_logo} alt="logo" preview={false} />
        </div>

        <Menu
          mode="inline"
          selectedKeys={[activeKey || '']}
          items={menuItems}
          style={{ borderRight: 0, width: 240 }}
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
