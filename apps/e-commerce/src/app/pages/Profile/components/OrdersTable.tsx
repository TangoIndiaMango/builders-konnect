import React from 'react';
import { Table, Tag, Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { OrderData } from '../../../../utils/types';
import { mockData } from '../../../lib/Constants';

interface OrdersTableProps {
  onViewOrder: (orderNumber: string) => void;
}


const OrdersTable: React.FC<OrdersTableProps> = ({ onViewOrder }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns: ColumnsType<OrderData> = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      fixed: 'left',
      width: 130,
      render: (text) => (
        <span className="text-blue-600 whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: 140,
      render: (text, record) => (
        <div className="whitespace-nowrap">
          <div>{text}</div>
          <div className="text-gray-500 text-sm">{record.orderTime}</div>
        </div>
      ),
    },
    {
      title: 'Delivered',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      width: 140,
      responsive: ['lg'],
      render: (text, record) => (
        <div className="whitespace-nowrap">
          <div>{text}</div>
          <div className="text-gray-500 text-sm">{record.deliveryTime}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => (
        <span className="whitespace-nowrap">₦ {amount.toLocaleString()}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (status) => {
        let color = 'blue';
        if (status === 'Completed') {
          color = 'green';
        } else if (status === 'Cancelled') {
          color = 'red';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 70,
      render: (_, record) => (
        <Tooltip title="View Details">
          <Button
            type="text"
            icon={<EyeOutlined />}
            className="text-blue-600 hover:text-blue-700"
            onClick={() => onViewOrder(record.orderNumber)}
          />
        </Tooltip>
      ),
    },
  ];



  return (
    <Table
      columns={columns}
      dataSource={mockData}
      rowKey="orderNumber"
      pagination={{
        total: 50,
        pageSize: isMobile ? 5 : 10,
        showSizeChanger: !isMobile,
        showQuickJumper: !isMobile,
        showTotal: !isMobile ? (total) => `Total ${total} orders` : undefined,
        size: isMobile ? 'small' : 'default',
        simple: isMobile,
        position: ['bottomCenter'],
        pageSizeOptions: ['5', '10', '20', '50']
      }}
      scroll={{ x: 'max-content' }}
      style={{ minWidth: isMobile ? 'calc(100vw - 2rem)' : 'auto' }}
      className="orders-table"
      size={isMobile ? 'small' : 'middle'}
    />
  );
};

export default OrdersTable;