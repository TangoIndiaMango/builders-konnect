import StatsCard from '../common/StatsCard';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
const statsData = [
  {
    title: 'Total Products',
    value: 0,
    color: 'blue' as const,
    icon: <ShoppingCartOutlined style={{ fontSize: 16 }} />,
  },
  {
    title: 'Revenue Generated',
    value: 0,
    color: 'pink' as const,
    icon: <DollarOutlined style={{ fontSize: 16 }} />,
  },
  {
    title: 'Total Sales Order',
    value: 0,
    color: 'purple' as const,
    icon: <ShoppingOutlined style={{ fontSize: 16 }} />,
  },
  {
    title: 'Total Customers',
    value: 0,
    color: 'yellow' as const,
    icon: <TeamOutlined style={{ fontSize: 16 }} />,
  },
];
const Stats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
  );
};

export default Stats;
