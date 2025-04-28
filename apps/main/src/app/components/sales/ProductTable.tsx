import { PaginatedTable } from '../common/Table/Table';
import { Avatar, Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ProductType } from '../../lib./../pages/sales/types';
import { formatBalance } from '../../../utils/helper';

interface ProductTableProps {
  products: ProductType[];
  onQuantityChange: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}

export const ProductTable = ({
  products,
  onQuantityChange,
  onRemove,
}: ProductTableProps) => {
  console.log(products);
  const columns = [
    {
      title: 'Product Name & Number',
      dataIndex: 'name',
      render: (_: string, record: ProductType) => (
        <div className="flex items-center gap-3">
          <Avatar
            shape="square"
            size={40}
            className="bg-gray-200"
            src={
              record?.primary_media_url ||
              'https://api.dicebear.com/7.x/miniavs/svg?seed=2'
            }
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">
              {record?.ean ? record.ean : record.SKU}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      render: (_: any, record: ProductType) => (
        <span>{formatBalance(record.retail_price)}</span>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (quantity: number, record: ProductType) => (
        <Input
          type="number"
          min={1}
          value={quantity || 1}
          onChange={(e) => onQuantityChange(record.id, Number(e.target.value))}
          className="w-20"
        />
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (_: any, record: ProductType) => (
        <span>
          {formatBalance(Number(record.retail_price) * record.quantity)}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ProductType) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          className="text-red-500"
          onClick={() => onRemove(record.id)}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={products as any}
      columns={columns as any}
      showPagination={false}
      showCheckbox={true}
    />
  );
};
