import { Upload, Button, Avatar, notification, Spin } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useFetchData, usePutData } from '../../../hooks/useApis';
import { beforeUpload } from '../../../utils/helper';
import {
  useUploadFileMedia,
  UploadedResInterface,
} from '../../../hooks/useUpload';
import { useState, useRef } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { StaffProfile } from '../../pages/settings/types';
import { VendorProfile } from '../../pages/profile/types';

const acceptedFileTypes = '.jpg,.png,.jpeg';

const WelcomeSection = ({
  data,
  isLoading,
  isFetching,
  isProfile,
  refetch,
}: {
  data: StaffProfile | VendorProfile;
  isLoading: boolean;
  isFetching: boolean;
  isProfile?: boolean;
  refetch: () => void;
}) => {
  const [fileRes, setFileRes] = useState<UploadedResInterface | null>(null);
  const { user, updateUser } = useSessionStorage();
  const updateprofile = usePutData('merchants/profile');
  const updateStaffProfile = usePutData('merchants/staff/update/profile');
  const { handleFileUpload } = useUploadFileMedia();
  const uploadRef = useRef<any>(null);
  const [uploading, setUploading] = useState(false);

  const avatarSrc = isProfile
    ? (data as StaffProfile)?.avatar ??
      fileRes?.url ??
      'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
    : (data as VendorProfile)?.logo ??
      fileRes?.url ??
      'https://api.dicebear.com/7.x/miniavs/svg?seed=1';

  const hasAvatar =
    !!(isProfile
      ? (data as StaffProfile)?.avatar
      : (data as VendorProfile)?.logo) || !!fileRes?.url;

  const handleUpload: UploadProps['onChange'] = async (fileInfo) => {
    if (fileInfo.file) {
      setUploading(true);
      const uploadRes = await handleFileUpload(fileInfo.file);
      setFileRes(uploadRes[0]);

      let payload = {};
      if (isProfile) {
        payload = {
          avatar: uploadRes[0]?.url,
        };
      } else {
        payload = {
          logo: uploadRes[0]?.url,
        };
      }
      const apiCall = isProfile ? updateStaffProfile : updateprofile;
      await apiCall.mutateAsync(payload, {
        onSuccess: (data) => {
          console.log(data);
          notification.success({
            message: isProfile
              ? 'Avatar uploaded successfully'
              : 'Logo uploaded successfully',
            description: isProfile
              ? 'Your avatar has been uploaded successfully'
              : 'Your logo has been uploaded successfully',
          });
          refetch();
        },
      });
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 mb-6 bg-white rounded-lg shadow-sm">
        <SkeletonLoader active type="card" rows={1} />
      </div>
    );
  }

  return (
    <div className="p-8 mb-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-wrap items-center gap-6">
        <div className="relative">
          <Spin spinning={uploading || isFetching}>
            <Avatar
              shape="circle"
              size={100}
              src={avatarSrc}
              alt={isProfile ? 'Personal Avatar' : 'Business Logo'}
              className="object-cover w-full h-full"
              style={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
                cursor: hasAvatar ? 'pointer' : 'default',
              }}
            />
            {hasAvatar && (
              <Upload
                onChange={handleUpload}
                showUploadList={false}
                beforeUpload={beforeUpload}
                accept={acceptedFileTypes}
                maxCount={1}
                className="absolute w-8 h-8 bg-[#F0F0F0] rounded-full shadow-sm cursor-pointer bottom-1 right-1 flex items-center justify-center hover:bg-[#E0E0E0]"
                style={{ zIndex: 2 }}
              >
                <EditOutlined style={{ color: '#003399', fontSize: 18 }} />
              </Upload>
            )}
          </Spin>
        </div>
        {hasAvatar ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-blue-900">
              {isProfile
                ? (data as StaffProfile)?.name
                : (data as VendorProfile)?.business?.name}
            </h2>
            <p className="text-gray-600">
              <MailOutlined className="text-blue-600" />{' '}
              {isProfile
                ? (data as StaffProfile)?.email
                : (data as VendorProfile)?.business?.email}
            </p>
            <p className="text-gray-600">
              <PhoneOutlined className="text-blue-600" />{' '}
              {isProfile
                ? (data as StaffProfile)?.phone
                : (data as VendorProfile)?.business?.phone}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-blue-900">
              Welcome Onboard!
            </h2>
            <p className="text-gray-600">
              Complete your {isProfile ? 'profile' : 'business profile'} by
              uploading your {isProfile ? 'avatar' : 'business logo'}
            </p>
            <Upload
              onChange={handleUpload}
              showUploadList={false}
              beforeUpload={beforeUpload}
              accept={acceptedFileTypes}
              maxCount={1}
            >
              <Button type="primary" className="w-fit">
                Upload {isProfile ? 'Avatar' : 'Logo'}
              </Button>
            </Upload>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeSection;
