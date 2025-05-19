import { Tag } from 'antd';
import { useSelection } from '../../../../hooks/useSelection';
import { PaginatedTable, type DataType } from '../../common/Table/Table';

import { ColumnsType } from 'antd/es/table';
import { Payment } from '@/app/pages/customers/types';
import dayjs from 'dayjs';
import { DataTableProps } from '../../../types/table';

type PaymentWithKey = Payment & DataType;

interface PaymentTableProps extends DataTableProps {
  data: Payment[];
  withPagination?: boolean;
}

export const PaymentTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  perPage,
  showCheckbox = true,
  updateLimitSize,
  withPagination = true,
}: PaymentTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data: data as PaymentWithKey[],
  });
  
  const dataWithKeys: PaymentWithKey[] = data?.map((item) => ({
    ...item,
    key: item.id.toString(),
  }));

  const columns: ColumnsType<PaymentWithKey> = [
  
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      render: (_, record: PaymentWithKey) => (
        <div className="text-sm text-gray-500">{record.order_number}</div>
      ),
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      render: (_, record: PaymentWithKey) => (
        <div className="text-sm text-gray-500">{dayjs(record.order_date).format('DD-MM-YYYY')}</div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (_, record: PaymentWithKey) => (
        <div className="text-sm text-gray-500">{record.amount}</div>
      ),
    },
    {
        title: 'Status',
        key: 'status',
        render: (_, record) => {
          return (
            <Tag
              color={record.status === 'pending' ? 'orange' : 'green'}
              className="capitalize"
            >
              {record.status || 'No status'}
            </Tag>
          );
        },
      },
    {
        title: 'Payment Method',
        dataIndex: 'payment_method',
        render: (_, record: PaymentWithKey) => (
          <div className="text-sm text-gray-500">{record.payment_method}</div>
        ),
      }
  ];

  return (
    <div>
      <PaginatedTable<PaymentWithKey>
        data={dataWithKeys}
        columns={columns}
        currentPage={currentPage}
        onPageChange={onPageChange}
        updateLimitSize={updateLimitSize}
        loading={loading}
        total={total}
        showCheckbox={showCheckbox}
        showPagination={withPagination}
        striped={true}
        pageSize={perPage}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
        scroll={{ x: '1000px' }}
      />
    </div>
  );
};
