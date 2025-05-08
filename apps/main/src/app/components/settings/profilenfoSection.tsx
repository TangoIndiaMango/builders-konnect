import React from 'react';
import { VendorProfile } from '../../pages/profile/types';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { handleCopy } from '../../../utils/helper';
import { CopyOutlined } from '@ant-design/icons';
const ProfileInfoSection = ({
  data,
  isLoading,
}: {
  data: VendorProfile;
  isLoading: boolean;
}) => {
  return (
    <div className="p-6 bg-white border rounded-md shadow-sm">
      <div className="grid grid-cols-6 gap-6 text-sm text-gray-700">
        {/* Left label only */}
        <div className="col-span-1">
          <h3 className="text-sm font-semibold text-black">
            PROFILE INFORMATION
          </h3>
        </div>

        {/* Right content */}
        <SkeletonLoader active={isLoading} type="list" rows={1}>
          <div className="grid grid-cols-2 col-span-5 gap-y-5">
            {/* Left Sub-Column */}
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400">Name</p>
                <p className="font-medium">{data?.personal?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Phone number</p>
                <p className="font-medium">{data?.business?.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Role</p>
                <p className="font-medium">{data?.business?.category}</p>
              </div>
            </div>

            {/* Right Sub-Column */}
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-medium">{data?.personal?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">User ID</p>
                <button
                  onClick={() =>
                    handleCopy(data?.business?.vendorID, 'Vendor ID copied!')
                  }
                  className="flex items-start gap-3"
                >
                  <CopyOutlined color="blue" />
                  <h5 className="text-xs text-[#344054]">
                    {data?.business?.vendorID}
                  </h5>
                </button>
              </div>
              <div>
                <p className="text-xs text-gray-400">Store Assigned</p>
                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                  {data?.business?.name}
                </span>
              </div>
            </div>
          </div>
        </SkeletonLoader>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
