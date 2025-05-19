import DisplayHeader from '../common/DisplayHeader';
import TableStats from '../common/TableStats';
import TableWrapper from '../common/Table/TableWrapper';
import { PaginatedResponse } from '../../types/paginatedData';
import { SkeletonLoader } from '../common/SkeletonLoader';

import { Review } from '@/app/pages/customers/types';
import { ReviewTable } from './table/reviewTable';
import { FilterState } from '../../types/table';

export interface TabStatsinterface {
  total: number;
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}

export interface VendorReviewDataInterface {
  data: PaginatedResponse<Review>;
  stats: TabStatsinterface;
}
export interface VendorReviewProps extends FilterState {
  data: VendorReviewDataInterface;
  isLoading: boolean;
  withPagination?: boolean;
}
const VendorReview = ({
  data,
  isLoading,
  setSearchValue,
  searchValue,
  currentPage,
  handleFilterChange,
  filterValue,
  onExport,
  filterOptions,
  setPage,
  reset,
  updateLimitSize,
  withPagination = true,
}: VendorReviewProps) => {
  const tableStatsData = [
    {
      label: 'Total Reviews',
      value: `${data?.stats?.total || 0}`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: '5 Star',
      value: `${data?.stats?.five || 0}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: '4 Star',
      value: `${data?.stats?.four || 0}`,
      valueBgColor: '#FFFBE6',
      valueColor: '#D48806',
    },
    {
      label: '3 Star',
      value: `${data?.stats?.three || 0}`,
      valueBgColor: '#E6FFFB',
      valueColor: '#009688',
    },
    {
      label: '2 Star',
      value: `${data?.stats?.two || 0}`,
      valueBgColor: '#FFF4E5',
      valueColor: '#FF9800',
    },
    {
      label: '1 Star',
      value: `${data?.stats?.one || 0}`,
      valueBgColor: '#FFEbee',
      valueColor: '#F44336',
    },
  ];

  return (
    <div className="space-y-3">
      <section className="bg-white p-2 space-y-4">
        <DisplayHeader title="Vendor Reviews" description="" />

        <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
          <div className="flex flex-wrap items-start w-full gap-1 mx-auto divide-x divide-gray-300">
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
          <ReviewTable
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
      </section>
    </div>
  );
};

export default VendorReview;
