import { Tag, Button, Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { PaginatedTable } from '../common/Table/Table';
import { useSelection } from '../../../hooks/useSelection';
import { EllipsisOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table'; // important!

import type { ProductData as APIProductData } from '../../../service/inventory/inventory.types';
import { formatBalance } from '../../../utils/helper';
import dayjs from 'dayjs';

export type ProductTableData = APIProductData & { key: string };

interface ProductTableProps {
  data: ProductTableData[];
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
  total: number;
  per_page: number;
  showCheckbox?: boolean;
}

export const ProductTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  per_page,
  showCheckbox = true,
}: ProductTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } =
    useSelection<ProductTableData>({
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
          <Avatar
            shape="square"
            src={
              record.primary_media_url
                ? record.primary_media_url
                : `https://placehold.co/150x150/E6F7FF/black?text=${record.name
                    ?.split(' ')
                    .map((word) => word[0])
                    .join('')}`
            }
            alt={record.name}
            className="object-cover w-10 h-10 rounded-lg"
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
      className: 'hidden sm:table-cell',
      render: (_, record) => <span>#{record.SKU || 'No SKU'}</span>,
    },
    {
      title: 'Date Added',
      key: 'date_added',
      width: 180,
      render: (_, record) => (
        <div>
          <div>{dayjs(record.date_added).format('DD MMM YYYY')}</div>
          <div className="text-xs text-gray-500">
            {dayjs(record.date_added).format('hh:mm A')}
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      key: 'price',
      width: 120,
      render: (_, record) => <span>{formatBalance(record.retail_price)}</span>,
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
          left
        </p>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 130,
      render: (_, record) => {
        return (
          <Tag
            color={record.status === 'active' ? 'green' : 'red'}
            className="capitalize"
          >
            {record.status || 'No status'}
          </Tag>
        );
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
        pageSize={per_page}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
        scroll={{ x: '1000px' }} // Add scroll for responsive behavior
      />
    </div>
  );
};
