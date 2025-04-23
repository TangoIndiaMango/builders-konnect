import { Avatar } from 'antd';
import { PaginatedTable } from '../../common/Table/Table';

interface OrderItem {
  key: string;
  image: string;
  name: string;
  variant: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

interface OrderItemsTableProps {
  items: OrderItem[];
}

export const OrderItemsTable = ({ items }: OrderItemsTableProps) => {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      render: (_: string, record: OrderItem) => (
        <div className="flex items-center gap-3">
          <Avatar
            shape="square"
            size={40}
            className="bg-gray-200"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.variant}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      render: (price: number) => <span>₦ {price.toLocaleString()}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (price: number) => <span>₦ {price.toLocaleString()}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">List of Items</h2>
      <PaginatedTable
        data={items}
        columns={columns}
        showPagination={false}
        showCheckbox={false}
      />
    </div>
  );
};
