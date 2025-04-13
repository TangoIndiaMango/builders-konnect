import {
  BellOutlined,
  DownOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  DashboardOutlined,
  ShopOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Grid, Image, Layout, Menu, Space, Typography } from 'antd';
import { useState } from 'react';
import { sidebar_logo } from '../lib/assets/logo';
import { POSMenus, AccountingMenus, ProcurementMenus } from '../lib/constant';
import MainHeader from '../components/headers/MainHeader';
import SubHeaderTabs from '../components/headers/SubHeaderTabs';
import { currentNavigationAtom, NavigationType } from '../store/navigation';
import { useAtom } from 'jotai';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

// Get the appropriate menu items based on current navigation
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

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const screens = useBreakpoint();
  const [currentNavigation] = useAtom(currentNavigationAtom);

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
  const menuItems = getCurrentMenuItems(currentNavigation);

  return (
    <Layout style={{ minHeight: '100vh'  }}>
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
        <Menu mode="inline" items={menuItems} style={{ borderRight: 0 }} />
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
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
