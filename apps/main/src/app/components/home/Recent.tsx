import { useState } from 'react';
import CardWithFilter from '../common/CardWithFilter';
import EmptyState from '../common/EmptyState';
import MonthDateRange from '../common/filters/MonthDateRange';
import { RecentSalesTable } from './table/RecentSalesTable';
import { ordersData } from '../../lib/mockData';
import { useTableState } from '../../../hooks/useTable';
import { useGetSales } from '../../../service/sales/salesFN';
import AllSales from '../sales/AllSales';
import { SalesFilterOptions } from '../../pages/sales/constant';
const data = [];
const Recent = () => {
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
  } = useTableState('dashboard');

  const { data: sales, isLoading } = useGetSales({
    paginate: 1,
    limit: limitSize,
    sales_type: '',
    q: searchValue,
    sort_by: 'date_descending',
    payment_status: filterKey === 'payment_status' ? filterValue : '',
    order_status: filterKey === 'order_status' ? filterValue : '',
    date_filter: customDateRange,
    page: currentPage,
  });

  return (
    <div className="p-5 space-y-5 bg-white shadow-sm">
      {ordersData?.length > 0 ? (
        <AllSales
          data={sales?.data}
          isLoading={isLoading}
          currentPage={currentPage}
          pageSize={pageSize}
          setPage={setPage}
          searchValue={searchValue}
          setSearchValue={setSearch}
          reset={reset}
          title="Recent Sales"
          description="Create sales order and track order sales and performance here"
          setCustomDateRange={setCustomDateRange}
          handleFilterChange={handleFilterChange}
          filterValue={filterValue ?? ''}
          onExport={setExportType}
          updateLimitSize={setLimitSize}
          isDashboard={true}
          filterOptions={SalesFilterOptions}
          withPagination={false}
        />
      ) : (
        <EmptyState description="You have no data here yet." />
      )}
    </div>
  );
};

export default Recent;

/**
 *
 *   const { data: sales, isLoading } = useGetSales({
    paginate: 1,
    limit: limitSize,
    sales_type: tab === 'all' ? '' : tab,
    q: searchValue,
    sort_by: filterKey === 'sort_by' ? filterValue : '',
    payment_status: filterKey === 'payment_status' ? filterValue : '',
    order_status: filterKey === 'order_status' ? filterValue : '',
    date_filter: customDateRange,
    page: currentPage,
  });
<AllSales
            data={sales?.data}
            isLoading={isLoading}
            currentPage={currentPage}
            pageSize={pageSize}
            setPage={setPage}
            searchValue={searchValue}
            setSearchValue={setSearch}
            reset={reset}
            filterOptions={SalesFilterOptions}
            title={tab.title}
            description={tab.description}
            setCustomDateRange={setCustomDateRange}
            handleFilterChange={handleFilterChange}
            filterValue={filterValue ?? ''}
            onExport={setExportType}
            updateLimitSize={setLimitSize}
          />
 */
