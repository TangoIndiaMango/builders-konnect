import { EyeOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { useSelection } from '../../../../hooks/useSelection';
import { PaginatedTable, type DataType } from '../../common/Table/Table';
import { getStatusColor } from '../../../../utils/helper';

interface OrderData extends DataType {
  orderNumber: string;
  customerDetails: {
    name: string;
    email: string;
  };
  orderDate: string;
  amount: number;
  paymentStatus: 'Paid' | 'Failed';
  orderStatus: 'Processing' | 'Completed' | 'Cancelled';
  totalItems: number;
}

export const OrdersTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
}) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data,
  });
  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      render: (text: string, record: OrderData) => (
        <div>
          <div className="font-medium text-blue-600">{text}</div>
          <div className="text-sm text-gray-500">
            Total Items: {record.totalItems}
          </div>
        </div>
      ),
    },
    {
      title: 'Customer Details',
      dataIndex: 'customerDetails',
      render: (details: OrderData['customerDetails']) => (
        <div>
          <div className="font-medium">{details.name}</div>
          <div className="text-sm text-gray-500">{details.email}</div>
        </div>
      ),
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      render: (date: string, record: OrderData) => (
        <div>
          <div>{date}</div>
          <div className="text-sm text-gray-500">{record.timeStamp}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount: number) => (
        <span className="font-medium">₦ {amount.toLocaleString()}</span>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          className="text-gray-600 hover:text-blue-600"
        />
      ),
    },
  ];

  return (
    <div>
      <PaginatedTable
        data={data}
        columns={columns}
        currentPage={currentPage}
        onPageChange={onPageChange}
        loading={loading}
        total={total}
        showCheckbox={showCheckbox}
        striped={true}
        pageSize={10}
        rowSelection={rowSelection as any}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
      />
    </div>
  );
};
