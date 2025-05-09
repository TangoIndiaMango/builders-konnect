import type { TabsProps } from 'antd';
import { Button, Tabs } from 'antd';
import React from 'react';
import {
  useFetchDataSeperateLoading
} from '../../../hooks/useApis';
import WelcomeSection from '../../components/profile/WelcomeSection';
import ProfileInfoSection from '../../components/settings/profilenfoSection';
import { VendorProfile } from '../profile/types';
import NotificationList from './views/NotificationList';

const SettingPage: React.FC = () => {
  const onChange = (key: string) => {
    console.log('Selected tab:', key);
  };

  const profileData = useFetchDataSeperateLoading(`merchants/profile/view`);

  const profile = profileData?.data?.data as VendorProfile;

  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Profile Information',
      children: (
        <div className="py-6 space-y-6">
          <WelcomeSection
            data={profile}
            isLoading={profileData.isLoading}
            isFetching={profileData.isFetching}
            isProfile={true}
            refetch={profileData.refetch}
          />
          <ProfileInfoSection
            data={profile}
            isLoading={profileData.isLoading}
          />
        </div>
      ),
    },
    {
      key: 'Notification',
      label: 'Notification',
      children: (
        <div className="">
          <NotificationList />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500">
            Track and measure store performance and analytics here
          </p>
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
