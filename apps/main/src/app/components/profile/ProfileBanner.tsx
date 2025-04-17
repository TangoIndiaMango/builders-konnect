import React from 'react';
import { Typography, Tabs } from 'antd';
import type { TabsProps } from 'antd';

const ProfileBanner = () => {
  return (
    <div className="flex justify-between bg-white px-6 pt-6 pb-4 border-b">
      <div className="flex flex-col space-y-1">
        <Typography.Title level={4} className="!mb-0">
          My Profile
        </Typography.Title>
        <Typography.Text className="text-gray-500 !mb-0">
          Track and measure store performance and analytics here
        </Typography.Text>
      </div>
      <button className="h-fit px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
        View Storefront
      </button>
    </div>
  );
};

const items: TabsProps['items'] = [
  {
    key: 'profile',
    label: 'Profile Information',
    children: (
      <div className="p-4">
        <h2 className="text-lg font-semibold">Profile Information</h2>
        <p>This is where the profile info will go.</p>
      </div>
    )
  },
  {
    key: 'stores',
    label: 'Stores',
    children: (
      <div className="p-4">
        <h2 className="text-lg font-semibold">Stores</h2>
        <p>This is where the store info will go.</p>
      </div>
    )
  },
  {
    key: 'subscription',
    label: 'Subscription',
    children: (
      <div className="p-4">
        <h2 className="text-lg font-semibold">Subscription</h2>
        <p>This is where the subscription details will go.</p>
      </div>
    )
  }
];

const ProfilePage: React.FC = () => {
  const onChange = (key: string) => {
    console.log('Selected tab:', key);
  };

  return (
    <div className="bg-gray-100">
      <ProfileBanner />
      <div className="px-6 bg-white">
        <Tabs
          defaultActiveKey="subscription"
          items={items}
          onChange={onChange}
          className="!mb-0"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
