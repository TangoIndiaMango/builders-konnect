import { Button, Divider } from 'antd';
import { useMemo } from 'react';
import { formatBalance } from '../../../../utils/helper';
import { SingleStoreResponse } from '../../../pages/profile/types';
import { FilterState } from '../../../types/table';
import DisplayHeader from '../../common/DisplayHeader';
import { SkeletonLoader } from '../../common/SkeletonLoader';
import TableWrapper from '../../common/Table/TableWrapper';
import TableStats from '../../common/TableStats';
import DatePickerComp from '../../date/DatePickerrComp';
import { OrdersTable } from '../../sales/table/salesTable';

interface OrderDetailsProps extends FilterState {
  data: SingleStoreResponse;
  isLoading: boolean;
}

const SalesOverview = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setPage,
  setCustomDateRange,
  handleFilterChange,
  filterValue,
  onExport,
  updateLimitSize,
  filterOptions,
  searchValue,
  setSearchValue,
  reset,
}: OrderDetailsProps) => {

  const tableStatsData = useMemo(
    () => [
      {
        label: 'Total Sales',
        value: `${data?.total_sales ?? 0}`,
        valueBgColor: '#E6F7FF',
        valueColor: '#003399',
      },
      {
        label: 'Total Sales Value',
        value: `${formatBalance(data?.total_sales_value ?? 0)}`,
        valueBgColor: '#E6FFFB',
        valueColor: '#08979C',
      },
      {
        label: 'Completed',
        value: `${data?.completed ?? 0}`,
        valueBgColor: '#F9F0FF',
        valueColor: '#722ED1',
      },
      {
        label: 'Processing',
        value: `${data?.processing ?? 0}`,
        valueBgColor: '#FFFBE6',
        valueColor: '#D48806',
      },
      {
        label: 'Cancelled',
        value: `${data?.cancelled ?? 0}`,
        valueBgColor: '#FFE6E6',
        valueColor: '#F5222D',
      },
    ],
    [data]
  );

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="Sales Overview"
        description="You're viewing all sales order below."
        actionButton={ <div className="flex flex-wrap items-center justify-end gap-3">
          <Button
            onClick={reset}
          >
            Clear
          </Button>
          <DatePickerComp
            onRangeChange={setCustomDateRange}
          />
        </div>}
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
      <Divider />

      <TableWrapper filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedFilter={filterValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onExport={onExport}>
        <OrdersTable
          data={data?.sales_overview?.data}
          currentPage={currentPage}
          onPageChange={setPage}
          loading={isLoading}
          showCheckbox={true}
          total={data?.sales_overview?.total}
          perPage={data?.sales_overview?.per_page}
          updateLimitSize={updateLimitSize}
        />
      </TableWrapper>
    </div>
  );
};

export default SalesOverview;
