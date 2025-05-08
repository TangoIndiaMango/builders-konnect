import { Button, Tabs } from 'antd';
import PageIntroBanner from '../../../components/common/PageIntroBanner';
import { TabsProps } from 'antd';
import ConfirmModal from '../../../components/common/ConfirmModal';
import React, { useMemo, useState } from 'react';
import ProductReview from '../../../components/customers/ProductReview';
import VendorReview from '../../../components/customers/VendorReview';
import { useFetchData } from '../../../../hooks/useApis';
import { FilterOption } from '@/app/store/table';

const ReviewAndFeedbackList: React.FC = () => {
  const [tab, setTab] = useState<string>('product-reviews');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [periodFilter, setPeriodFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const periodOptions: FilterOption[] = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 Days', value: '7 days' },
    { label: 'Last 30 Days', value: '30 days' },
    { label: 'Custom', value: 'custom' },
  ];

  const { data: productData, isLoading } = useFetchData(
    `merchants/inventory-products?paginate=${currentPage}&limit=${itemsPerPage}&product_review=true&q=${searchQuery}&date_filter=${dateFilter}&sort_by=${sortBy}`
  );

  const { data: vendorData, isLoading: vendorLoading } = useFetchData(
    `merchants/reviews?page=${currentPage}&limit=${itemsPerPage}&date_filter=${dateFilter}&sort_by=${sortBy}&q=${searchQuery}`
  );

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
            setSearchTerm={handleSearch}
            periodFilter={periodFilter}
            setPeriodFilter={handleDateFilterChange}
            periodOptions={periodOptions}
            currentPage={currentPage}
            setCurrentPage={(page) => handlePageChange(page, itemsPerPage)}
            reset={handleReset}
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
            setCurrentPage={(page) => handlePageChange(page, itemsPerPage)}
            setSearchTerm={handleSearch}
            currentPage={currentPage}
          />
        ),
      },
    ],
    [tab, currentPage, itemsPerPage, searchQuery, dateFilter, sortBy, vendorData, vendorLoading, productData, isLoading]
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
