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
  filterOptions?: any;
  onFilterChange?: (value: string) => void;
  selectedFilter?: string;
}

const TableWrapper = ({
  onSearch,
  children,
  filterOptions,
  onFilterChange,
  selectedFilter,
}: TableFiltersProps) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <FilterDropdown
            // label="Filter by"
            options={filterOptions}
            value={selectedFilter || 'Filter by'}
            onChange={
              onFilterChange ||
              (() => {
                console.log('no filter change');
              })
            }
          />
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
