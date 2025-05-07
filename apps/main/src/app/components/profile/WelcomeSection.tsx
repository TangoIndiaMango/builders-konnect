import { Upload, Button, Avatar, notification } from 'antd';
import type { UploadProps } from 'antd';
import { useFetchData, usePutData } from '../../../hooks/useApis';
import { beforeUpload } from '../../../utils/helper';
import {
  useUploadFileMedia,
  UploadedResInterface,
} from '../../../hooks/useUpload';
import { useState } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { VendorProfile } from '../../pages/profile/types';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
const acceptedFileTypes = '.jpg,.png,.jpeg';
const WelcomeSection = ({
  data,
  isLoading,
}: {
  data: VendorProfile;
  isLoading: boolean;
}) => {
  const [fileRes, setFileRes] = useState<UploadedResInterface | null>(null);
  // const profile = useFetchData('merchants/profile');
  const { user, updateUser } = useSessionStorage();
  const updateprofile = usePutData('merchants/profile');
  const { handleFileUpload } = useUploadFileMedia();
  const handleUpload: UploadProps['onChange'] = async (fileInfo) => {
    console.log(fileInfo);
    if (fileInfo.file) {
      const uploadRes = await handleFileUpload(fileInfo.file);
      console.log(uploadRes?.url);
      setFileRes(uploadRes[0]);
      await updateprofile.mutateAsync(
        {
          logo: uploadRes[0]?.url,
        },
        {
          onSuccess: () => {
            notification.success({
              message: 'Logo uploaded successfully',
              description: 'Your logo has been uploaded successfully',
            });
          },
        }
      );
    }
  };
  const isLoadingProfile = updateprofile.isPending || isLoading;
  return (
    <div className="p-8 mb-6 bg-white rounded-lg shadow-sm">
      <SkeletonLoader active={isLoadingProfile} type="card" rows={1}>
        <div className="flex flex-wrap items-center gap-6">
          <div className="">
            <Avatar
              shape="circle"
              size={100}
              src={
                data?.logo ??
                fileRes?.url ??
                'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
              }
              alt={data?.logo ?? 'Business Logo'}
              className="object-cover w-full h-full"
              style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            />
          </div>
          {data?.logo ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-blue-900">
                {data?.business?.name}
              </h2>
              <p className="text-gray-600">
                <MailOutlined className="text-blue-600" />{' '}
                {data?.business?.email}
              </p>
              <p className="text-gray-600">
                <PhoneOutlined className="text-blue-600" />{' '}
                {data?.business?.phone}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-blue-900">
                Welcome Onboard!
              </h2>
              <p className="text-gray-600">
                Complete your business profile by uploading your business logo
              </p>
              <Upload
                onChange={handleUpload}
                showUploadList={false}
                beforeUpload={beforeUpload}
                accept={acceptedFileTypes}
                maxCount={1}
              >
                <Button type="primary" className="w-fit">
                  Upload Logo
                </Button>
              </Upload>
            </div>
          )}
        </div>
      </SkeletonLoader>
    </div>
  );
};

export default WelcomeSection;
