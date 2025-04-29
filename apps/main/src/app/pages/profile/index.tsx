import React from 'react';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import StoresTable from './views/StoresTable';
import WelcomeSection from '../../components/profile/WelcomeSection';
import BusinessProfile from '../../components/profile/BusinessProfile';
import FinanceSection from '../../components/profile/FinanceSection';
import DocumentsSection from '../../components/profile/DocumentsSection';

const businessInfo = {
  name: "Builder's Hub Construction",
  email: 'buildershub@gmail.com',
  category: 'Construction',
  type: 'Limited liability',
  phone: '(+234) 80 2424 24212',
  vendorId: '689937',
  address: '35 Umueze street, Amawbia',
  location: 'Awka South, Anambra state',
};

const financeInfo = {
  bankName: 'Sterling Bank',
  accountNumber: '0063077730',
  accountName: "Builder's Hub Construction",
};

const documents = {
  cac: {
    number: 'BH-818360838',
    document: '/documents/buildershub-cac.pdf',
  },
  tin: {
    number: 'BH-818360838',
    document: '/documents/buildershub-tin.pdf',
  },
  proofOfAddress: '/documents/buildershub-address.pdf',
};

const ProfilePage: React.FC = () => {
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
          <BusinessProfile businessInfo={businessInfo} />
          <FinanceSection financeInfo={financeInfo} />
          <DocumentsSection documents={documents} />
        </div>
      ),
    },
    {
      key: 'stores',
      label: 'Stores',
      children: <StoresTable />,
    },
    {
      key: 'subscription',
      label: 'Subscription',
      children: (
        <div className="p-6">
          <h2 className="text-lg font-semibold">Subscription</h2>
          <p>This is where the subscription details will go.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-gray-500 text-sm">Track and measure store performance and analytics here</p>
        </div>
        <Button type="default">View Storefront</Button>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Tabs
            defaultActiveKey="profile"
            items={items}
            onChange={onChange}
            className="!mb-0"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
