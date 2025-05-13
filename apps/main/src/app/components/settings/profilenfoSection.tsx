import { Typography } from 'antd';
import { handleCopy } from '../../../utils/helper';
import { CopyIcon } from '../../lib/CustomIcon';
import { VendorProfile } from '../../pages/profile/types';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { StaffProfile } from '../../pages/settings/types';

const Text = Typography;
const ProfileInfoSection = ({
  data,
  isLoading,
}: {
  data: StaffProfile;
  isLoading: boolean;
}) => {
  return (
    <div className="p-6 bg-white border border-gray-50 rounded-md shadow-sm">
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
                <p className="font-medium">{data?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Phone number</p>
                <p className="font-medium">{data?.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Role</p>
                <p className="font-medium">{data?.role || 'N/A'}</p>
              </div>
            </div>

            {/* Right Sub-Column */}
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-medium">{data?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">User ID</p>
                <div
                  onClick={() => handleCopy(data?.staffID, 'Staff ID copied!')}
                  className="flex gap-3 hover:text-blue-600 cursor-pointer"
                >
                  <CopyIcon color="blue" />
                  <Text className="hover:text-blue-600 cursor-pointer">
                    {data?.staffID}
                  </Text>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Store Assigned</p>
                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                  {data?.store}
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
