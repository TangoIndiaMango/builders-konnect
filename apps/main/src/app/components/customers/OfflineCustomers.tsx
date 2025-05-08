import { Button } from 'antd';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import TableStats from '../common/TableStats';
import { CustomersTable } from './table/customerTable';
import TableWrapper from '../common/Table/TableWrapper';
import { Customer } from '../../lib/mockData';
import { PaginatedResponse } from '../../types/paginatedData';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { FilterOption } from '@/app/store/table';

export interface TabStatsinterface {
  total: number;
  online: number;
  offline: number;
}

export interface CustomersDataInterface {
  data: PaginatedResponse<Customer>;
  stats: TabStatsinterface;
}
export interface CustomersProps {
  data: CustomersDataInterface;
  isLoading: boolean;
  setSearchTerm: (searchTerm: string) => void;
  periodFilter: string;
  setPeriodFilter: (periodFilter: string) => void;
  currentPage: number;
  reset: () => void;
  setCurrentPage: (currentPage: number) => void;
  periodOptions: FilterOption[];
}
const OfflineCustomers = ({ data, isLoading, setSearchTerm, periodFilter, setPeriodFilter, periodOptions, currentPage, setCurrentPage, reset }: CustomersProps) => {
  
  const tableStatsData = [
    {
      label: 'Total Customers',
      value: `${data?.stats?.total || 0 }`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: 'Online',
      value: `${data?.stats?.online || 0 }`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: 'Offline',
      value: `${data?.stats?.offline || 0 }`,
      valueBgColor: '#FFFBE6',
      valueColor: '#D48806',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="All Customers"
        description="You're viewing all customers below."
        actionButton={
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={reset}>Clear</Button>
            <TimelineFilter
              value={periodFilter}
              onChange={setPeriodFilter}
              options={periodOptions}
            />
          </div>
        }
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
          {tableStatsData?.map((item, index) => (
            <TableStats
              key={index}
              label={item?.label}
              value={item?.value}
              valueBgColor={item?.valueBgColor}
              valueColor={item?.valueColor}
            />
          ))}
        </div>
      </SkeletonLoader>

      <TableWrapper onSearch={setSearchTerm}>
        <CustomersTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
        />
      </TableWrapper>
    </div>
  );
};

export default OfflineCustomers;
