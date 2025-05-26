import { Avatar, Button, Typography } from 'antd';
import { useFetchData } from '../../../../hooks/useApis';
import { useTableState } from '../../../../hooks/useTable';
import CardWithFilter from '../../common/CardWithFilter';
import { SkeletonLoader } from '../../common/SkeletonLoader';
import DatePickerComp, { DateRange } from '../../date/DatePickerrComp';

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

interface TopSellingProductsProps {
  reset: () => void;
  onRangeChange: (dates: DateRange, dateStrings: string[]) => void;
  dateRange: string | null;
}

const TopSellingProducts = () => {
  const {reset, setCustomDateRange, customDateRange} = useTableState("sales-analytics")

  const topProducts = useFetchData(`merchants/sales-orders/analytics/top-selling-products`)
  const topProductsStats = topProducts?.data?.data as TopSellingProducts[]

  return (
    <CardWithFilter
      title="Top Selling Products"
      description="See your top performing products here."
      rightSection={
        <div className="flex items-center gap-2 justify-end flex-wrap">
        <Button onClick={reset}>Clear</Button>
        {/* <Select
          placeholder="Select store"
          // mode="multiple"
          allowClear
          size="large"
          className="rounded w-[200px]"
          showSearch
          value={selectedStore || undefined}
          filterOption={(input, option) =>
            (option?.label?.toString() ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={storeList?.map((store) => ({
            value: store.id,
            label: store.name,
          }))}
          onChange={(value) => {
            setSelectedStore(value);
            console.log(value, 'value');
          }}
        /> */}

        <DatePickerComp onRangeChange={setCustomDateRange} value={customDateRange} />
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
