import { Button } from 'antd';
import { StaffListResponse } from '../../pages/staff/types';
import { FilterState } from '../../types/table';
import DisplayHeader from '../common/DisplayHeader';
import { SkeletonLoader } from '../common/SkeletonLoader';
import TableWrapper from '../common/Table/TableWrapper';
import TableStats from '../common/TableStats';
import DatePickerComp from '../date/DatePickerrComp';
import { StaffTable } from './table/salesTable';

interface StaffListProps extends FilterState {
  data: StaffListResponse;
  isLoading: boolean;
  dateRange: string | null;
}
const StaffList = ({
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
  dateRange,
}: StaffListProps) => {
  const tableStatsData = [
    {
      label: 'Total Staff',
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
      label: 'Deactivated',
      value: `${data?.stats?.inactive ?? 0}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="All Staff"
        description="You're viewing all staff below."
        actionButton={
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button
              onClick={reset}
            >
              Clear
            </Button>
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
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedFilter={filterValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onExport={onExport}
      >
        <StaffTable
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

export default StaffList;
