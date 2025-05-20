import React from 'react';
import FilterGroup from './filters/FilterGroup';

interface CardWithFilterProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  rightSection?: React.ReactNode;
}
const CardWithFilter = ({
  children,
  title = 'Dashboard Overview',
  description = 'An overview of your sales performance',
  rightSection,
}: CardWithFilterProps) => {
  return (
    <div className="p-5 space-y-5 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-lg font-medium xl:text-xl text-nowrap">{title}</h1>
          {description && <p className="text-gray-500 ">{description}</p>}
        </div>

        <div className="flex justify-end">{rightSection && rightSection}</div>
      </div>
      {children}
    </div>
  );
};

export default CardWithFilter;
