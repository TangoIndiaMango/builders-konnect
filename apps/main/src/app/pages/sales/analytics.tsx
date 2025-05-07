import PageIntroBanner from '../../components/common/PageIntroBanner';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import SalesAnalyticsStats from '../../components/sales/analytics/Stats';
import ReturnRate from '../../components/sales/analytics/ReturnRate';
import TopSellingProducts from '../../components/sales/analytics/TopSellingProducts';
import RevenueAnalytics from '../../components/sales/analytics/RevenueAnalytics';
import { useFetchData } from '../../../hooks/useApis';



const SalesAnalytics = () => {

  return (
    <div className="space-y-5">
      <PageIntroBanner
        title="Order Analytics"
        description="Track order sales and performance here"
        actionButton={
          <div>
            <Button type="primary" icon={<DownloadOutlined />}>
              Export
            </Button>
          </div>
        }
      />

      <div className="p-5 space-y-5 ">
        <SalesAnalyticsStats />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ReturnRate />
          <TopSellingProducts />
        </div>
        <RevenueAnalytics />
      </div>
    </div>
  );
};

export default SalesAnalytics;
