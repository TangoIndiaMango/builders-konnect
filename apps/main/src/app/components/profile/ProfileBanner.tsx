import React from 'react';
import { Typography, Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import PageIntroBanner from '../common/PageIntroBanner';


// const items: TabsProps['items'] = [
//   {
//     key: 'profile',
//     label: 'Profile Information',
//     children: (
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">Profile Information</h2>
//         <p>This is where the profile info will go.</p>
//       </div>
//     ),
//   },
//   {
//     key: 'stores',
//     label: 'Stores',
//     children: (
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">Stores</h2>
//         <p>This is where the store info will go.</p>
//       </div>
//     ),
//   },
//   {
//     key: 'subscription',
//     label: 'Subscription',
//     children: (
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">Subscription</h2>
//         <p>This is where the subscription details will go.</p>
//       </div>
//     ),
//   },
// ];

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
        {/* <Tabs
          defaultActiveKey="subscription"
          items={items}
          onChange={onChange}
          className="!mb-0"
        /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
