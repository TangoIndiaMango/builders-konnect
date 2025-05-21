import React from 'react';
import { Radio, Skeleton, Typography } from 'antd';

const { Text } = Typography;

interface AddressCardProps {
  id: string | number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  companyName: string;
  loading?: boolean;
  isSelected?: boolean;
  onSelect: (id: string | number) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  id,
  name,
  address,
  city,
  state,
  country,
  companyName,
  loading,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-[#F9F9F9] hover:border-blue-300'}`}
      onClick={() => onSelect(id)}
    >
      <Radio
        checked={isSelected}
        className="mt-1 mr-3"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex flex-col w-full">
        <Skeleton loading={loading} active paragraph={false}>
          <div className="flex items-center gap-2 justify-between">
            <Text strong className="text-gray-800">
              {name}
            </Text>
            <Text className="text-gray-300 italic">{companyName}</Text>
          </div>
        </Skeleton>
        <Skeleton loading={loading} active paragraph={{ rows: 1 }}>
          <Text className="text-gray-600 mt-1">{address}</Text>
        </Skeleton>
        <Skeleton loading={loading} active paragraph={{ rows: 1 }}>
          <Text className="text-gray-600 mt-1">
            {city}, {state}, {country}
          </Text>
        </Skeleton>
      </div>
    </div>
  );
};

export default AddressCard;
