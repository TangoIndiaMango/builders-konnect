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
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');

  const periodOptions = [
    { label: 'Last 7 days', value: 'last_seven_days' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Year', value: 'this_year' },
    { label: 'Custom Range', value: 'custom' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* <FilterDropdown
            // label="Filter by"

            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
          /> */}
          <SearchInput
            placeholder="Search with order no."
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
