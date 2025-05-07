import React from 'react';
import { Typography, Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import PageIntroBanner from '../common/PageIntroBanner';

const ProfilePage: React.FC = () => {
  const onChange = (key: string) => {
    console.log('Selected tab:', key);
  };

  return (
    <div className="bg-gray-100">
      <PageIntroBanner
        title="My Profile"
        description="Track and measure store performance and analytics here"
        actionButton={<Button size="large">View Storefront</Button>}
      />
      <div className="px-6 bg-white">
      </div>
    </div>
  );
};

export default ProfilePage;
