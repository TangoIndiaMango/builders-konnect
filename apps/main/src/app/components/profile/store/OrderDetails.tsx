import { Divider } from 'antd';
import { useMemo, useState } from 'react';
import { formatBalance } from '../../../../utils/helper';
import { SingleStoreResponse } from '../../../pages/profile/types';
import DisplayHeader from '../../common/DisplayHeader';
import TimelineFilter from '../../common/filters/TimelineFilter';
import { SkeletonLoader } from '../../common/SkeletonLoader';
import TableWrapper from '../../common/Table/TableWrapper';
import TableStats from '../../common/TableStats';
import { OrdersTable } from '../../sales/table/salesTable';

const SalesOverview = ({
  data,
  isLoading,
}: {
  data: SingleStoreResponse;
  isLoading: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    // Handle pagination logic here
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    setSearchQuery(value);
    // Implement your search logic here
  };

  const tableStatsData = useMemo(
    () => [
      {
        label: 'Total Sales',
        value: `${data?.total_sales ?? 0}`,
        valueBgColor: '#E6F7FF',
        valueColor: '#003399',
      },
      {
        label: 'Total Sales Value',
        value: `${formatBalance(data?.total_sales_value ?? 0)}`,
        valueBgColor: '#E6FFFB',
        valueColor: '#08979C',
      },
      {
        label: 'Completed',
        value: `${data?.completed ?? 0}`,
        valueBgColor: '#F9F0FF',
        valueColor: '#722ED1',
      },
      {
        label: 'Processing',
        value: `${data?.processing ?? 0}`,
        valueBgColor: '#FFFBE6',
        valueColor: '#D48806',
      },
      {
        label: 'Cancelled',
        value: `${data?.cancelled ?? 0}`,
        valueBgColor: '#FFE6E6',
        valueColor: '#F5222D',
      },
    ],
    [data]
  );

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="Sales Overview"
        description="You're viewing all sales order below."
        actionButton={<TimelineFilter />}
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
      <Divider />

      <TableWrapper onSearch={handleSearch}>
        <OrdersTable
          data={data?.sales_overview?.data}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={isLoading}
          showCheckbox={true}
          total={data?.sales_overview?.total}
        />
      </TableWrapper>
    </div>
  );
};

export default SalesOverview;
