import { DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Divider, Select, Skeleton } from 'antd';
import CardWithFilter from '../common/CardWithFilter';
import EmptyState from '../common/EmptyState';
import FilterGroup from '../common/filters/FilterGroup';
import StatsCard from '../common/StatsCard';
import ProductSalesChart from './charts/ProductSalesChart';
import CustomerListItem from './customer/CustomerListItem';
import CustomerTrafficChart from './charts/CustomerTrafficChart';
import { customerData as dummyData } from './constant';
import { useNavigate } from 'react-router-dom';
import DatePickerComp, { DateRange } from '../date/DatePickerrComp';
import { monthAbbreviation } from '../../../utils/helper';
import { Dayjs } from 'dayjs';
import YearPicker from '../date/YearPicker';
const data = [
  { name: 'Cement', sales: 200, value: 30, amount: 4544 },
  { name: 'Paint', sales: 126, value: 25, amount: 4544 },
  { name: 'Tiles', sales: 100, value: 20, amount: 4544 },
  { name: 'Cement Mixer', sales: 50, value: 15, amount: 4544 },
  { name: 'Paint brush', sales: 20, value: 5, amount: 4544 },
  { name: 'Screed', sales: 18, value: 5, amount: 4544 },
];

const products = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
  },
];

const statsData = [
  {
    title: 'Total Products',
    value: 0,
    color: 'blue' as const,
    icon: <ShoppingCartOutlined style={{ fontSize: 16 }} />,
  },
  {
    title: 'Revenue Generated',
    value: 0,
    color: 'pink' as const,
    icon: <DollarOutlined style={{ fontSize: 16 }} />,
  },
];

interface CustomerProps {
  customerData: any;
  storeList: any;
  onRangeChange: (dates: DateRange, dateStrings: string[]) => void;
  setSelectedStore: (value: string) => void;
  reset: () => void;
  recentCustomerData: any;
  recentCustomerLoading: boolean;
  isLoading: boolean;
  year: Dayjs | null;
  setYear: (value: Dayjs | null) => void;
}

const Customer = ({
  customerData,
  storeList,
  onRangeChange,
  setSelectedStore,
  reset,
  recentCustomerData,
  recentCustomerLoading,
  isLoading,
  year,
  setYear,
}: CustomerProps) => {
  const customerRes = customerData?.data?.data;
  const cusData = customerRes
    ? Object.entries(customerRes)?.map(([month, value]) => ({
        month: monthAbbreviation(month),
        value: Number(value),
      }))
    : [];

  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <div className="md:col-span-2">
        <CardWithFilter
          title="Customer Traffic"
          description=""
          rightSection={
            <div className="flex items-center gap-2 justify-end flex-wrap">
              <Button onClick={reset}>Clear</Button>
              <Select
                placeholder="Select store"
                // mode="multiple"
                allowClear
                size="large"
                className="rounded w-[200px]"
                showSearch
                filterOption={(input, option) =>
                  (option?.label?.toString() ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={storeList?.map((store) => ({
                  value: store.id,
                  label: store.name,
                }))}
                onChange={(value) => setSelectedStore(value)}
              />

              <YearPicker onChange={setYear} value={year} />
            </div>
          }
        >
          {cusData?.length > 0 ? (
            <div className="space-y-5">
              <div>
                {/* <h3 className="text-lg font-semibold">Customer Traffic</h3> */}
                {isLoading ? (
                  <Skeleton active />
                ) : (
                  <CustomerTrafficChart data={cusData} />
                )}
              </div>
            </div>
          ) : (
            <EmptyState description="You have no data here yet." />
          )}
        </CardWithFilter>
      </div>

      <div className="w-full xl:col-span-1">
        <CardWithFilter title="Recent Customers">
          {recentCustomerData?.data?.data?.data?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {isLoading || recentCustomerLoading ? (
                <Skeleton active />
              ) : (
                recentCustomerData?.data?.data?.data
                  ?.slice(0, 5)?.map((customer) => (
                    <CustomerListItem
                      key={customer.id}
                      name={customer.name}
                      email={customer.email}
                      avatar={customer.avatar}
                      onClick={() =>
                        navigate(`/pos/customers/view/${customer.id}`)
                      }
                    />
                  ))
              )}
              <Button
                type="link"
                className="w-full"
                onClick={() => navigate('/pos/customers/list')}
              >
                View All
              </Button>
            </div>
          ) : (
            <EmptyState description="You have no data here yet." />
          )}
        </CardWithFilter>
      </div>
    </div>
  );
};

export default Customer;
