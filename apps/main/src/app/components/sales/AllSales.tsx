import { Divider } from 'antd';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import TableStats from '../common/TableStats';
import { OrdersTable } from './table/salesTable';
import { useState } from 'react';
import TableWrapper from '../common/Table/TableWrapper';
import { ordersData, tableStatsData } from '../../lib/mockData';
import { SalesOrder } from '../../pages/sales/types';
import { PaginatedResponse } from '../../types/paginatedData';
import { formatBalance } from '../../../utils/helper';
import { SkeletonLoader } from '../common/SkeletonLoader';

// Filter data for different tabs
export const completedOrders = ordersData.filter(
  (order) => order.orderStatus === 'Completed'
);
export const processingOrders = ordersData.filter(
  (order) => order.orderStatus === 'Processing'
);
export const cancelledOrders = ordersData.filter(
  (order) => order.orderStatus === 'Cancelled'
);

export interface TabStatsinterface {
  total_sales: number;
  total_sales_value: string;
  online_sales: number;
  offline_sales: string;
}

export interface SalesDataInterface {
  data: PaginatedResponse<SalesOrder>;
  stats: TabStatsinterface;
}
export interface SalesProps {
  data: SalesDataInterface;
  isLoading: boolean;
}
const AllSales = ({ data, isLoading }: SalesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(false);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    // Handle pagination logic here
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    setSearchQuery(value);
    // Implement your search logic here
  };
  const tableStatsData = [
    {
      label: 'Total Sales',
      value: `${data?.stats?.total_sales}`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: 'Total Sales Value',
      value: `${formatBalance(data?.stats?.total_sales_value)}`,
      valueBgColor: '#E6FFFB',
      valueColor: '#08979C',
    },
    {
      label: 'Online Sales',
      value: `${formatBalance(data?.stats?.online_sales)}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: 'Offline Saless',
      value: `${formatBalance(data?.stats?.offline_sales)}`,
      valueBgColor: '#FFFBE6',
      valueColor: '#D48806',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="All Sales"
        description="You're viewing all sales order below."
        actionButton={<TimelineFilter />}
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

      <TableWrapper onSearch={handleSearch}>
        <OrdersTable
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

export default AllSales;
