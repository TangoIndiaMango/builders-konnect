import React, { useState } from 'react';
import CardWithFilter from '../../common/CardWithFilter';
import FilterDropdown from '../../common/filters/FilterDropdown';
import { Avatar } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  soldCount: number;
}

export const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-6 h-6 text-white bg-[#003399] rounded-full">
          <span>{product.id}</span>
        </div>
        <Avatar
          shape="square"
          size={40}
          src={product.imageUrl || `https://api.dicebear.com/7.x/miniavs/svg?seed=${product.id}`}
          style={{ backgroundColor: '#f0f0f0' }}
        />
        <div className="flex flex-col">
          <Text strong>{product.name}</Text>
          <Text type="secondary">{product.description}</Text>
        </div>
      </div>
      <div>
        <Text strong>{product.soldCount} sold</Text>
      </div>
    </div>
  );
};


const products: Product[] = [
  {
    id: 1,
    name: 'Premium Cement',
    description: '10kg Smooth',
    imageUrl: '',
    soldCount: 250
  },
  {
    id: 2,
    name: 'Premium Cement',
    description: '10kg Smooth',
    imageUrl: '',
    soldCount: 250
  },
  {
    id: 3,
    name: 'Premium Cement',
    description: '10kg Smooth',
    imageUrl: '',
    soldCount: 250
  },
  {
    id: 4,
    name: 'Premium Cement',
    description: '10kg Smooth',
    imageUrl: '',
    soldCount: 250
  },
  {
    id: 5,
    name: 'Premium Cement',
    description: '10kg Smooth',
    imageUrl: '',
    soldCount: 250
  },
  {
    id: 6,
    name: 'Premium Cement',
    description: '10kg Smooth',
    imageUrl: '',
    soldCount: 250
  },
];

const TopSellingProducts = () => {
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('this_month');



  const storeOptions = [
    { label: 'All orders', value: 'all' },
    { label: 'Order 1', value: 'order_1' },
    { label: 'Order 2', value: 'order_2' },
  ];

  const periodOptions = [
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Year', value: 'this_year' },
    { label: 'Custom Range', value: 'custom' },
  ];

  return (
    <CardWithFilter
      title="Top Selling Products"
      description="See your top performing products here."
      rightSection={
        <div className="flex flex-wrap items-center justify-end gap-2">
          <FilterDropdown
            options={storeOptions}
            value={selectedStore}
            onChange={setSelectedStore}
          />
          <FilterDropdown
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>
      }
    >
      <div className="mt-4">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </CardWithFilter>
  );
};

export default TopSellingProducts;
