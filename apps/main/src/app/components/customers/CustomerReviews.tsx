import { useEffect } from 'react';
import { useFetchData, useGetExportData } from '../../../hooks/useApis';
import { useTableState } from '../../../hooks/useTable';
import { exportCsvFromString } from '../../../utils/helper';
import CustomerTableReview from './CustomerTableReview';
import { filterOptions } from '../../lib/constant';

export default function CustomerReviews({customerId}: {customerId: string}) {
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
  } = useTableState('reviews');

  const { data: productData, isLoading } = useFetchData(
    `merchants/inventory-products?paginate=${currentPage}&limit=${limitSize}&product_review=true&q=${searchValue}&date_filter=${customDateRange}&sort_by=${filterKey}&customer_id=${customerId}`
  );
//   console.log(productData?.data?.data, 'product reviews');
  const exportReviews = useGetExportData(
    `merchants/reviews?export=${exportType}`
  );

  const handleExport = () => {
    exportReviews.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Product Reviews');
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
    <CustomerTableReview
      data={productData?.data?.data}
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
      withPagination={true}
    />
  );
}

