import DisplayHeader from '../common/DisplayHeader';
import TableStats from '../common/TableStats';
import TableWrapper from '../common/Table/TableWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { PaginatedResponse } from '../../types/paginatedData';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Review } from '@/app/pages/customers/types';
import { ReviewTable } from './table/reviewTable';
import { useFetchData } from '../../../hooks/useApis';
import { useState } from 'react';

export interface TabStatsinterface {
  total: number;
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}

export interface ViewReviewDataInterface {
  data: PaginatedResponse<Review>;
  stats: TabStatsinterface;
}
export interface ViewReviewProps {
  data: ViewReviewDataInterface;
  isLoading: boolean;
}
const ViewReview = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  // const [dateFilter, setDateFilter] = useState<string>('');
  // const [sortBy, setSortBy] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

const { data: productData, isLoading } = useFetchData(
  `merchants/reviews?page=${currentPage}&limit=${itemsPerPage}&q=${searchQuery}&product_id=${id}`
);

const { data: inventoryData, isLoading: inventoryLoading } = useFetchData(
  `merchants/inventory-products/${id}`
);



const handlePageChange = (page: number, pageSize: number) => {
  setCurrentPage(page);
  setItemsPerPage(pageSize);
};
const handleSearch = (value: string) => {
  setSearchQuery(value);
};


// const handleDateFilterChange = (value: string) => {
//   setDateFilter(value);
// };

// const handleSortByChange = (value: string) => {
//   setSortBy(value);
// };

// const handleReset = () => {
//   setSearchQuery('');
//   setDateFilter('');
//   setSortBy('');
// }; 


const data = productData?.data?.data?.data

  const tableStatsData = [
    {
      label: 'Total Reviews',
      value: `${data?.stats?.total || 0 }`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: '5 Star',
      value: `${data?.stats?.five || 0 }`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: '4 Star',
      value: `${data?.stats?.four || 0 }`,
      valueBgColor: '#FFFBE6',
      valueColor: '#D48806',
    },
    {
      label: '3 Star',
      value: `${data?.stats?.three || 0 }`,
      valueBgColor: '#E6FFFB',
      valueColor: '#009688',
    },
    {
      label: '2 Star',
      value: `${data?.stats?.two || 0 }`,
      valueBgColor: '#FFF4E5',
      valueColor: '#FF9800',
    },
    {
      label: '1 Star',
      value: `${data?.stats?.one || 0 }`,
      valueBgColor: '#FFEbee',
      valueColor: '#F44336',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="mb-4 bg-white p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div onClick={() => navigate(-1)} className="cursor-pointer">
            <ArrowLeftOutlined className="text-md mt-1 text-black font-medium" />
          </div>
          <h1 className="text-xl font-semibold">View Product Review</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Track and measure stock levels here
        </p>
      </div>
      <section className="bg-white p-4 mx-4 space-y-4">
        {inventoryLoading ? (
          <SkeletonLoader active={true} type="table" columns={4} rows={1} />
        ) : (
          <DisplayHeader
            title={inventoryData?.data?.name}
            description=""
            showProductCode={true}
            productCode={inventoryData?.data?.SKU}
          />
        )}

        <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
          <div className="flex flex-wrap items-start w-full gap-1 mx-auto divide-x-2">
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

        <TableWrapper onSearch={handleSearch}>
          <ReviewTable
            data={data}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            loading={isLoading}
            showCheckbox={true}
            total={data?.length}
          />
        </TableWrapper>
      </section>
    </div>
  );
};

export default ViewReview;
