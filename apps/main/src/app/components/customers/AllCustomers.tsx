import { Button } from 'antd';
import DisplayHeader from '../common/DisplayHeader';
import TableStats from '../common/TableStats';
import { CustomersTable } from './table/customerTable';
import TableWrapper from '../common/Table/TableWrapper';
import { Customer } from '../../lib/mockData';

import { PaginatedResponse } from '../../types/paginatedData';
import { SkeletonLoader } from '../common/SkeletonLoader';
import DatePickerComp from '../date/DatePickerrComp';
import { FilterState } from '../../types/table';

export interface TabStatsinterface {
  total: number;
  online: number;
  offline: number;
}

export interface CustomersDataInterface {
  data: PaginatedResponse<Customer>;
  stats: TabStatsinterface;
}
export interface CustomersProps extends FilterState {
  data: CustomersDataInterface;
  isLoading: boolean;
  withPagination?: boolean;
}
const AllCustomers = ({
  data,
  isLoading,
  setSearchValue,
  searchValue,
  currentPage,
  setCustomDateRange,
  handleFilterChange,
  filterValue,
  onExport,
  filterOptions,
  setPage,
  reset,
  updateLimitSize,
  withPagination = true,
}: CustomersProps) => {
  const tableStatsData = [
    {
      label: 'Total Customers',
      value: `${data?.stats?.total || 0}`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: 'Online',
      value: `${data?.stats?.online || 0}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: 'Offline',
      value: `${data?.stats?.offline || 0}`,
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
            <DatePickerComp onRangeChange={setCustomDateRange} />
          </div>
        }
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x divide-gray-300">
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

      <TableWrapper
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onFilterChange={handleFilterChange}
        selectedFilter={filterValue}
        onExport={onExport}
        filterOptions={filterOptions}
      >
        <CustomersTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={setPage}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
          perPage={data?.data?.per_page}
          updateLimitSize={updateLimitSize}
          withPagination={withPagination}
        />
      </TableWrapper>
    </div>
  );
};

export default AllCustomers;
