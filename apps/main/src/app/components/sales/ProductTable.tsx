import { PaginatedTable } from '../common/Table/Table';
import { Avatar, Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Product } from './mockData';

interface ProductTableProps {
  products: Product[];
  onQuantityChange: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}

export const ProductTable = ({
  products,
  onQuantityChange,
  onRemove,
}: ProductTableProps) => {
  const columns = [
    {
      title: 'Product Name & Number',
      dataIndex: 'name',
      render: (_: string, record: Product) => (
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
      render: (quantity: number, record: Product) => (
        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => onQuantityChange(record.key, Number(e.target.value))}
          className="w-20"
        />
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (price: number) => <span>₦ {price.toLocaleString()}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          className="text-red-500"
          onClick={() => onRemove(record.key)}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={products}
      columns={columns}
      showPagination={false}
      showCheckbox={true}
    />
  );
};
