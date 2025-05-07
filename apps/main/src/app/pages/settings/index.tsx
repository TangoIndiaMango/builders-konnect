import React from 'react';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import WelcomeSection from '../../components/profile/WelcomeSection';
import ProfileInfoSection from '../../components/settings/profilenfoSection';
import NotificationList from './views/NotificationList';

const SettingPage: React.FC = () => {
  const onChange = (key: string) => {
    console.log('Selected tab:', key);
  };  

  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Profile Information',
      children: (
        <div className="space-y-6 py-6">
          <WelcomeSection />
          <ProfileInfoSection/>
        </div>
      ),
    },
    {
      key: 'Notification',
      label: 'Notification',
      children: (
        <div className="p-6">
          <NotificationList/>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-gray-500 text-sm">Track and measure store performance and analytics here</p>
        </div>
        <Button type="default">View Storefront</Button>
      </div>
      <div className="px-6 py-4">
        <Tabs defaultActiveKey="profile" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default SettingPage;
