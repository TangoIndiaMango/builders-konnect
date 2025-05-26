import { Avatar } from 'antd';
import { PaginatedTable } from '../../common/Table/Table';
import { LineItem } from '../../../pages/sales/types';
import { formatBalance } from '../../../../utils/helper';
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
  items: LineItem[];
}

export const OrderItemsTable = ({ items }: OrderItemsTableProps) => {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      render: (_: string, record: LineItem) => (
        <div className="flex items-center gap-3">
          <Avatar
            shape="square"
            size={40}
            className="bg-gray-200"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
          />
          <div>
            <div className="font-medium">{record.product}</div>
            {/* <div className="text-sm text-gray-500">{record}</div> */}
          </div>
        </div>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_cost',
      render: (price: number) => <span>{price}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (quantity: number) => <span>{quantity}</span>,
    },
    {
      title: 'Total Price',
      dataIndex: 'total_cost',
      render: (price: number) => <span>{price}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">List of Items</h2>
      <PaginatedTable
        data={items?.map((item) => ({ ...item, key: item.product }))}
        columns={columns}
        showPagination={false}
        showCheckbox={false}
        scroll={{ x: '1000px' }}
      />
    </div>
  );
};
