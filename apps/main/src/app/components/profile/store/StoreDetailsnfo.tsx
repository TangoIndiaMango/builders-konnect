// apps/main/src/app/components/profile/store/StoreDetailsInfo.tsx
import React from 'react';
import { Skeleton, Tag } from 'antd';
import { SingleStoreResponse } from '../../../pages/profile/types';
interface StoreDetailsInfoProps {
  data?: SingleStoreResponse;
  isLoading?: boolean;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(',', ' |');
};

const StoreDetailsInfo: React.FC<StoreDetailsInfoProps> = ({
  data,
  isLoading,
}) => {
  return (
    <div className="w-full p-4 bg-[#FAFAFA] rounded md:p-6 border-[#F5F5F5] border  shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
        {/* Store ID */}
        <div>
          <div className="mb-1 text-gray-500">Store ID</div>
          <Skeleton loading={isLoading} active paragraph={false}>
            <div className="text-blue-700 cursor-pointer">
              {data?.storeID ?? 'N/A'}
            </div>
          </Skeleton>
        </div>
        {/* Date Created */}
        <div>
          <div className="mb-1 text-gray-500">Date Created</div>
          <Skeleton loading={isLoading} active paragraph={false}>
            <div className="text-gray-900">
              {formatDate(data?.date_created)}
            </div>
          </Skeleton>
        </div>
        {/* Status */}
        <div>
          <div className="mb-1 text-gray-500">Status</div>
          <Skeleton loading={isLoading} active paragraph={false}>
            <Tag
              color={data?.status?.toLowerCase() === 'active' ? 'green' : 'red'}
            className={
              data?.status?.toLowerCase() === 'active'
                ? 'border border-green-200 bg-green-50 text-green-700'
                : 'border border-red-200 bg-red-50 text-red-700'
            }
          >
              {data?.status ?? 'N/A'}
            </Tag>
          </Skeleton>
        </div>
        {/* Address */}
        <div>
          <div className="mb-1 text-gray-500">Address</div>
          <Skeleton loading={isLoading} active paragraph={false}>
            <div className="text-gray-900">
              {data?.address ?? 'N/A'}
            </div>
          </Skeleton>
        </div>
        {/* Total Staff */}
        <div>
          <div className="mb-1 text-sm text-gray-500">Total Staff</div>
          <Skeleton loading={isLoading} active paragraph={false}>
            <div className="text-gray-900">
              {data?.total_staff ?? 0}
            </div>
          </Skeleton>
        </div>
        {/* Total Registered Customers */}
        <div>
          <div className="mb-1 text-sm text-gray-500">
            Total Registered Customers
          </div>
          <Skeleton loading={isLoading} active paragraph={false}>
            <div className="text-gray-900">
              {data?.total_customers ?? 0}
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsInfo;
