import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { ExportDropdown } from '../ExportDropdown';
import { SearchInput } from '../SearchInput';
import FilterDropdown from '../filters/FilterDropdown';

interface TableFiltersProps {
  onSearch: (value: string) => void;
  showTimeline?: boolean;
  children: React.ReactNode;
}

const TableWrapper = ({ onSearch, children }: TableFiltersProps) => {
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
            onSearch={onSearch}
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

export default TableWrapper;
