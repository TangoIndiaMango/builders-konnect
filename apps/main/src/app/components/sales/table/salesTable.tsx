import { EyeOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelection } from '../../../../hooks/useSelection';
import { formatBalance, getStatusColor } from '../../../../utils/helper';
import { SalesOrder } from '../../../pages/sales/types';
import { PaginatedTable, type DataType } from '../../common/Table/Table';


// Create a type that combines SalesOrder with required key
type SalesOrderWithKey = SalesOrder & DataType;

interface OrdersTableProps {
  data: SalesOrder[];
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
  total: number;
  showCheckbox?: boolean;
}

export const OrdersTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
}: OrdersTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data: data as SalesOrderWithKey[],
  });

  const navigate = useNavigate();

  // Map the data to include a key property
  const dataWithKeys: SalesOrderWithKey[] = data?.map((item) => ({
    ...item,
    key: item.id,
  }));

  const columns: ColumnsType<SalesOrderWithKey> = [
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      render: (_, record: SalesOrderWithKey) => (
        <div>
          <div className="font-medium text-blue-600">{record.order_number}</div>
          <div className="text-sm text-gray-500">
            Total Items: {record.items_count}
          </div>
        </div>
      ),
    },
    {
      title: 'Customer Details',
      dataIndex: 'customer',
      render: (_, record: SalesOrderWithKey) => (
        <div>
          <div className="font-medium">{record.customer.name}</div>
          <div className="text-sm text-gray-500">{record.customer.email}</div>
        </div>
      ),
    },
    {
      title: 'Order Date',
      dataIndex: 'date',
      render: (_, record: SalesOrderWithKey) => (
        <div>
          <div>{dayjs(record.date).format('DD-MM-YYYY')}</div>
          <div>{dayjs(record.date).format('h:mm A')}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (_, record: SalesOrderWithKey) => (
        <span className="font-medium">{formatBalance(record.amount)}</span>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      render: (_, record: SalesOrderWithKey) => (
        <Tag color={getStatusColor(record.payment_status)}>
          {record.payment_status}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: SalesOrderWithKey) => (
        <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: SalesOrderWithKey) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/pos/sales/view/${record.id}`)}
          className="text-gray-600 hover:text-blue-600"
        />
      ),
    },
  ];

  return (
    <div>
      <PaginatedTable<SalesOrderWithKey>
        data={dataWithKeys}
        columns={columns}
        currentPage={currentPage}
        onPageChange={onPageChange}
        loading={loading}
        total={total}
        showCheckbox={showCheckbox}
        striped={true}
        pageSize={10}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
        scroll={{ x: '1000px' }}
      />
    </div>
  );
};
