import DisplayHeader from '../common/DisplayHeader';
import TableWrapper from '../common/Table/TableWrapper';
import { Button } from 'antd';
import { ProductTable } from './table/productTable';
import DatePickerComp from '../date/DatePickerrComp';
import { PaginatedResponse } from '../../types/paginatedData';
import { Product } from '../../pages/customers/types';
import { FilterState } from '@/app/types/table';

export interface CustomerReviewDataInterface {
  data: PaginatedResponse<Product>;
}
export interface CustomerReviewProps extends FilterState {
  data: CustomerReviewDataInterface;
  isLoading: boolean;
  withPagination?: boolean;
}

const CustomerTableReview = ({
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
}: CustomerReviewProps) => {
  return (
    <div className="space-y-3">
      <DisplayHeader
        title="Reviews"
        description="You're viewing all reviews below."
        actionButton={
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={reset}>Clear</Button>
            <DatePickerComp onRangeChange={setCustomDateRange} />
          </div>
        }
      />

      <TableWrapper
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onFilterChange={handleFilterChange}
        selectedFilter={filterValue}
        onExport={onExport}
        filterOptions={filterOptions}
      >
        <ProductTable
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

export default CustomerTableReview;
