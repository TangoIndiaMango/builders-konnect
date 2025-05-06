import { useState } from 'react';
import { formatBalance } from '../../../utils/helper';
import { SalesOrder } from '../../pages/sales/types';
import { PaginatedResponse } from '../../types/paginatedData';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import { SkeletonLoader } from '../common/SkeletonLoader';
import TableWrapper from '../common/Table/TableWrapper';
import TableStats from '../common/TableStats';
import { OrdersTable } from './table/salesTable';
import { Button } from 'antd';
import { useTableState } from '../../../hooks/useTable';
import { FilterOption } from '../../store/table';

export interface TabStatsinterface {
  total_sales: number;
  total_sales_value: string;
  online_sales: number;
  offline_sales: string;
}

export interface SalesDataInterface {
  data: PaginatedResponse<SalesOrder>;
  stats: TabStatsinterface;
}
export interface SalesProps {
  data: SalesDataInterface;
  isLoading: boolean;
  setSearchTerm: (searchTerm: string) => void;
  periodFilter: string;
  setPeriodFilter: (periodFilter: string) => void;
  reset: () => void;
  periodOptions: FilterOption[];
  title: string;
  description: string;
}
const AllSales = ({ data, isLoading, setSearchTerm, periodFilter, setPeriodFilter, reset, periodOptions, title, description }: SalesProps) => {


  const tableStatsData = [
    {
      label: 'Total Sales',
      value: `${data?.stats?.total_sales}`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: 'Total Sales Value',
      value: `${formatBalance(data?.stats?.total_sales_value)}`,
      valueBgColor: '#E6FFFB',
      valueColor: '#08979C',
    },
    {
      label: 'Online Sales',
      value: `${formatBalance(data?.stats?.online_sales)}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: 'Offline Saless',
      value: `${formatBalance(data?.stats?.offline_sales)}`,
      valueBgColor: '#FFFBE6',
      valueColor: '#D48806',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title={title}
        description={description}
        actionButton={
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={reset}>Clear</Button>
            <TimelineFilter
              value={periodFilter}
              onChange={setPeriodFilter}
              options={periodOptions}
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

      <TableWrapper onSearch={setSearchTerm}>
        <OrdersTable
          data={data?.data?.data}
          currentPage={1}
          onPageChange={() => {
            console.log('page changed');
          }}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
        />
      </TableWrapper>
    </div>
  );
};

export default AllSales;
