import { Tabs } from 'antd';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import { TabsProps } from 'antd';
import React, { useMemo, useState } from 'react';
import AllCustomers from '../../components/customers/AllCustomers';
import OnlineCustomers from '../../components/customers/OnlineCustomers';
import OfflineCustomers from '../../components/customers/OfflineCustomers';
import CreateCustomer from './create';
import { useGetOverviewCustomers } from '../../../service/customer/customerFN';
import { FilterOption } from '../../store/table';
import { useTableState } from '../../../hooks/useTable';
import { filterOptions } from '../../lib/constant';

const CustomersList: React.FC = () => {
  const [tab, setTab] = useState<string>('all');
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  // const [usePagination, setUsePagination] = useState<boolean>(true);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [dateFilter, setDateFilter] = useState<string>('');
  // const [sortBy, setSortBy] = useState<string>('');

  const periodOptions: FilterOption[] = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 Days', value: '7 days' },
    { label: 'Last 30 Days', value: '30 days' },
    { label: 'Custom', value: 'custom' },
  ];

  const {
    searchValue,
    setSearch,
    currentPage,
    pageSize,
    setPage,
    reset,
    customDateRange,
    setCustomDateRange,
    filterKey,
    filterValue,
    handleFilterChange,
    exportType,
    setExportType,
    limitSize,
    setLimitSize,
  } = useTableState('customers');

  const { data: customerData, isLoading } = useGetOverviewCustomers({
    paginate: 1,
    limit: limitSize,
    type: tab === 'all' ? '' : tab,
    q: searchValue,
    date_filter: customDateRange,
    sort_by: filterKey === 'sort_by' ? filterValue : '',
  });

  console.log(limitSize);

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
            searchValue={searchValue}
            pageSize={pageSize}
            updateLimitSize={setLimitSize}
            setSearchValue={setSearch}
            setCustomDateRange={setCustomDateRange}
            handleFilterChange={handleFilterChange}
            filterValue={filterValue ?? ''}
            onExport={setExportType}
            filterOptions={filterOptions}
            currentPage={currentPage}
            reset={reset}
            setPage={setPage}
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
            searchValue={searchValue}
            setSearchValue={setSearch}
            setCustomDateRange={setCustomDateRange}
            handleFilterChange={handleFilterChange}
            filterValue={filterValue ?? ''}
            onExport={setExportType}
            filterOptions={filterOptions}
            currentPage={currentPage}
            reset={reset}
            setPage={setPage}
            updateLimitSize={setLimitSize}

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
            searchValue={searchValue}
            setSearchValue={setSearch}
            setCustomDateRange={setCustomDateRange}
            handleFilterChange={handleFilterChange}
            filterValue={filterValue ?? ''}
            onExport={setExportType}
            filterOptions={filterOptions}
            currentPage={currentPage}
            reset={reset}
            setPage={setPage}
            updateLimitSize={setLimitSize}

          />
        ),
      },
    ],
    [tab, currentPage, pageSize, searchValue, customDateRange, filterKey, filterValue, customerData, isLoading]
  );

  return (
    <div>
      <PageIntroBanner
        title="Customer Management"
        description="View and manage customer details and all customer related issues."
        actionButton={
          <></>
          // <div className="flex items-center gap-5">
          //   <CreateCustomer />
          // </div>
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
