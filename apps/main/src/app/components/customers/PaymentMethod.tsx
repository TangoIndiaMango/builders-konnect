import { Button } from 'antd';
import DisplayHeader from '../common/DisplayHeader';
import TableStats from '../common/TableStats';
import TableWrapper from '../common/Table/TableWrapper';
import { PaginatedResponse } from '../../types/paginatedData';
import { SkeletonLoader } from '../common/SkeletonLoader';
import DatePickerComp from '../date/DatePickerrComp';
import { FilterState } from '../../types/table';
import { PaymentTable } from './table/paymentTable';
import { Payment } from '../../pages/customers/types';

// Dummy data for Payment interface
const dummyPayments: Payment[] = [
    {
      id: 1,
      order_number: 'ORD123456',
      order_date: '2023-10-01',
      amount: 150.00,
      status: 'completed',
      payment_method: 'credit_card'
    },
    {
      id: 2,
      order_number: 'ORD123457',
      order_date: '2023-10-02',
      amount: 200.00,
      status: 'pending',
      payment_method: 'paypal'
    },
    {
      id: 3,
      order_number: 'ORD123458',
      order_date: '2023-10-03',
      amount: 100.00,
      status: 'failed',
      payment_method: 'bank_transfer'
    },
    {
      id: 4,
      order_number: 'ORD123459',
      order_date: '2023-10-04',
      amount: 250.00,
      status: 'refunded',
      payment_method: 'credit_card'
    }
  ];
  
  

export interface TabStatsinterface {
  total_spent: number;
  total_orders: number;
}

export interface PaymentDataInterface {
  data: PaginatedResponse<Payment>;
  stats: TabStatsinterface;
}
export interface PaymentMethodProps extends FilterState {
  data: PaymentDataInterface;
  isLoading: boolean;
  withPagination?: boolean;
}
const PaymentMethod = ({
  data,
  isLoading,
  setSearchValue,
  searchValue,
  currentPage,
  setCustomDateRange,
  handleFilterChange,
  filterValue,
  onExport,
  filterOptions,
  setPage,
  reset,
  updateLimitSize,
  withPagination = true,
}: PaymentMethodProps) => {
  const tableStatsData = [
    {
      label: 'Total Orders',
      value: `${data?.stats?.total_orders || 0}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
    {
      label: 'Total Spent',
      value: `${data?.stats?.total_spent || 0}`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="Payment Method"
        description="You're viewing all payment method below."
        actionButton={
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={reset}>Clear</Button>
            <DatePickerComp onRangeChange={setCustomDateRange} />
          </div>
        }
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
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

      <TableWrapper
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onFilterChange={handleFilterChange}
        selectedFilter={filterValue}
        onExport={onExport}
        filterOptions={filterOptions}
      >
        <PaymentTable
          data={dummyPayments}
          currentPage={currentPage}
          onPageChange={setPage}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
          perPage={data?.data?.per_page}
          updateLimitSize={updateLimitSize}
          withPagination={withPagination}
        />
      </TableWrapper>
    </div>
  );
};

export default PaymentMethod;
