import { Tabs } from 'antd';
import PageIntroBanner from '../../../components/common/PageIntroBanner';
import { TabsProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ProductReview from '../../../components/customers/ProductReview';
import VendorReview from '../../../components/customers/VendorReview';
import { useFetchData, useGetExportData } from '../../../../hooks/useApis';
import { useTableState } from '../../../../hooks/useTable';
import { exportCsvFromString } from '../../../../utils/helper';
import { filterOptions } from '../../../lib/constant';

const ReviewAndFeedbackList: React.FC = () => {
  const [tab, setTab] = useState<string>('product-reviews');
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  // const [dateFilter, setDateFilter] = useState<string>('');
  // const [sortBy, setSortBy] = useState<string>('');
  // const [periodFilter, setPeriodFilter] = useState<string>('');
  // const [currentPage, setCurrentPage] = useState<number>(1);

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
  } = useTableState('product-reviews');

  const {
    searchValue: vendorSearchValue  ,
    setSearch: vendorSetSearch,
    currentPage: vendorCurrentPage,
    pageSize: vendorPageSize,
    setPage: vendorSetPage,
    reset: vendorReset,
    customDateRange: vendorCustomDateRange,
    setCustomDateRange: vendorSetCustomDateRange,
    filterKey: vendorFilterKey,
    filterValue: vendorFilterValue,
    handleFilterChange: vendorHandleFilterChange,
    exportType: vendorExportType,
    setExportType: vendorSetExportType,
    limitSize: vendorLimitSize,
    setLimitSize: vendorSetLimitSize,
  } = useTableState('vendor-reviews');

  const { data: productData, isLoading, refetch } = useFetchData(
    `merchants/inventory-products?paginate=1&page=${currentPage ?? 1}&status=${
      filterKey === 'status' ? filterValue : ''
    }&date_filter=${customDateRange ?? ''}&sort_by=${
      filterKey === 'sort_by' ? filterValue : ''
    }&q=${searchValue ?? ''}&limit=${limitSize ?? 10}`
  );
  // console.log(limitSize);
  const { data: vendorData, isLoading: vendorLoading } = useFetchData(
    `merchants/reviews?paginate=1&page=${vendorCurrentPage ?? 1}&status=${
      vendorFilterKey === 'status' ? vendorFilterValue : ''
    }&date_filter=${vendorCustomDateRange ?? ''}&sort_by=${
      vendorFilterKey === 'sort_by' ? vendorFilterValue : ''
    }&q=${vendorSearchValue ?? ''}&limit=${vendorLimitSize ?? 10}`
  );

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

  const onChange = (key: string) => {
    setTab(key);
  };

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: 'product-reviews',
        label: 'Product Reviews',
        children: (
          <ProductReview
            data={productData?.data}
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
        key: 'vendor-reviews',
        label: 'Vendor Reviews',
        children: (
          <VendorReview
            data={vendorData?.data}
            isLoading={vendorLoading}
            searchValue={vendorSearchValue}
            pageSize={vendorPageSize}
            updateLimitSize={vendorSetLimitSize}
            setSearchValue={vendorSetSearch}
            setCustomDateRange={vendorSetCustomDateRange}
            handleFilterChange={vendorHandleFilterChange}
            filterValue={vendorFilterValue ?? ''}
            onExport={vendorSetExportType}
            filterOptions={filterOptions}
            currentPage={vendorCurrentPage}
            reset={vendorReset}
            setPage={vendorSetPage}
          />
        ),
      },
    ],
    [tab, productData, refetch, isLoading, vendorData, vendorLoading]
  );

  return (
    <div>
      <PageIntroBanner
        title="Review and Feedback"
        description="View and manage customer details and all customer related issues."
      />

      <div className="px-5 bg-white">
        <Tabs
          defaultActiveKey="product-reviews"
          onChange={onChange}
          items={items}
        />
      </div>
    </div>
  );
};

export default ReviewAndFeedbackList;
