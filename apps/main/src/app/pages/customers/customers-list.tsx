import { Button, Tabs } from 'antd';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import { TabsProps } from 'antd';
import ConfirmModal from '../../components/common/ConfirmModal';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllCustomers from '../../components/customers/AllCustomers';
import OnlineCustomers from '../../components/customers/OnlineCustomers';
import OfflineCustomers from '../../components/customers/OfflineCustomers';
import CreateCustomer from './create';
import { useGetOverviewCustomers } from '../../../service/customer/customerFN';
import { FilterOption } from '@/app/store/table';

const CustomersList: React.FC = () => {
  const [tab, setTab] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [usePagination, setUsePagination] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const periodOptions: FilterOption[] = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 Days', value: '7 days' },
    { label: 'Last 30 Days', value: '30 days' },
    { label: 'Custom', value: 'custom' },
  ];

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
  };
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };


  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleReset = () => {
    setSearchQuery('');
    setDateFilter('');
    setSortBy('');
  }; 

  const { data: customerData, isLoading } = useGetOverviewCustomers({
    paginate: usePagination ? 1 : 0,
    limit: itemsPerPage,
    type: tab === 'all' ? '' : tab,
    q: searchQuery,
    date_filter: dateFilter,
    sort_by: sortBy,
  });

  const onChange = (key: string) => {
    setTab(key);
  };

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: 'all',
        label: 'All Customers',
        children: (
          <AllCustomers
            data={customerData?.data}
            isLoading={isLoading}
            setSearchTerm={handleSearch}
            periodFilter={dateFilter}
            setPeriodFilter={handleDateFilterChange}
            periodOptions={periodOptions}
            currentPage={currentPage}
            reset={handleReset}
            setCurrentPage={(page: number) => handlePageChange(page, itemsPerPage)}
          />
        ),
      },
      {
        key: 'online',
        label: 'Online Customers',
        children: (
          <OnlineCustomers
            data={customerData?.data}
            isLoading={isLoading}
            setSearchTerm={handleSearch}
            periodFilter={dateFilter}
            setPeriodFilter={handleDateFilterChange}
            periodOptions={periodOptions}
            currentPage={currentPage}
            reset={handleReset}
            setCurrentPage={(page: number) => handlePageChange(page, itemsPerPage)}
          />
        ),
      },
      {
        key: 'offline',
        label: 'Offline Customers',
        children: (
          <OfflineCustomers
            data={customerData?.data}
            isLoading={isLoading}
            setSearchTerm={handleSearch}
            periodFilter={dateFilter}
            setPeriodFilter={handleDateFilterChange}
            periodOptions={periodOptions}
            currentPage={currentPage}
            reset={handleReset}
            setCurrentPage={(page: number) => handlePageChange(page, itemsPerPage)}
          />
        ),
      },
    ],
    [tab, currentPage, itemsPerPage, searchQuery, dateFilter, sortBy, customerData, isLoading]
  );

  return (
    <div>
      <PageIntroBanner
        title="Customer Management"
        description="View and manage customer details and all customer related issues."
        actionButton={
          <div className="flex items-center gap-5">
            <CreateCustomer />
          </div>
        }
      />

      <div className="px-5 bg-white">
        <Tabs
          defaultActiveKey="all-customers"
          onChange={onChange}
          items={items}
        />
      </div>
    </div>
  );
};

export default CustomersList;
