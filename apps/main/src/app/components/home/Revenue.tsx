import { Stores } from '@/app/pages/staff/types';
import CardWithFilter from '../common/CardWithFilter';
import EmptyState from '../common/EmptyState';
import FilterGroup from '../common/filters/FilterGroup';
import RevenueChart from './charts/RevenueChart';
import DatePickerComp, { DateRange } from '../date/DatePickerrComp';
import { Select, Skeleton } from 'antd';
import { Button } from 'antd';
import { monthAbbreviation } from '../../../utils/helper';
import { Dayjs } from 'dayjs';
import YearPicker from '../date/YearPicker';

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
interface MonthlyEarnings {
  [month: string]: string;
}
interface RevenueProps {
  revenueData: any;
  storeList: Stores[];
  onRangeChange: (dates: DateRange, dateStrings: string[]) => void;
  reset: () => void;
  setSelectedStore: (value: string) => void;
  isLoading: boolean;
  year: Dayjs | null;
  setYear: (value: Dayjs | null) => void;
}

const Revenue = ({
  revenueData,
  storeList,
  onRangeChange,
  reset,
  setSelectedStore,
  isLoading,
  year,
  setYear,
}: RevenueProps) => {
  // console.log(revenueData?.data);

  const revenueRes = revenueData?.data?.data;
  const revData = revenueRes
    ? Object.entries(revenueRes)?.map(([month, value]) => ({
        month: monthAbbreviation(month),
        value: value,
      }))
    : [];
  // console.log(revData);
  return (
    <CardWithFilter
      title="Revenue Analytics"
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
      {revData?.length > 0 ? (
        isLoading || revenueData.isLoading ? (
          <Skeleton active />
        ) : (
          <div className="w-full h-full min-h-[400px] max-w-[1200px] mx-auto">
            <RevenueChart data={revData} />
          </div>
        )
      ) : (
        <EmptyState description="You have no data here yet." />
      )}
    </CardWithFilter>
  );
};

export default Revenue;
