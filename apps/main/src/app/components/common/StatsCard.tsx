import { Divider, Skeleton } from 'antd';
import { ArrowUpRightIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  color?: 'blue' | 'pink' | 'purple' | 'yellow';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  color = 'blue',
  icon = <ArrowUpRightIcon size={16} />,
  isLoading = false,
}) => {
  const colorStyles = {
    blue: 'border-blue-300 bg-blue-50',
    pink: 'border-pink-300 bg-pink-50',
    purple: 'border-purple-300 bg-purple-50',
    yellow: 'border-yellow-300 bg-yellow-50',
  };

  const textColors = {
    blue: 'text-blue-600',
    pink: 'text-pink-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600',
  };

  return (
    <div className={`rounded-sm border-[1.5px] p-4 ${colorStyles[color]}`}>
      <div className="flex items-center justify-between min-h-10 lg:min-h-0">
        <span className="text-sm text-gray-500">{title}</span>
        <div className={`${textColors[color]}`}>{icon}</div>
      </div>
      <Divider />
      <div
        className={`text-xl md:text-xl xl:text-2xl font-semibold mt-2 ${textColors[color]}`}
      >
        {value}
      </div>
    </div>
  );
};

export default StatsCard;
