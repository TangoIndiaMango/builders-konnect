import { FilterOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { useMemo, useState } from 'react';
import { ExportDropdown } from '../ExportDropdown';
import { SearchInput } from '../SearchInput';
import FilterDropdown from '../filters/FilterDropdown';
import MultiOptionsFilter from '../filters/MultiOptionsFilter';

interface TableFiltersProps {
  onSearch?: (value: string) => void;
  showTimeline?: boolean;
  children: React.ReactNode;
  filterOptions?: any;
  onFilterChange?: (filterKey: string, value: string) => void;
  selectedFilter?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onExport: (value: string) => void;
}

const filterOpts = [
  {
    label: 'Payment Status',
    key: 'payment_status',
    options: [
      { label: 'Paid', value: 'paid' },
      { label: 'Unpaid', value: 'unpaid' },
      { label: 'Refunded', value: 'refunded' },
    ],
  },
  {
    label: 'Order Status',
    key: 'order_status',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Processing', value: 'processing' },
      { label: 'Completed', value: 'completed' },
      { label: 'Cancelled', value: 'cancelled' },
    ],
  },
];

const TableWrapper = ({
  children,
  filterOptions = filterOpts,
  onFilterChange,
  selectedFilter = 'Filter by',
  searchValue,
  setSearchValue,
  onExport,
}: TableFiltersProps) => {
  // const handleFilterChange = (filterKey: string, value: string) => {
  //   // Do something with filterKey and value
  //   console.log(filterKey, "filterKey");
  //   console.log(value, "value");
  // };

  console.log(selectedFilter, 'onFilterChange');
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
