import { useState } from 'react';
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
const statsData = [
  {
    title: 'Total Orders',
    value: 0,
    color: 'blue' as const,
    icon: <ShoppingCartOutlined style={{ fontSize: 16 }} />,
  },
  {
    title: 'Total Order Value',
    value: 0,
    color: 'pink' as const,
    icon: <DollarOutlined style={{ fontSize: 16 }} />,
  },
  {
    title: 'Total Items Sold',
    value: 0,
    color: 'purple' as const,
    icon: <ShoppingOutlined style={{ fontSize: 16 }} />,
  },
  {
    title: 'Total Return Rate',
    value: 0,
    color: 'yellow' as const,
    icon: <TeamOutlined style={{ fontSize: 16 }} />,
  },
];
const SalesAnalyticsStats = () => {
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
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
