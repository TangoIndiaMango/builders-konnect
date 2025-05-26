import { useMemo, useState } from 'react';
import CardWithFilter from '../../common/CardWithFilter';
import FilterDropdown from '../../common/filters/FilterDropdown';
import FilterGroup from '../../common/filters/FilterGroup';
import StatsCard from '../../common/StatsCard';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useFetchData } from '../../../../hooks/useApis';
import { formatBalance } from '../../../../utils/helper';
import { Button, Select, Skeleton } from 'antd';
import { DateRange } from '../../date/DatePickerrComp';
import DatePickerComp from '../../date/DatePickerrComp';
import { useTableState } from '../../../../hooks/useTable';

export interface DashboardMetrics {
  orders: MetricValue<number>;
  order_value: MetricValue<string>;
  items_sold: MetricValue<string>;
  returns_rate: MetricValue<number>;
}

export interface MetricValue<T> {
  total: T;
  shift: string;
}


const SalesAnalyticsStats = () => {
  const {reset, setCustomDateRange, customDateRange} = useTableState("sales-analytics")
  const stats = useFetchData(`merchants/sales-orders/analytics/stats`);

  const salesStats = stats?.data?.data as DashboardMetrics;

  const statsData = useMemo(() => [
    {
      title: 'Total Orders',
      value: salesStats?.orders?.total,
      color: 'blue' as const,
      icon: <ShoppingCartOutlined style={{ fontSize: 16 }} />,
    },
    {
      title: 'Total Order Value',
      value: formatBalance(salesStats?.order_value?.total),
      color: 'pink' as const,
      icon: <DollarOutlined style={{ fontSize: 16 }} />,
    },
    {
      title: 'Total Items Sold',
      value: salesStats?.items_sold?.total,
      color: 'purple' as const,
      icon: <ShoppingOutlined style={{ fontSize: 16 }} />,
    },
    {
      title: 'Total Return Rate',
      value: salesStats?.returns_rate?.total,
      color: 'yellow' as const,
        icon: <TeamOutlined style={{ fontSize: 16 }} />,
      },
    ],
    [salesStats]
  );


  return (
    <CardWithFilter
      title="Order Overview"
      description="An overview of your sales performance"
      rightSection={
        <div className="flex items-center gap-2 justify-end flex-wrap">
          <Button onClick={reset}>Clear</Button>
          {/* <Select
            placeholder="Select store"
            // mode="multiple"
            allowClear
            size="large"
            className="rounded w-[200px]"
            showSearch
            value={selectedStore || undefined}
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={storeList?.map((store) => ({
              value: store.id,
              label: store.name,
            }))}
            onChange={(value) => {
              setSelectedStore(value);
              console.log(value, 'value');
            }}
          /> */}

          <DatePickerComp onRangeChange={setCustomDateRange} value={customDateRange} />
        </div>
      }
    >
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.isLoading ? (
        <>
          {[1,2,3,4].map((_,i) => (<Skeleton.Node active key={i} style={{width: 160}}/>))}
        </>
        ) : (
          statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            icon={stat.icon}
            />
          ))
        )}
      </div>
    </CardWithFilter>
  );
};

export default SalesAnalyticsStats;
