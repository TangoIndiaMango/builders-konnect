import { useState } from 'react';
import CardWithFilter from '../common/CardWithFilter';
import EmptyState from '../common/EmptyState';
import MonthDateRange from '../common/filters/MonthDateRange';
import { RecentSalesTable } from './table/RecentSalesTable';
import { ordersData } from '../sales/mockData';
const data = [];
const Recent = () => {
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
    <CardWithFilter
      title="Recent Sales"
      rightSection={<MonthDateRange />}
      description="Create sales order and track order sales and performance here"
    >
      {ordersData?.length > 0 ? (
        <RecentSalesTable
          data={ordersData.slice(0, 5)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={loading}
          total={ordersData.length}
        />
      ) : (
        <EmptyState description="You have no data here yet." />
      )}
    </CardWithFilter>
  );
};

export default Recent;
