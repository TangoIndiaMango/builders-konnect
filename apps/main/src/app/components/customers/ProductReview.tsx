import DisplayHeader from '../common/DisplayHeader';
import TableWrapper from '../common/Table/TableWrapper';
import { PaginatedResponse } from '../../types/paginatedData';
import { ProductTable } from './table/productTable';
import { Product } from '../../pages/customers/types';
import { Button } from 'antd';
import DatePickerComp from '../date/DatePickerrComp';
import { FilterState } from '@/app/types/table';

export interface ProductReviewDataInterface {
  data: PaginatedResponse<Product>;
}
export interface ProductReviewProps  extends FilterState{
  data: ProductReviewDataInterface;
  isLoading: boolean;
  withPagination?: boolean;
  dateRange: string | null;
}
const ProductReview = ({ data,
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
  dateRange,
  withPagination = true}: ProductReviewProps) => {



  return (
    <div className="space-y-3">
      <DisplayHeader
        title="Product Reviews"
          description="You're viewing all reviews below."
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

export default ProductReview;
