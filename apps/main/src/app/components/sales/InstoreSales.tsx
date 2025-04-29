import React from 'react';
import { Divider } from 'antd';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import TableStats from '../common/TableStats';
import { OrdersTable } from './table/salesTable';
import { useState } from 'react';
import TableWrapper from '../common/Table/TableWrapper';
import { ordersData, tableStatsData } from './mockData';
import { SalesDataInterface } from './AllSales';
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

const InstoreSales = ({ data, isLoading }: { data: SalesDataInterface, isLoading: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="In-store Sales"
        description="You're viewing all sales order below."
        actionButton={<TimelineFilter />}
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1} >
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

export default InstoreSales;
