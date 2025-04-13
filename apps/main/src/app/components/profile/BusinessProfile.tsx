import { Typography, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface BusinessProfileProps {
  businessInfo: {
    name: string;
    email: string;
    category: string;
    type: string;
    phone: string;
    vendorId: string;
    address: string;
    location: string;
  };
}

const BusinessProfile = ({ businessInfo }: BusinessProfileProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">BUSINESS PROFILE</h3>
        <Text className="text-gray-500 text-sm">
          To edit your business profile, please contact{' '}
          <a href="#" className="text-blue-600">support</a>
        </Text>
      </div>

      <div className="grid grid-cols-2 gap-x-24 gap-y-6">
        <div>
          <Text className="text-gray-500 block mb-1">Business name</Text>
          <Text className="text-gray-900">{businessInfo.name}</Text>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">Business email</Text>
          <Text className="text-gray-900">{businessInfo.email}</Text>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">Business category</Text>
          <Text className="text-gray-900">{businessInfo.category}</Text>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">Business type</Text>
          <Text className="text-gray-900">{businessInfo.type}</Text>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">Business phone number</Text>
          <Text className="text-gray-900">{businessInfo.phone}</Text>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">Vendor ID</Text>
          <Space>
            <InfoCircleOutlined className="text-blue-600" />
            <Text className="text-gray-900">{businessInfo.vendorId}</Text>
          </Space>
        </div>
        <div className="col-span-2">
          <Text className="text-gray-500 block mb-1">Business address</Text>
          <Text className="text-gray-900">
            {businessInfo.address}
            <br />
            {businessInfo.location}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;