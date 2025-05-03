import React from 'react';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import StoresTable from './views/StoresTable';
import WelcomeSection from '../../components/profile/WelcomeSection';
import BusinessProfile from '../../components/profile/BusinessProfile';
import FinanceSection from '../../components/profile/FinanceSection';
import DocumentsSection from '../../components/profile/DocumentsSection';
import { useFetchData } from '../../../hooks/useApis';
import { useSessionStorage } from '../../../hooks/useSessionStorage';

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
  const {user} = useSessionStorage()

  const profileData = useFetchData(`merchants/profile/view`)
  console.log(profileData)

  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Profile Information',
      children: (
        <div className="py-6 space-y-6">
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
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-sm text-gray-500">Track and measure store performance and analytics here</p>
        </div>
        <Button type="default">View Storefront</Button>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
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
