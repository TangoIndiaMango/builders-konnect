import { Skeleton } from 'antd';
import { LabelValue } from '../../pages/sales/create';

interface SkeletonLoaderProps {
  rows?: number;
  columns?: number;
  type?: 'table' | 'card' | 'list' | 'simple' | 'form';
  className?: string;
  hasHeader?: boolean;
  active: boolean;
  children?: React.ReactNode;
}

export const SkeletonLoader = ({
  rows = 3,
  columns = 1,
  type = 'simple',
  className = '',
  hasHeader = false,
  active,
  children
}: SkeletonLoaderProps) => {
  if (!active) {
    return <>{children}</>;
  }

  const renderSkeleton = () => {
    switch (type) {
      case 'table':
        return (
          <div className="p-4 bg-white rounded-lg">
            {hasHeader && (
              <div className="flex items-center justify-between mb-4">
                <Skeleton.Input active style={{ width: 150 }} />
                <Skeleton.Button active />
              </div>
            )}
            <div className="space-y-4">
              {Array.from({ length: rows }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <Skeleton.Input
                      key={colIndex}
                      active
                      style={{ width: `${100 / columns}%` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="p-4 bg-white rounded-lg">
            {hasHeader && (
              <Skeleton.Input
                active
                className="mb-4"
                style={{ width: 150 }}
              />
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: rows }).map((_, index) => (
                <div key={index} className="p-4 border rounded">
                  <Skeleton active paragraph={{ rows: 2 }} />
                </div>
              ))}
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4">
            {hasHeader && (
              <Skeleton.Input active style={{ width: 150 }} />
            )}
            {Array.from({ length: rows }).map((_, index) => (
              <div key={index} className="p-4 bg-white rounded-lg">
                <Skeleton active paragraph={{ rows: 1 }} />
              </div>
            ))}
          </div>
        );
      case 'form':
        return (
          <div className="space-y-4">
             {Array.from({ length: rows }).map((_, index) => (
               <div className="flex items-center justify-center gap-2">
               <Skeleton.Input active  />
               <Skeleton.Input active style={{ width: 150 }}/>
              </div>
            ))}
          <div className="flex items-center justify-between">
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
          </div>
        );

      default:
        return (
          <div className={className}>
            <Skeleton active paragraph={{ rows }} />
          </div>
        );
    }
  };

  return renderSkeleton();
};