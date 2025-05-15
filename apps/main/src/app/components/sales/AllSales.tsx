import { Button } from 'antd';
import { formatBalance } from '../../../utils/helper';
import { SalesOrder } from '../../pages/sales/types';
import { FilterOption } from '../../store/table';
import { PaginatedResponse } from '../../types/paginatedData';
import DisplayHeader from '../common/DisplayHeader';
import { SkeletonLoader } from '../common/SkeletonLoader';
import TableWrapper from '../common/Table/TableWrapper';
import TableStats from '../common/TableStats';
import DatePickerComp, { DateRange } from '../date/DatePickerrComp';
import { OrdersTable } from './table/salesTable';
import { FilterCategory } from '../common/filters/MultiOptionsFilter';
import { useMemo } from 'react';
import { FilterState } from '../../types/table';

export interface TabStatsinterface {
  total_sales: number;
  total_sales_value: string;
  online_sales: number;
  offline_sales: string;
}

export interface SalesDataInterface {
  data: PaginatedResponse<SalesOrder>;
  stats: TabStatsinterface;
}
export interface SalesProps extends FilterState {
  data: SalesDataInterface;
  isLoading: boolean;
  title: string;
  description: string;
  isDashboard?: boolean;
  withPagination?: boolean;
}
const AllSales = ({
  data,
  isLoading,
  searchValue,
  setSearchValue,
  reset,
  title,
  description,
  currentPage,
  setPage,
  setCustomDateRange,
  handleFilterChange,
  filterValue,
  onExport,
  updateLimitSize,
  filterOptions,
  isDashboard = false,
  withPagination = true,
}: SalesProps) => {
  const tableStatsData = useMemo(
    () => [
      {
        label: 'Total Sales',
        value: `${data?.stats?.total_sales ?? 0}`,
        valueBgColor: '#E6F7FF',
        valueColor: '#003399',
      },
      {
        label: 'Total Sales Value',
        value: `${formatBalance(data?.stats?.total_sales_value ?? 0)}`,
        valueBgColor: '#E6FFFB',
        valueColor: '#08979C',
      },
      {
        label: 'Online Sales',
        value: `${formatBalance(data?.stats?.online_sales ?? 0)}`,
        valueBgColor: '#F9F0FF',
        valueColor: '#722ED1',
      },
      {
        label: 'Offline Sales',
        value: `${formatBalance(data?.stats?.offline_sales ?? 0)}`,
        valueBgColor: '#FFFBE6',
        valueColor: '#D48806',
      },
    ],
    [data?.stats]
  );

  return (
    <div className="space-y-3">
      <DisplayHeader
        title={title}
        description={description}
        actionButton={
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={reset}>Clear</Button>
            {/* <TimelineFilter
              value={periodFilter}
              onChange={setPeriodFilter}
              options={periodOptions}
            /> */}

            <DatePickerComp onRangeChange={setCustomDateRange} />
          </div>
        }
      />

      {!isDashboard && (
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
      )}

      <TableWrapper
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onFilterChange={handleFilterChange}
        selectedFilter={filterValue}
        onExport={onExport}
        filterOptions={filterOptions}
        isDashboard={isDashboard}
      >
        <OrdersTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={setPage}
          loading={isLoading}
          showCheckbox={true}
          perPage={data?.data?.per_page}
          total={data?.data?.total}
          updateLimitSize={updateLimitSize}
          withPagination={withPagination}
        />
      </TableWrapper>
    </div>
  );
};

export default AllSales;
