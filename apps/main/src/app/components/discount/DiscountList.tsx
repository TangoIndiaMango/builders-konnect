import { Button } from 'antd';
import { DiscountListResponse } from '../../pages/discount/types';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import { SkeletonLoader } from '../common/SkeletonLoader';
import TableWrapper from '../common/Table/TableWrapper';
import TableStats from '../common/TableStats';
import { DiscountTable } from './table/discountTable';

interface DiscountListProps {
  data: DiscountListResponse;
  isLoading: boolean;
  currentPage: number;
  handlePageChange: (page: number, pageSize: number) => void;
  handleSearch: (value: string) => void;
  handleDateFilterChange: (value: string) => void;
  filterOptions: any;
  handleFilterChange: (value: string) => void;
  selectedFilter: string;
  selectedDateFilter: string;
}
const DiscountList = ({
  data,
  isLoading,
  currentPage,
  handlePageChange,
  handleSearch,
  handleDateFilterChange,
  filterOptions,
  handleFilterChange,
  selectedFilter,
  selectedDateFilter,
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
              onClick={() => {
                handleFilterChange('');
              }}
            >
              Clear
            </Button>
            <TimelineFilter
              onChange={handleDateFilterChange}
              value={selectedDateFilter}
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

      <TableWrapper
        onSearch={handleSearch}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
      >
        <DiscountTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
        />
      </TableWrapper>
    </div>
  );
};

export default DiscountList;
