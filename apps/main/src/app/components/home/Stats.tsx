import StatsCard from '../common/StatsCard';
import {
  ShoppingCartIcon,
  DollarSignIcon,
  ShoppingBagIcon,
 GroupIcon,
} from 'lucide-react';
const statsData = [
  {
    title: 'Total Products',
    value: 0,
    color: 'blue' as const,
    icon: <ShoppingCartIcon size={16} />,
  },
  {
    title: 'Revenue Generated',
    value: 0,
    color: 'pink' as const,
    icon: <DollarSignIcon size={16} />,
  },
  {
    title: 'Total Sales Order',
    value: 0,
    color: 'purple' as const,
    icon: <ShoppingBagIcon size={16} />,
  },
  {
    title: 'Total Customers',
    value: 0,
    color: 'yellow' as const,
    icon: <GroupIcon size={16} />,
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
