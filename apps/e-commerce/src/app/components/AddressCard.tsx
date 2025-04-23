import React from 'react';
import { Typography } from 'antd';

const { Text, Link } = Typography;

interface AddressCardProps {
  name: string;
  address: string;
  onChangeClick: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  name,
  address,
  onChangeClick,
}) => {
  return (
    <div className="flex items-start p-4 border border-gray-200 rounded-lg bg-[#F9F9F9]">
      <div className="flex flex-col">
        <Text strong className="text-gray-800">
          {name}
        </Text>
        <Text className="text-gray-600 mt-1">{address}</Text>
        <Link onClick={onChangeClick} className="mt-2 text-sm">
          Change
        </Link>
      </div>
    </div>
  );
};

export default AddressCard;
