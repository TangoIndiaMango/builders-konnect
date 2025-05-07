import { FilterOutlined } from '@ant-design/icons';
import React from 'react';
import { ExportDropdown } from '../ExportDropdown';
import { SearchInput } from '../SearchInput';
import MultiOptionsFilter from '../filters/MultiOptionsFilter';

interface TableFiltersProps {
  showTimeline?: boolean;
  children: React.ReactNode;
  filterOptions?: any;
  onFilterChange?: (filterKey: string, value: string) => void;
  selectedFilter?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onExport?: (value: string) => void;
}

const TableWrapper = ({
  children,
  filterOptions = [],
  onFilterChange,
  selectedFilter = 'Filter by',
  searchValue,
  setSearchValue,
  onExport,
}: TableFiltersProps) => {
  // console.log(selectedFilter, 'onFilterChange');
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <MultiOptionsFilter
            items={filterOptions}
            onChange={onFilterChange as (value: string) => void}
            label={
              <span className="flex items-center gap-2 capitalize">
                <FilterOutlined />
                {selectedFilter || 'Filter by'}
              </span>
            }
          />

          <SearchInput
            placeholder="Search with order no."
            value={searchValue}
            onChange={setSearchValue}
            className="w-full md:min-w-[300px]"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <ExportDropdown onExport={onExport} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default TableWrapper;
