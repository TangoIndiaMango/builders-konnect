import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import TableWrapper from '../common/Table/TableWrapper';
import { PaginatedResponse } from '../../types/paginatedData';
import { ProductTable } from './table/productTable';
import { Product } from '../../pages/customers/types';
import { FilterOption } from '@/app/store/table';
import { Button } from 'antd';

export interface ProductReviewDataInterface {
  data: PaginatedResponse<Product>;
}
export interface ProductReviewProps {
  data: ProductReviewDataInterface;
  isLoading: boolean;
  setSearchTerm: (searchTerm: string) => void;
  periodFilter: string;
  setPeriodFilter: (periodFilter: string) => void;
  periodOptions: FilterOption[];
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  reset: () => void;
}
const ProductReview = ({ data, isLoading, setSearchTerm, periodFilter, setPeriodFilter, periodOptions, currentPage, setCurrentPage, reset }: ProductReviewProps) => {
   
  

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="Product Reviews"
          description="You're viewing all reviews below."
            actionButton={
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={reset}>Clear</Button>
            <TimelineFilter value={periodFilter} onChange={setPeriodFilter} options={periodOptions} />
          </div>
        }
      />


      <TableWrapper onSearch={setSearchTerm}>
        <ProductTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
        />
      </TableWrapper>
    </div>
  );
};

export default ProductReview;
