import { Tag, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { PaginatedTable } from '../common/Table/Table';
import { useSelection } from '../../../hooks/useSelection';
import { EllipsisOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table'; // important!

import type { ProductData as APIProductData } from '../../../service/inventory/inventory.types';

export type ProductTableData = APIProductData & { key: string };

export type ExportType = 'csv' | 'pdf' | null;

interface ProductTableProps {
  data: ProductTableData[];
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
  total: number;
  showCheckbox?: boolean;
  onExport?: (type: ExportType) => void;
}

export const ProductTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
  onExport,
}: ProductTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection<ProductTableData>({
    data,
  });

  const actionItems: MenuProps['items'] = [
    { key: '1', label: 'Edit' },
    { key: '2', label: 'Delete' },
    { key: '3', label: 'View Details' },
  ];

  const columns: ColumnsType<ProductTableData> = [
    {
      title: 'Product',
      key: 'product',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.primary_media_url || '/placeholder-image.jpg'}
            alt={record.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium truncate max-w-[150px]">
              {record.name}
            </div>
            <div className="text-sm text-gray-500 truncate max-w-[150px]">
              {record.description || 'No description'}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'SKU',
      key: 'SKU',
      width: 150,
      className: 'hidden sm:table-cell', // Hide SKU on small screens
    },
    {
      title: 'Category',
      key: 'category',
      width: 180,
      render: (_, record) => (
        <div>
          <div>{record.category || 'Uncategorized'}</div>
          <div className="text-sm text-gray-500">{record.subcategory || 'No subcategory'}</div>
        </div>
      ),
    },
    {
      title: 'Price',
      key: 'price',
      width: 120,
      render: (_, record) => <span>₦ {parseFloat(record.retail_price).toLocaleString()}</span>,
    },
    {
      title: 'Stock Level',
      key: 'quantity',
      width: 140,
      render: (_, record) => (
        <p>
          <span
            className={`${
              record.quantity <= 0 ? 'text-red-500' : 'text-[#003399]'
            } font-bold`}
          >
            {record.quantity}
          </span>{' '}
          Left
        </p>
      ),
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
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
        scroll={{ x: '1000px' }} // Add scroll for responsive behavior
      />
    </div>
  );
};
