import React, { useState } from 'react';
import { Layout, Menu, Grid, Typography, Space } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  TagsOutlined,
  SolutionOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  DownOutlined,
  MailOutlined, PhoneOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const screens = useBreakpoint();

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
          position: isMobile ? 'fixed' : 'relative',
          height: '100vh',
          zIndex: 100,
          transition: 'left 0.3s',
          left: isMobile && !showMobileSidebar ? '-250px' : '0',
        }}
        
      >
        <div
          className="logo"
          style={{ color: '#000', padding: 20, textAlign: 'center' }}
        >
          <img src="/BK-logo.png" alt="logo" />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>Vendor Profile</Menu.Item>
          <Menu.Item key="3" icon={<ShopOutlined />}>Products and Inventory</Menu.Item>
          <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Sales
          <DownOutlined className="text-xs" style={{ marginLeft: '126px' }} />
        </div>
      </Menu.Item>
          <Menu.Item key="5" icon={<DollarCircleOutlined />}>Returns & Refunds</Menu.Item>
          <Menu.Item key="6" icon={<ShoppingCartOutlined />}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Customers
          <DownOutlined className="text-xs" style={{ marginLeft: '96px' }} />
        </div>
      </Menu.Item>
          <Menu.Item key="7" icon={<TagsOutlined />}>Discounts</Menu.Item>
          <Menu.Item key="8" icon={<SolutionOutlined />}>Staff Management</Menu.Item>
          <Menu.Item key="9" icon={<BarChartOutlined />}>Reports</Menu.Item>
          <Menu.Item key="10" icon={<SettingOutlined />}>Settings</Menu.Item>
        </Menu>
      </Sider>

      {(!isMobile || !showMobileSidebar) && (
        <Layout>
          <Header
            style={{
              background: '#fff',
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Only show the toggle menu icon on mobile */}
            {isMobile && (
              <div
                onClick={toggleSidebar}
                style={{ fontSize: 20, cursor: 'pointer' }}
              >
                {collapsed || showMobileSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            )}

            {/* Header Content */}
            <div className="flex items-center justify-between w-full px-4 py-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-gray-800">Builder's Hub Construction</h2>
                <span className="text-xs text-sky-700 bg-sky-100 border border-sky-300 px-2 py-0.5 rounded-full">
                  Mainland Store
                </span>
              </div>

              <div className="flex items-center gap-6 relative">
                <div className="relative">
                  <BellOutlined className="text-xl text-gray-700" />
                  <span className="absolute top-2 -right-5 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full z-10">
                    11
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src="/avatar.png"
                    alt="avatar"
                    className="w-6 h-6 rounded-full border border-sky-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Olugbenga Danield</span>
                  <DownOutlined className="text-xs" />
                </div>
              </div>
            </div>
          </Header>

          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, minHeight: 360 }} >
              <div
                style={{
                    width: '1110px',
                    height: '54px',
                    position: 'relative',
                    top: '-38px',
                    right: '16px',
                    left: '-38px',
                    bottom: '8px',
                }}
              >
                <Menu mode="horizontal" className="flex items-center text-white bg-blue-900">
                  <Menu.Item className="text-xs rounded-2xl">Point of Sale</Menu.Item>
                  <Menu.Item>Accounting</Menu.Item>
                  <Menu.Item>Procurement Management</Menu.Item>
                </Menu>
              </div>

              <div className='flex justify-between bg-white -m-10 h-40' >
             <div className='flex flex-col space-y-1 m-4 gap-2'>
                <span className='text-xl font-semibold'>My Profile</span>
                <span className='text-gray-400'>Track and measure store performance and analytics here</span>
                <span className='flex items-center gap-8'>
                <ul className='underline text-blue-800'>Profile Information</ul>
                <ul>Stores</ul>
                <ul>Subscription</ul>
                </span>
            
             </div>
             <div className='self-start'>
              <span className=' flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-sm text-sm hover:bg-gray-100 text-black '>View Storefront</span>
             </div>
              </div>
              <div>
              </div>

            </div>
              <div className='-mt-36 bg-white h-44 flex items-start p-4 space-x-4'>
                <img src="/avatar2.png" className='w-32 h-32 rounded ml-2' />
                <div className='flex flex-col justify-center space-y-1'>

                <h1 className='text-2xl font-bold mt-4'>Builder’s Hub Construction</h1>
                <Space>
        <MailOutlined style={{ color: '#003399' }} />
        <Text>buildershub@gmail.com</Text>
      </Space>

      <Space>
        <PhoneOutlined style={{ color: '#003399' }} />
        <Text>(+234) 80 2424 24212</Text>
      </Space>
                </div>
              </div>

              {false&&<div className='bg-blue-600 border w-10 h-10'>
                    <h1>uifgwefkwgwetgwe</h1>

                </div>}
                <div className='bg-red-600 border w-10 h-10'>

                </div>


          </Content>
        </Layout>
      )}
    </Layout>
  );
};

export default Sidebar;
