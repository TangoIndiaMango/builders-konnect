import { Skeleton } from "antd";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  showHeader?: boolean;
  dense?: boolean;
  className?: string;
}

const TableSkeleton = ({
  columns,
  rows = 5,
  showHeader = true,
  dense = false,
  className = ''
}: TableSkeletonProps) => {
  return (
    <div className={`space-y-${dense ? '2' : '4'} p-4 ${className}`}>
      {showHeader && (
        <div className="flex gap-4 mb-6">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton.Input
              key={`header-${index}`}
              active
              style={{
                width: `${90 / columns}%`,
                height: dense ? '24px' : '32px'
              }}
            />
          ))}
        </div>
      )}

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={`flex gap-4 ${
            rowIndex % 2 === 0 ? 'bg-gray-50' : ''
          }`}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton.Input
              key={`cell-${rowIndex}-${colIndex}`}
              active
              style={{
                width: `${90 / columns}%`,
                height: dense ? '20px' : '24px'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
