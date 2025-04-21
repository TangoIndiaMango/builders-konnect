import { useState } from 'react';
import FilterDropdown from './FilterDropdown';

interface FilterGroupProps {
  className?: string;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ className = '' }) => {
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('this_month');

  const storeOptions = [
    { label: 'All Stores', value: 'all' },
    { label: 'Store 1', value: 'store_1' },
    { label: 'Store 2', value: 'store_2' },
  ];

  const periodOptions = [
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Year', value: 'this_year' },
    { label: 'Custom Range', value: 'custom' },
  ];

  return (
    <div className={`flex gap-4 flex-wrap justify-end ${className}`}>
      <FilterDropdown
        // label="Store"
        options={storeOptions}
        value={selectedStore}
        onChange={setSelectedStore}
      />

      <FilterDropdown
        // label="Period"
        options={periodOptions}
        value={selectedPeriod}
        onChange={setSelectedPeriod}
      />
    </div>
  );
};

export default FilterGroup;