import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, Button, message } from 'antd';
import type { TabsProps } from 'antd';
import WelcomeSection from '../../components/profile/WelcomeSection';
import BusinessProfile from '../../components/profile/BusinessProfile';
import FinanceSection from '../../components/profile/FinanceSection';
import DocumentsSection from '../../components/profile/DocumentsSection';
import {
  useFetchData,
  useFetchDataSeperateLoading,
  useGetExportData,
  usePutData,
  useUploadData,
} from '../../../hooks/useApis';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { StoreListResponse, VendorProfile } from './types';
import StoreList from '../../components/profile/store/StoreList';
import { data, useNavigate, useSearchParams } from 'react-router-dom';
import { exportCsvFromString } from '../../../utils/helper';
import { useTableState } from '../../../hooks/useTable';
import { filterOptions } from '../../lib/constant';
import SubscriptionList from '../../components/profile/subscription/SubscriptionList';
import { UploadedResInterface } from '../../../hooks/useUpload';

const ProfilePage: React.FC = () => {
  const { user } = useSessionStorage();

  const profileData = useFetchDataSeperateLoading(`merchants/profile/view`);
  const profile = profileData?.data?.data as VendorProfile;
  const updateProfile = usePutData(`merchants/profile`);

  const navigate = useNavigate();
  const MediaState = useUploadData('shared/media/upload');
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams?.get('tab') ?? 'profile');
  const [isEditRequested, setIsEditRequested] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{
    CAC?: any;
    TIN?: any;
    proof_of_address?: any;
  }>({});
  const [fieldValues, setFieldValues] = useState<{
    CAC?: string;
    TIN?: string;
    proof_of_address?: string;
  }>({});

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

  const stores = useFetchData(
    `merchants/locations?paginate=1&page=${currentPage ?? 1}&status=${
      filterKey === 'status' ? filterValue : ''
    }&date_filter=${customDateRange ?? ''}&sort_by=${
      filterKey === 'sort_by' ? filterValue : ''
    }&q=${searchValue ?? ''}&limit=${limitSize ?? 10}`
  );

  const handleUpdateProfile = async (data: any) => {
    try {
      const formData = new FormData();
      const documentTypes = ['CAC', 'TIN', 'proof_of_address'];
      const selectedDocs = documentTypes.filter(
        (docType) => selectedFiles[docType]
      );
      selectedDocs.forEach((docType) => {
        if (selectedFiles[docType]) {
          formData.append('media[]', selectedFiles[docType]?.file);
        }
      });

      let uploadedUrls: string[] = [];
      let mediaData: UploadedResInterface[] = [];
      if (formData.has('media[]')) {
        const uploadRes = await MediaState.mutateAsync(formData);
        const uploadResponse = uploadRes as UploadedResInterface[];
        uploadedUrls = uploadResponse?.map((res) => res.url) || [];
        mediaData = uploadResponse;
      }
      console.log('Media', mediaData);

      console.log('Field', fieldValues);

      const newMediaData = selectedDocs.map((docType, index) => ({
        name: docType.toLowerCase(),
        url: uploadedUrls[index],
        metadata: {
          identification_number: fieldValues[docType] || '',
        },
      }));
      console.log('New Media', newMediaData);
      // Construct the final payload
      const finalPayload = {
        ...fieldValues,
        media: newMediaData,
        documents: {
          ...data.documents,
          ...Object.entries(selectedFiles).reduce(
            (acc, [docType, file], index) => {
              if (file && uploadedUrls[index]) {
                acc[docType] = {
                  ...data.documents[docType],
                  file: uploadedUrls[index],
                };
              }
              return acc;
            },
            {}
          ),
        },
      };
      console.log(finalPayload);
      // Update profile with the complete payload
      updateProfile.mutate(finalPayload, {
        onSuccess: () => {
          setIsEditRequested(false);
          setSelectedFiles({});
          message.success('Profile updated successfully');
        },
        onError: () => {
          message.error('Failed to update profile');
        },
      });
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const storeListResponse = stores?.data?.data as StoreListResponse;

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: 'profile',
        label: 'Profile Information',
        children: (
          <div className="py-6 space-y-6">
            <WelcomeSection
              data={profile}
              isLoading={profileData?.isLoading}
              isFetching={profileData?.isFetching}
              refetch={profileData?.refetch}
            />
            <BusinessProfile
              businessInfo={profile?.business}
              isLoading={profileData?.isLoading}
              isEditRequested={isEditRequested}
              handleChange={handleChange}
            />
            <FinanceSection
              financeInfo={profile?.finance}
              isLoading={profileData?.isLoading}
              isEditRequested={isEditRequested}
              handleChange={handleChange}
            />
            <DocumentsSection
              documents={profile?.documents}
              isLoading={profileData?.isLoading}
              isEditRequested={isEditRequested}
              setSelectedFiles={setSelectedFiles}
              handleChange={handleChange}
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
            onExport={setExportType}
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
          <SubscriptionList
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
    ],
    [stores, profile, isEditRequested, handleUpdateProfile, handleChange]
  );

  const onChange = (key: string) => {
    setTab(key);
    setSearchParams({ tab: key });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-sm text-gray-500">
            Track and measure store performance and analytics here
          </p>
        </div>
        {tab === 'profile' && (
          <>
            {isEditRequested ? (
              <div className="flex items-center gap-2">
                <Button
                  type="default"
                  onClick={() => setIsEditRequested(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  loading={updateProfile.isPending || MediaState.isPending}
                  onClick={() => handleUpdateProfile(profile)}
                >
                  Submit Request
                </Button>
              </div>
            ) : (
              <Button type="default" onClick={() => setIsEditRequested(true)}>
                Request Edit
              </Button>
            )}
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <Tabs
            defaultActiveKey={tab}
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
