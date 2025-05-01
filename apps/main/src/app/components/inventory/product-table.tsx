import { Tag, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { DataType, PaginatedTable } from '../common/Table/Table';
import { useSelection } from '../../../hooks/useSelection';
import { EllipsisOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table'; // important!

export interface ProductData extends DataType {
  id: string;
  image: string;
  name: string;
  description: string;
  sku: string;
  dateAdded: string;
  time: string;
  price: number;
  stockLevel: number;
  status: 'Active' | 'Not Active' | 'Unpublished';
}

interface ProductTableProps {
  data: ProductData[];
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
  total: number;
  showCheckbox?: boolean;
}

export const ProductTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
}: ProductTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data,
  });

  const actionItems: MenuProps['items'] = [
    { key: '1', label: 'Edit' },
    { key: '2', label: 'Delete' },
    { key: '3', label: 'View Details' },
  ];

  const columns: ColumnsType<ProductData> = [
    {
      title: 'Product',
      key: 'product',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.image}
            alt={record.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium truncate max-w-[150px]">
              {record.name}
            </div>
            <div className="text-sm text-gray-500 truncate max-w-[150px]">
              {record.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 150,
      className: 'hidden sm:table-cell', // Hide SKU on small screens
    },
    {
      title: 'Date Added',
      key: 'dateAdded',
      width: 180,
      render: (_, record) => (
        <div>
          <div>{record.dateAdded}</div>
          <div className="text-sm text-gray-500">{record.time}</div>
        </div>
      ),
    },
    {
      title: 'Price',
      key: 'price',
      width: 120,
      render: (_, record) => <span>₦ {record.price.toLocaleString()}</span>,
    },
    {
      title: 'Stock Level',
      key: 'stockLevel',
      width: 140,
      render: (_, record) => (
        <p>
          <span
            className={`${
              record.stockLevel <= 0 ? 'text-red-500' : 'text-[#003399]'
            } font-bold`}
          >
            {record.stockLevel}
          </span>{' '}
          Left
        </p>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 130,
      render: (_, record) => {
        const statusColors = {
          Active: 'success',
          'Not Active': 'error',
          Unpublished: 'default',
        };
        return <Tag color={statusColors[record.status]}>{record.status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 80,
      render: () => (
        <Dropdown menu={{ items: actionItems }} trigger={['click']}>
          <Button
            type="text"
            className="w-8 h-8 flex items-center justify-center bg-[#E6F7FF] hover:opacity-80 rounded-lg"
          >
            <EllipsisOutlined rotate={90} className="text-[#1890FF]" />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full">
      <PaginatedTable
        data={data}
        columns={columns}
        currentPage={currentPage}
        onPageChange={onPageChange}
        loading={loading}
        total={total}
        showCheckbox={showCheckbox}
        striped
        pageSize={10}
        rowSelection={rowSelection as any}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
        scroll={{ x: '1000px' }} // Add scroll for responsive behavior
      />
    </div>
  );
};
