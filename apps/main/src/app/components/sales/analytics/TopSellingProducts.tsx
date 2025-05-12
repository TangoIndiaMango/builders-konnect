import { Avatar, Typography } from 'antd';
import { useState } from 'react';
import { useFetchData } from '../../../../hooks/useApis';
import CardWithFilter from '../../common/CardWithFilter';
import FilterDropdown from '../../common/filters/FilterDropdown';
import { SkeletonLoader } from '../../common/SkeletonLoader';

const { Text } = Typography;

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  soldCount: number;
}

interface TopSellingProducts {
  name: string
  sku: string
  quantity_sold: number
  image?: string
}

export const ProductListItem = ({ product, id }: { product: TopSellingProducts, id: number }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-6 h-6 text-white bg-[#003399] rounded-full">
          <span>{id}</span>
        </div>
        <Avatar
          shape="square"
          size={40}
          src={product?.image || `https://api.dicebear.com/7.x/miniavs/svg?seed=${product?.sku}`}
          style={{ backgroundColor: '#f0f0f0' }}
        />
        <div className="flex flex-col">
          <Text strong className='capitalize'>{product?.name}</Text>
          <Text type="secondary">{product?.sku}</Text>
        </div>
      </div>
      <div>
        <Text strong>{product?.quantity_sold} sold</Text>
      </div>
    </div>
  );
};

const TopSellingProducts = () => {
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('this_month');
  const topProducts = useFetchData(`merchants/sales-orders/analytics/top-selling-products`)
  const topProductsStats = topProducts?.data?.data as TopSellingProducts[]



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
      <SkeletonLoader active={topProducts?.isLoading} type="list" rows={4}>
        <div className="mt-4">
          {topProductsStats?.map((product, index) => (
            <ProductListItem key={index} product={product} id={index + 1} />
          ))}
      </div>
      </SkeletonLoader>
    </CardWithFilter>
  );
};

export default TopSellingProducts;
