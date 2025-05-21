import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';

import ProfileInfoSection from '../../components/settings/profilenfoSection';
import NotificationList from './views/NotificationList';
import WelcomeSection from '../../components/profile/WelcomeSection';
import { VendorProfile } from '../profile/types';
import {
  useFetchData,
  useFetchDataSeperateLoading,
} from '../../../hooks/useApis';
import { StaffProfile } from './types';
import ChangePasswordModal from '../auth/ChangePasswordModal';
import { DocumentPreviewModal } from '../../components/profile/DocumentPreviewUrl';

const SettingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState('profile');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setTab(tabParam);
    }
  }, [searchParams]);

  const onChange = (key: string) => {
    setTab(key);
  };

  const profileData = useFetchDataSeperateLoading(
    `merchants/staff/get/profile`
  );
  const profile = profileData?.data?.data as StaffProfile;
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  // console.log(profile,"profile")

  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Profile Information',
      children: (
        <div className="space-y-6">
          <WelcomeSection
            data={profile}
            isLoading={profileData.isLoading}
            isFetching={profileData.isFetching}
            isProfile={true}
            refetch={profileData.refetch}
          />
          <ProfileInfoSection
            data={profile?.business}
            isLoading={profileData.isLoading}
          />

          <div className="grid grid-cols-1 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm lg:grid-cols-[0.3fr_0.7fr]">
            <Button
              type="link"
              onClick={() => setIsChangePasswordModalOpen(true)}
            >
              Change Password
            </Button>
          </div>
          <ChangePasswordModal
            open={isChangePasswordModalOpen}
            onClose={() => setIsChangePasswordModalOpen(false)}
          />
        </div>
      ),
    },
    {
      key: 'notifications',
      label: 'Notification',
      children: (
        <div>
          <NotificationList />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500">
            Track and measure store performance and analytics here
          </p>
        </div>
        <Button type="default">View Storefront</Button>
      </div>

      <div className="px-6 py-4">
        <Tabs activeKey={tab} onChange={onChange} items={items} />

        <ChangePasswordModal
          open={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />

        <DocumentPreviewModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          fileUrl={currentFile}
        />
      </div>
    </div>
  );
};

export default SettingPage;
