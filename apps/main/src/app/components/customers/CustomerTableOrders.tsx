import { Button } from 'antd';
import { formatBalance } from '../../../utils/helper';
import { SalesOrder } from '../../pages/sales/types';
import { PaginatedResponse } from '../../types/paginatedData';
import DisplayHeader from '../common/DisplayHeader';
import { SkeletonLoader } from '../common/SkeletonLoader';
import TableWrapper from '../common/Table/TableWrapper';
import TableStats from '../common/TableStats';
import DatePickerComp from '../date/DatePickerrComp';
import { useMemo } from 'react';
import { FilterState } from '../../types/table';
import { OrdersTable } from '../sales/table/salesTable';


export interface TabStatsinterface {
  total_orders: number;
  total_amount_spent: string;

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
  withPagination?: boolean;
  dateRange: string | null;
}
const CustomerTableOrders = ({
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
  withPagination = true,
  dateRange,
}: SalesProps) => {
  const tableStatsData = useMemo(
    () => [
      {
        label: 'Total Orders',
        value: `${data?.stats?.total_orders ?? 0}`,
        valueBgColor: '#E6F7FF',
        valueColor: '#003399',
      },
      {
        label: 'Total Amount Spent',
        value: `${formatBalance(data?.stats?.total_amount_spent ?? 0)}`,
        valueBgColor: '#E6FFFB',
        valueColor: '#08979C',
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
            <DatePickerComp
              onRangeChange={setCustomDateRange}
              value={dateRange}
            />
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
        <OrdersTable
          isCustomerOrderLink={false}
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

export default CustomerTableOrders;
