import React, { useState } from 'react';
import { ExportDropdown } from '../ExportDropdown';
import { SearchInput } from '../SearchInput';
import FilterDropdown from '../filters/FilterDropdown';

interface TableFiltersProps {
  showTimeline?: boolean;
  children: React.ReactNode;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const InventoryTableWrapper = ({
  children,
  searchValue,
  setSearchValue,
}: TableFiltersProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('category');

  const periodOptions = [
    { label: 'Category', value: 'category' },
    { label: 'Stock Level', value: 'stock_level' },
    { label: 'Status', value: 'status' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <FilterDropdown
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
          />
          <SearchInput
            placeholder="input search text"
            onChange={setSearchValue}
            value={searchValue}
            className="min-w-[300px]"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <ExportDropdown />
        </div>
      </div>
      {children}
    </div>
  );
};

export default InventoryTableWrapper;
