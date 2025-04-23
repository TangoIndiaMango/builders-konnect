import { Divider } from 'antd';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import TableStats from '../common/TableStats';
import { OrdersTable } from './table/salesTable';
import { useState } from 'react';
import TableWrapper from '../common/Table/TableWrapper';
import { ordersData, tableStatsData } from './mockData';


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

const AllSales = () => {
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
        title="All Sales"
        description="You're viewing all sales order below."
        actionButton={<TimelineFilter />}
      />

      <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
        {tableStatsData?.map((item) => (
          <TableStats
            label={item?.label}
            value={item?.value}
            valueBgColor={item?.valueBgColor}
            valueColor={item?.valueColor}
          />
        ))}
      </div>

      <TableWrapper onSearch={handleSearch}>
        <OrdersTable
          data={ordersData}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={loading}
          showCheckbox={true}
          total={ordersData.length}
        />
      </TableWrapper>
    </div>
  );
};

export default AllSales;
