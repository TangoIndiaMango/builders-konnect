import React, { useState } from 'react';
import DisplayHeader from '../../components/common/DisplayHeader';
import TimelineFilter from '../../components/common/filters/TimelineFilter';
import { Divider } from 'antd';
import TableWrapper from '../../components/common/Table/TableWrapper';
import { ordersData } from '../../lib/mockData';
import { OrdersTable } from '../../components/sales/table/salesTable';
import NavigationBack from '../../components/common/NavigationBack';
const PausedSales = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    // Handle pagination logic here
  };

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    setSearchQuery(value);
    // Implement your search logic here
  };

  return (
    <div className="space-y-5">
      <NavigationBack
        title="Pause Sales"
        description="Make product sales and track sales performance here"
      />
      <div className="p-5">
        <div className="p-5 space-y-3 bg-white rounded shadow-sm">
          <DisplayHeader
            title="All Paused Sales"
            description="You're viewing orders from the online marketplace below."
            actionButton={<TimelineFilter />}
          />

          <Divider />

          <div>
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
        </div>
      </div>
    </div>
  );
};

export default PausedSales;
