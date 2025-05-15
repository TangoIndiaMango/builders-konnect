import { Divider } from 'antd';
import { useState } from 'react';
import { formatBalance } from '../../../utils/helper';
import { FilterOption } from '../../store/table';
import DisplayHeader from '../common/DisplayHeader';
import TimelineFilter from '../common/filters/TimelineFilter';
import { SkeletonLoader } from '../common/SkeletonLoader';
import TableWrapper from '../common/Table/TableWrapper';
import TableStats from '../common/TableStats';
import { SalesDataInterface } from './AllSales';
import { OrdersTable } from './table/salesTable';

export interface SalesProps {
  data: SalesDataInterface;
  isLoading: boolean;
  setSearchTerm: (searchTerm: string) => void;
  periodFilter: string;
  setPeriodFilter: (periodFilter: string) => void;
  reset: () => void;
  periodOptions: FilterOption[];
}

const InstoreSales = ({ data, isLoading, setSearchTerm, periodFilter, setPeriodFilter, reset, periodOptions }: SalesProps) => {
  const [currentPage, setCurrentPage] = useState(1);


  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    // Handle pagination logic here
  };

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
      label: 'Offline Sales',
      value: `${formatBalance(data?.stats?.offline_sales)}`,
      valueBgColor: '#FFFBE6',
      valueColor: '#D48806',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="In-store Sales"
        description="You're viewing all sales order below."
        actionButton={<TimelineFilter value={periodFilter} onChange={setPeriodFilter} options={periodOptions} />}
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1} >
      <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x divide-gray-300">
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
      <Divider />

      <TableWrapper onSearch={setSearchTerm}>
        <OrdersTable
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

export default InstoreSales;
