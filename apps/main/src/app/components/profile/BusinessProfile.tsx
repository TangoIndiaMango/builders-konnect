import { Typography } from 'antd';
import { handleCopy } from '../../../utils/helper';
import { CopyIcon } from '../../lib/CustomIcon';
import { BusinessInfo } from '../../pages/profile/types';
import { SkeletonLoader } from '../common/SkeletonLoader';
import InfoField from './InfoField';

const { Text } = Typography;

interface BusinessProfileProps {
  businessInfo: BusinessInfo;
  isLoading: boolean;
  isEditRequested: boolean;
  handleChange: (field: string, value: string) => void;
}

const BusinessProfile = ({
  businessInfo,
  isLoading,
  isEditRequested,
  handleChange,
}: BusinessProfileProps) => {


  return (
    <div className="grid grid-cols-1 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm lg:grid-cols-[0.3fr_0.7fr]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">BUSINESS PROFILE</h3>
          <Text className="text-sm text-gray-500">
            To edit your business profile, please contact{' '}
            <a href="#" className="text-blue-600">
              support
            </a>
          </Text>
        </div>
      </div>

      <SkeletonLoader active={isLoading} type="list">
        <div className="grid grid-cols-1 gap-x-24 gap-y-6 md:grid-cols-2">
          <InfoField
            field={{ label: 'Business name', value: businessInfo?.name }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('name', value)}
          />
          <InfoField
            field={{ label: 'Business email', value: businessInfo?.email }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('email', value)}
          />
          <InfoField
            field={{
              label: 'Business category',
              value: businessInfo?.category,
            }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('category', value)}
          />
          <InfoField
            field={{ label: 'Business type', value: businessInfo?.type }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('type', value)}
          />
          <InfoField
            field={{
              label: 'Business phone number',
              value: businessInfo?.phone,
            }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('phone', value)}
          />
          <InfoField
            field={{
              label: 'Vendor ID',
              value: (
                <div
                  onClick={() =>
                    handleCopy(businessInfo?.vendorID, 'Vendor ID copied!')
                  }
                  className="flex gap-3 hover:text-blue-600 cursor-pointer"
                >
                  <CopyIcon color="blue" />
                  <Text className="hover:text-blue-600 cursor-pointer">
                    {businessInfo?.vendorID}
                  </Text>
                </div>
              ),
            }}
            isEdit={false}
          />
          <InfoField
            field={{ label: 'Business address', value: businessInfo?.address }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('address', value)}
          />
        </div>
      </SkeletonLoader>
    </div>
  );
};

export default BusinessProfile;
