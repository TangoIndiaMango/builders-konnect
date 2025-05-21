import { PlusOutlined } from '@ant-design/icons';
import { Button, Skeleton } from 'antd';
import { useState } from 'react';
import { useFetchData } from '../../../hooks/useApis';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useTableState } from '../../../hooks/useTable';
import { useGetOverviewCustomers } from '../../../service/customer/customerFN';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import Banner from '../../components/home/Banner';
import Customer from '../../components/home/Customer';
import Product from '../../components/home/Product';
import Recent from '../../components/home/Recent';
import Revenue from '../../components/home/Revenue';
import Stats from '../../components/home/Stats';
import { Stores } from '../../pages/staff/types';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

function toQueryString(params: Record<string, any>) {
  return Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== '' && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

const DashboardHome = () => {
  const { customDateRange, setCustomDateRange, reset, year, setYear } =
    useTableState('dashboard');

  const navigate = useNavigate();
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const stores = useFetchData('merchants/locations?q&sort_by=alphabetically');
  const storeList = stores?.data?.data as Stores[];
  const queryParams = {
    ...(customDateRange && { date_filter: customDateRange }),
    ...(year && { date_filter: year.year() }),
    ...(selectedStoreId && { location_id: selectedStoreId }),
  };
  const queryString = toQueryString(queryParams);
  const url = `merchants/dashboard/stats${
    queryString ? `?${queryString}` : ''
  }`;
  const revenueUrl = `merchants/dashboard/revenue-analytics${
    queryString ? `?${queryString}` : ''
  }`;
  const productUrl = `merchants/dashboard/product-overview${
    queryString ? `?${queryString}` : ''
  }`;
  const customerUrl = `merchants/dashboard/customer-traffic${
    queryString ? `?${queryString}` : ''
  }`;

  const { data: recentCustomerData, isLoading: recentCustomerLoading } =
    useGetOverviewCustomers({
      paginate: 1,
      limit: 5,
      date_filter: customDateRange,
      // location_id: selectedStoreId,
    });
  const products = useFetchData(
    `merchants/inventory-products?paginate=1&limit=5${
      queryString ? `&${queryString}` : ''
    }`
  );
  const statsData = useFetchData(url);
  const revenueData = useFetchData(revenueUrl);
  const productData = useFetchData(productUrl);
  const customerData = useFetchData(customerUrl);
  // console.log(customerData?.data, 'customerData');

  const { businessProfile } = useSessionStorage();
  const handleReset = () => {
    setSelectedStoreId('');
    reset();
  };

  const isLoading =
    statsData?.isLoading ||
    revenueData?.isLoading ||
    productData?.isLoading ||
    customerData?.isLoading;

  return (
    <>
      <PageIntroBanner
        actionButton={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/pos/inventory/add-product')}
          >
            Add Product
          </Button>
        }
      />
      <div className="container space-y-5 bg-gray-50">
        {!businessProfile?.logo && <Banner />}
        <>
          <Stats
            statsData={statsData}
            storeList={storeList}
            selectedStore={selectedStoreId}
            onRangeChange={setCustomDateRange}
            setSelectedStore={setSelectedStoreId}
            reset={handleReset}
            isLoading={isLoading}
            year={year ? dayjs(year) : null}
            setYear={setYear as (value: Dayjs | null) => void}
          />
          <Revenue
            revenueData={revenueData}
            storeList={storeList}
            onRangeChange={setCustomDateRange}
            setSelectedStore={setSelectedStoreId}
            reset={handleReset}
            isLoading={isLoading}
            year={year ? dayjs(year) : null}
            setYear={setYear as (value: Dayjs | null) => void}
          />
          <Customer
            customerData={customerData}
            storeList={storeList}
            onRangeChange={setCustomDateRange}
            setSelectedStore={setSelectedStoreId}
            reset={handleReset}
            recentCustomerData={recentCustomerData}
            recentCustomerLoading={recentCustomerLoading}
            isLoading={isLoading}
            year={year ? dayjs(year) : null}
            setYear={setYear as (value: Dayjs | null) => void}
          />
          <Product
            productData={productData}
            storeList={storeList}
            onRangeChange={setCustomDateRange}
            setSelectedStore={setSelectedStoreId}
            reset={handleReset}
            recentProductData={products}
            recentProductLoading={isLoading}
            isLoading={isLoading}
            year={year ? dayjs(year) : null}
            setYear={setYear as (value: Dayjs | null) => void}
          />
        </>
        <Recent />
      </div>
    </>
  );
};

export default DashboardHome;
