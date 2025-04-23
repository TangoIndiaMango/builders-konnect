
import { useState } from 'react';
import CardWithFilter from '../../common/CardWithFilter';
import EmptyState from '../../common/EmptyState';
import MonthDateRange from '../../common/filters/MonthDateRange';
import RevenueAnalyticsChart from './chart/RevenuAnalytics';

const data = [1,2,3];
const RevenueAnalytics = () => {
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
      title="Revenue Analytics"
      rightSection={<MonthDateRange />}
      description="Create sales order and track order sales and performance here"
    >
      {data?.length > 0 ? (
        <RevenueAnalyticsChart />
      ) : (
        <EmptyState description="You have no data here yet." />
      )}
    </CardWithFilter>
  );
};

export default RevenueAnalytics;
