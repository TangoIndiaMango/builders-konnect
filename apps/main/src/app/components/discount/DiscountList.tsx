import { Button } from 'antd';
import { DiscountListResponse } from '../../pages/discount/types';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import { SkeletonLoader } from '../common/SkeletonLoader';
import TableWrapper from '../common/Table/TableWrapper';
import TableStats from '../common/TableStats';
import { DiscountTable } from './table/discountTable';
import { FilterState } from '../../types/table';
import DatePickerComp from '../date/DatePickerrComp';

interface DiscountListProps extends FilterState {
  data: DiscountListResponse;
  isLoading: boolean;
}
const DiscountList = ({
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
}: DiscountListProps) => {
  const tableStatsData = [
    {
      label: 'Total Discounts',
      value: `${data?.stats?.total ?? 0}`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: 'Active',
      value: `${data?.stats?.active ?? 0}`,
      valueBgColor: '#E6FFFB',
      valueColor: '#08979C',
    },
    {
      label: 'Expired',
      value: `${data?.stats?.expired ?? 0}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: 'Scheduled',
      value: `${data?.stats?.scheduled ?? 0}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: 'Used',
      value: `${data?.stats?.used ?? 0}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="All Discounts"
        description="You're viewing all discounts below."
        actionButton={
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button
              onClick={reset}
            >
              Clear
            </Button>
            <DatePickerComp
              onRangeChange={setCustomDateRange}
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
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedFilter={filterValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onExport={onExport}
      >
        <DiscountTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={setPage}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
          perPage={data?.data?.per_page}
          updateLimitSize={updateLimitSize}
        />
      </TableWrapper>
    </div>
  );
};

export default DiscountList;
