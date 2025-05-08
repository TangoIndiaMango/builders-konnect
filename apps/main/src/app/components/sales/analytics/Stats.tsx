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

  console.log('salesStats', salesStats);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('this_month');

  const periodOptions = [
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Year', value: 'this_year' },
    { label: 'Custom Range', value: 'custom' },
  ];
  return (
    <CardWithFilter
      title="Order Overview"
      description="An overview of your sales performance"
      rightSection={
        <FilterDropdown
          // label="Period"
          options={periodOptions}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
        />
      }
    >
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            icon={stat.icon}
          />
        ))}
      </div>
    </CardWithFilter>
  );
};

export default SalesAnalyticsStats;
