import React, { useEffect, useState } from 'react';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import WelcomeSection from '../../components/profile/WelcomeSection';
import BusinessProfile from '../../components/profile/BusinessProfile';
import FinanceSection from '../../components/profile/FinanceSection';
import DocumentsSection from '../../components/profile/DocumentsSection';
import { useFetchData, useGetExportData } from '../../../hooks/useApis';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { StoreListResponse, VendorProfile } from './types';
import StoreList from '../../components/profile/store/StoreList';
import { useNavigate } from 'react-router-dom';
import { exportCsvFromString } from '../../../utils/helper';
import { useTableState } from '../../../hooks/useTable';
import { filterOptions } from '../../lib/constant';

const ProfilePage: React.FC = () => {
  const onChange = (key: string) => {
    console.log('Selected tab:', key);
  };
  const { user } = useSessionStorage();

  const profileData = useFetchData(`merchants/profile/view`);
  const profile = profileData?.data?.data as VendorProfile;

  const navigate = useNavigate();

  const {
    searchValue,
    setSearch,
    currentPage,
    pageSize,
    setPage,
    reset,
    customDateRange,
    setCustomDateRange,
    filterKey,
    filterValue,
    handleFilterChange,
    exportType,
    setExportType,
    limitSize,
    setLimitSize,
  } = useTableState('profile');
  const exportStore = useGetExportData(
    `merchants/profile?export=${exportType}`
  );

  const handleExport = () => {
    exportStore.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Stores');
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        setExportType('');
      },
    });
  };

  useEffect(() => {
    if (exportType) {
      handleExport();
    }
  }, [exportType]);

  const [tab, setTab] = useState('staff');
  const stores = useFetchData(
    `merchants/locations?paginate=1&page=${currentPage ?? 1}&status=${
      filterKey === 'status' ? filterValue : ''
    }&date_filter=${customDateRange ?? ''}&sort_by=${
      filterKey === 'sort_by' ? filterValue : ''
    }&q=${searchValue ?? ''}&limit=${limitSize ?? 10}`
  );

  const storeListResponse = stores?.data?.data as StoreListResponse;

  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Profile Information',
      children: (
        <div className="py-6 space-y-6">
          <WelcomeSection data={profile} isLoading={profileData?.isLoading} />
          <BusinessProfile
            businessInfo={profile?.business}
            isLoading={profileData?.isLoading}
          />
          <FinanceSection
            financeInfo={profile?.finance}
            isLoading={profileData?.isLoading}
          />
          <DocumentsSection
            documents={profile?.documents}
            isLoading={profileData?.isLoading}
          />
        </div>
      ),
    },
    {
      key: 'stores',
      label: 'Stores',
      children: (
        <StoreList
          data={storeListResponse}
          isLoading={stores?.isLoading}
          currentPage={currentPage}
          setPage={setPage}
          setSearchValue={setSearch}
          handleFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          onExport={handleExport}
          filterValue={filterValue ?? ''}
          setCustomDateRange={setCustomDateRange}
          pageSize={pageSize}
          reset={reset}
          updateLimitSize={setLimitSize}
          searchValue={searchValue}
          refetch={stores?.refetch}
        />
      ),
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
          <p className="text-sm text-gray-500">
            Track and measure store performance and analytics here
          </p>
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
