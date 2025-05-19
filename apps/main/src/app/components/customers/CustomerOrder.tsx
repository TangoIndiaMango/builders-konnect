import { useEffect} from 'react';
import { useGetExportData } from '../../../hooks/useApis';
import { useGetSales } from '../../../service/sales/salesFN';
import { useTableState } from '../../../hooks/useTable';
import { exportCsvFromString } from '../../../utils/helper';
import { SalesFilterOptions } from '../../pages/sales/constant';
import Orders from './CustomerTableOrders';

export default function CustomerOrder() {
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
  } = useTableState('sales');

  const { data: sales, isLoading } = useGetSales({
    paginate: 1,
    limit: limitSize,
    sales_type: 'pos',
    q: searchValue,
    sort_by: filterKey === 'sort_by' ? filterValue : '',
    payment_status: filterKey === 'payment_status' ? filterValue : '',
    order_status: filterKey === 'order_status' ? filterValue : '',
    date_filter: customDateRange,
    page: currentPage,
  });

  const exportSales = useGetExportData(
    `merchants/sales-orders?export=${exportType}`
  );

  const handleExport = () => {
    exportSales.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Order Sales');
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        setExportType('');
      },
    });
  };

  useEffect(() => {
    if (exportType) {
      handleExport();
    }
  }, [exportType]);

  return (
    <Orders
    data={sales?.data}
    isLoading={isLoading}
    currentPage={currentPage}
    pageSize={pageSize}
    setPage={setPage}
    searchValue={searchValue}
    setSearchValue={setSearch}
    reset={reset}
    filterOptions={SalesFilterOptions}
    title="Orders"
    description="You are viewing all sales order below"
    setCustomDateRange={setCustomDateRange}
    handleFilterChange={handleFilterChange}
    filterValue={filterValue ?? ''}
    onExport={setExportType}
    updateLimitSize={setLimitSize}
    />
  );
}
