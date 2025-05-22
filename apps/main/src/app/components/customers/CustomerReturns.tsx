import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchData, useGetExportData } from '../../../hooks/useApis';
import { useTableState } from '../../../hooks/useTable';
import { exportCsvFromString, formatBalance } from '../../../utils/helper';
import DisplayHeader from '../../components/common/DisplayHeader';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import TableWrapper from '../../components/common/Table/TableWrapper';
import TableStats from '../../components/common/TableStats';
import DatePickerComp from '../../components/date/DatePickerrComp';
import { filterOptions } from '../../lib/constant';
import { ReturnsTable } from '../../components/returns/table/ReturnsTable';
import PageIntroBanner from '../../components/common/PageIntroBanner';

interface ReturnStats {
  approved_request: number;
  cancelled_request: number;
  total_refund_value: number;
  total_returns: number;
  
}

const CustomerReturns = ({customerId}: {customerId: string}) => {
  const {
    searchValue,
    setSearch,
    currentPage,
    pageSize,
    setPage,
    reset,
    customDateRange,
    setCustomDateRange,
    filterKey,
    filterValue,
    handleFilterChange,
    exportType,
    setExportType,
    limitSize,
    setLimitSize,
  } = useTableState('returns');


  const exportProducts = useGetExportData(
    `merchants/returns?export=${exportType}`
  );

  const handleExport = () => {
    exportProducts.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Products');
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        setExportType('');
      },
    });
  };

  useEffect(() => {
    if (exportType) {
      handleExport();
    }
  }, [exportType]);

  const returns = useFetchData(
    `merchants/returns?paginate=1&page=${
      currentPage ?? 1
    }&date_filter=${customDateRange ?? ''}&q=${searchValue ?? ''}&limit=${
      limitSize ?? 10
    }&sort_by=${filterKey === 'sort_by' ? filterValue : ''}&status=${
      filterKey === 'status' ? filterValue : ''
    }&customer_id=${customerId}`
  );

  const products = useFetchData(
    `merchants/inventory-products?paginate=1&page=${
      currentPage ?? 1
    }&date_filter=${customDateRange ?? ''}&q=${searchValue ?? ''}&limit=${
      limitSize ?? 10
    }&sort_by=${filterKey === 'sort_by' ? filterValue : ''}&status=${
      filterKey === 'status' ? filterValue : ''
    }`
  );

  const stats = returns?.data?.data?.stats as ReturnStats;
  const returnsData = returns?.data?.data?.data
  // console.log(returnsData,"returnsData")
 
  const navigate = useNavigate();

  const tableStatsData = useMemo(
    () => [
      {
        label: 'Total Returns',
        value: `${stats?.total_returns ?? 0}`,
        valueBgColor: '#E6F7FF',
        valueColor: '#003399',
      },
      {
        label: 'Total Refund Value',
        value: `${formatBalance(stats?.total_refund_value ?? 0)}`,
        valueBgColor: '#E6FFFB',
        valueColor: '#08979C',
      },
      {
        label: 'Approved Requests',
        value: `${stats?.approved_request ?? 0}`,
        valueBgColor: '#F9F0FF',
        valueColor: '#722ED1',
      },
      {
        label: 'Cancelled Requests',
        value: `${stats?.cancelled_request ?? 0}`,
        valueBgColor: '#FFFBE6',
        valueColor: '#D48806',
      },
    ],
    [stats]
  );


  return (
    <div className="h-full">
        <div className="p-2 space-y-3 bg-white">
          <DisplayHeader
            title="All Returns and Refund"
            description="View all returns and refunds for this customer"
            actionButton={
              <div className="flex flex-wrap items-center justify-end gap-3">
                <Button onClick={reset}>Clear</Button>
                <DatePickerComp onRangeChange={setCustomDateRange} />
              </div>
            }
          />

          <SkeletonLoader active={returns?.isLoading} type="table" columns={4} rows={1}>
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

          <TableWrapper
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            selectedFilter={filterValue}
            searchValue={searchValue}
            setSearchValue={setSearch}
            onExport={handleExport}
          >
            <ReturnsTable
              currentPath={false}
              data={returnsData}
              currentPage={currentPage}
              onPageChange={setPage}
              loading={returns?.isLoading}
              showCheckbox={true}
              total={returnsData?.total}
              perPage={returnsData?.per_page}
              updateLimitSize={setLimitSize}
            />
          </TableWrapper>
        </div>
    </div>
  );
};

export default CustomerReturns;
