import { EyeOutlined, StarFilled } from '@ant-design/icons';
import { Avatar, Button, Tag } from 'antd';
import { useSelection } from '../../../../hooks/useSelection';
import { PaginatedTable, type DataType } from '../../common/Table/Table';

import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/app/pages/customers/types';

// Create a type that combines SalesOrder with required key
type ProductWithKey = Product & DataType;

interface ProductTableProps {
  data: Product[];
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
    data: data as ProductWithKey[],
  });
  // console.log('dataTable', data);
  const navigate = useNavigate();

  // Map the data to include a key property
  const dataWithKeys: ProductWithKey[] = Array.isArray(data) ? data.map((item) => ({
    ...item,
    key: item.id || '',
  })) : [];

  const columns: ColumnsType<ProductWithKey> = [
    {
      title: 'Product',
      dataIndex: 'product',
      render: (_, record: ProductWithKey) => (
        <div className="flex items-center space-x-2">
          <Avatar shape="square"  src={
              record.primary_media_url
                ? record.primary_media_url
                : `https://placehold.co/150x150/E6F7FF/black?text=${record.name
                    ?.split(' ')
                    .map((word) => word[0]?.toUpperCase())
                    .join('')}`
            }
            alt={record.name} size="large" />
          <div>
            <div className="text-sm text-gray-500">{record.name}</div>
            <div className="text-xs font-medium text-blue-600">{record.quantity}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Product Code',
      dataIndex: 'productCode',
      render: (_, record: ProductWithKey) => (
        <div className="text-sm text-gray-500">{record.id}</div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (_, record: ProductWithKey) => (
        <div className="text-sm text-gray-500">{record.category}</div>
      ),
    },
    {
      title: 'Total Reviews',
      dataIndex: 'totalReviews',
      render: (_, record: ProductWithKey) => (
        <div className="text-sm text-gray-500">{record.total_reviews}</div>
      ),
    },
    {
      title: 'Ratings',
      dataIndex: 'ratings',
      render: (_, record: ProductWithKey) => (
        <div className="flex items-center text-sm text-gray-500">
          {Array.from({ length: 5 }, (_, index) => (
            <StarFilled
              key={index}
              style={{
                color:
                  index < Math.round(record.ratings) ? '#FFD700' : '#D3D3D3',
              }}
            />
          ))}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: ProductWithKey) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/pos/customers/product-review/view/${record.id}`)}
          className="text-gray-600 hover:text-blue-600"
        />
      ),
    },
  ];

  return (
    <div>
      <PaginatedTable<ProductWithKey>
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
