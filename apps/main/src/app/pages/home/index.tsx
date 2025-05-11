import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useFetchData, useFetchSingleData } from '../../../hooks/useApis';
import { useTableState } from '../../../hooks/useTable';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import Banner from '../../components/home/Banner';
import Customer from '../../components/home/Customer';
import Product from '../../components/home/Product';
import Recent from '../../components/home/Recent';
import Revenue from '../../components/home/Revenue';
import Stats from '../../components/home/Stats';
import { Stores } from '../../pages/staff/types';
import { customerData } from '../../components/home/constant';

const DashboardHome = () => {
  const { customDateRange, setCustomDateRange, reset } =
    useTableState('dashboard');
  const [selectedStore, setSelectedStore] = useState<string>('');
  const stores = useFetchData('merchants/locations?q&sort_by=alphabetically');
  const storeList = stores?.data?.data as Stores[];
  const storeParam =
    selectedStore.length > 0 ? `&location_id=${selectedStore}` : '';
  const dateParam = customDateRange ? `date_filter=${customDateRange}` : '';
  const queryString = [dateParam, storeParam].filter(Boolean).join('&');
  const url = queryString
    ? `merchants/dashboard/stats?${queryString}`
    : 'merchants/dashboard/stats';
  const revenueUrl = queryString
    ? `merchants/dashboard/revenue-analytics?${queryString}`
    : 'merchants/dashboard/revenue-analytics?location_id=l_4XQQZ8I7AJKVdjxc_VgWA';
  const productUrl = queryString
    ? `merchants/dashboard/product-overview?${queryString}`
    : 'merchants/dashboard/product-overview?location_id=l_4XQQZ8I7AJKVdjxc_VgWA';

  const customerUrl = queryString
    ? `merchants/dashboard/customer-traffic?${queryString}`
    : 'merchants/dashboard/customer-traffic?location_id=l_4XQQZ8I7AJKVdjxc_VgWA';

  const statsData = useFetchSingleData(url, !!selectedStore);
  const revenueData = useFetchSingleData(revenueUrl, !!selectedStore);
  const productData = useFetchSingleData(productUrl, !!selectedStore);
  const customerData = useFetchSingleData(customerUrl, !!selectedStore);
  // console.log(customerData?.data, 'customerData');
  const handleReset = () => {
    setSelectedStore('');
    reset();
  };
  return (
    <>
      <PageIntroBanner
        actionButton={
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        }
      />
      <div className="container space-y-5 bg-gray-50">
        <Banner />
        <Stats
          statsData={statsData}
          storeList={storeList}
          onRangeChange={setCustomDateRange}
          setSelectedStore={setSelectedStore}
          reset={handleReset}
        />
        <Revenue
          revenueData={revenueData}
          storeList={storeList}
          onRangeChange={setCustomDateRange}
          setSelectedStore={setSelectedStore}
          reset={handleReset}
        />
        <Customer
          customerData={customerData}
          storeList={storeList}
          onRangeChange={setCustomDateRange}
          setSelectedStore={setSelectedStore}
          reset={handleReset}
        />
        <Product
          productData={productData}
          storeList={storeList}
          onRangeChange={setCustomDateRange}
          setSelectedStore={setSelectedStore}
          reset={handleReset}
        />
        <Recent />
      </div>
    </>
  );
};

export default DashboardHome;
