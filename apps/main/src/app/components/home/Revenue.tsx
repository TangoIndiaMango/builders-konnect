import { Stores } from '@/app/pages/staff/types';
import CardWithFilter from '../common/CardWithFilter';
import EmptyState from '../common/EmptyState';
import FilterGroup from '../common/filters/FilterGroup';
import RevenueChart from './charts/RevenueChart';
import DatePickerComp, { DateRange } from '../date/DatePickerrComp';
import { Select } from 'antd';
import { Button } from 'antd';

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1992 Q2', value: 4.3 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

interface RevenueProps {
  revenueData: any;
  storeList: Stores[];
  onRangeChange: (dates: DateRange, dateStrings: string[]) => void;
  reset: () => void;
  setSelectedStore: (value: string) => void;
}

const Revenue = ({
  revenueData,
  storeList,
  onRangeChange,
  reset,
  setSelectedStore,
}: RevenueProps) => {
  console.log(revenueData?.data);
  return (
    <CardWithFilter
      title="Revenue Analytics"
      description="Create sales orders and track order sales and performance here"
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

          <DatePickerComp onRangeChange={onRangeChange} />
        </div>
      }
    >
      {data?.length > 0 ? (
        <div className="w-full h-full min-h-[400px] max-w-[1200px] mx-auto">
          <RevenueChart data={data} />
        </div>
      ) : (
        <EmptyState description="You have no data here yet." />
      )}
    </CardWithFilter>
  );
};

export default Revenue;
