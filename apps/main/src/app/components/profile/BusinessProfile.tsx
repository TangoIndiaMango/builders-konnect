import { Typography, Space, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
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
    <div className="grid grid-cols-2 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">BUSINESS PROFILE</h3>
        <Text className="text-sm text-gray-500">
          To edit your business profile, please contact{' '}
            <a href="#" className="text-blue-600">support</a>
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-24 gap-y-6">
        <div>
          <Text className="block mb-1 text-gray-500">Business name</Text>
          <Text className="text-gray-900">{businessInfo.name}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">Business email</Text>
          <Text className="text-gray-900">{businessInfo.email}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">Business category</Text>
          <Text className="text-gray-900">{businessInfo.category}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">Business type</Text>
          <Text className="text-gray-900">{businessInfo.type}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">Business phone number</Text>
          <Text className="text-gray-900">{businessInfo.phone}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">Vendor ID</Text>
          <Space>
            <InfoCircleOutlined className="text-blue-600" />
            <Text className="text-gray-900">{businessInfo.vendorId}</Text>
          </Space>
        </div>
        <div className="col-span-2">
          <Text className="block mb-1 text-gray-500">Business address</Text>
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