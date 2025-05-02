import { useState } from 'react';
import { StaffListResponse } from '../../pages/staff/types';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import { SkeletonLoader } from '../common/SkeletonLoader';
import TableWrapper from '../common/Table/TableWrapper';
import TableStats from '../common/TableStats';
import { StaffTable } from './table/salesTable';
import { Button } from 'antd';

interface StaffListProps {
  data: StaffListResponse;
  isLoading: boolean;
  currentPage: number;
  handlePageChange: (page: number, pageSize: number) => void;
  handleSearch: (value: string) => void;
  handleDateFilterChange: (value: string) => void;
  filterOptions: any;
  handleFilterChange: (value: string) => void;
  selectedFilter: string;
  selectedDateFilter: string;
}
const StaffList = ({
  data,
  isLoading,
  currentPage,
  handlePageChange,
  handleSearch,
  handleDateFilterChange,
  filterOptions,
  handleFilterChange,
  selectedFilter,
  selectedDateFilter,
}: StaffListProps) => {
  const tableStatsData = [
    {
      label: 'Total Staff',
      value: `${data?.stats?.total}`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: 'Active',
      value: `${data?.stats?.active}`,
      valueBgColor: '#E6FFFB',
      valueColor: '#08979C',
    },
    {
      label: 'Deactivated',
      value: `${data?.stats?.inactive}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="All Staff"
        description="You're viewing all staff below."
        actionButton={
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button
              onClick={() => {
                handleFilterChange('');
              }}
            >
              Clear
            </Button>
            <TimelineFilter
              onChange={handleDateFilterChange}
              value={selectedDateFilter}
            />
          </div>
        }
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
          {tableStatsData?.map((item, index) => (
            <TableStats
              key={index}
              label={item?.label}
              value={item?.value}
              valueBgColor={item?.valueBgColor}
              valueColor={item?.valueColor}
            />
          ))}
        </div>
      </SkeletonLoader>

      <TableWrapper
        onSearch={handleSearch}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
      >
        <StaffTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
        />
      </TableWrapper>
    </div>
  );
};

export default StaffList;
