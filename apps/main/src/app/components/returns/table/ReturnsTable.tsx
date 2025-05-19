import { Tag, Avatar } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table'; // important!
import { DataTableProps } from '../../../types/table';
import { useSelection } from '../../../../hooks/useSelection';
import { DataType, PaginatedTable } from '../../common/Table/Table';
import dayjs from 'dayjs';
import { formatBalance } from '../../../../utils/helper';
import ActionIcon from '../../common/ActionIcon';
import { useNavigate } from "react-router-dom";

export interface ReturnsData {
  id: string;
  export?: 'csv' | 'pdf'; // Added for table compatibility
  name: string;
  SKU: string;
  ean: string;
  category: string | null;
  subcategory: string | null;
  product_type: string | null;
  retail_price: string;
  cost_price: string;
  metadata: Record<string, unknown> | null; // Fixed any type
  description: string | null;
  tags: string | null;
  quantity: number;
  measurement_unit: string;
  reorder_value: string | null;
  primary_media_url: string;
  media: string[];
  status: string;
  date_added: string;
}

type ReturnsDataWithKey = ReturnsData & DataType;

interface ReturnsTableProps extends DataTableProps {
  data: ReturnsDataWithKey[];
  currentPath?: boolean;
}

export const ReturnsTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
  currentPath = true,
  perPage,
  updateLimitSize,
}: ReturnsTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } =
    useSelection<ReturnsDataWithKey>({
      data,
    });

  const navigate = useNavigate();

  const columns: ColumnsType<ReturnsDataWithKey> = [
    {
      title: 'Product',
      key: 'product',
      width: 200,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            shape="square"
            src={
              record.primary_media_url
                ? record.primary_media_url
                : `https://placehold.co/150x150/E6F7FF/black?text=${record?.product_name
                    ?.split(' ')
                    .map((word) => word[0]?.toUpperCase())
                    .join('')}`
            }
            alt={record?.product_name}
            className="object-cover w-10 h-10 rounded-lg"
          />
          <div>
            <div className="font-medium truncate max-w-[150px] capitalize">
              {record?.product_name}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Date Returned',
      key: 'date_added',
      width: 150,
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
      title: 'Order Id',
      dataIndex: 'order_id',
      width: 200,
      key: 'SKU',
      render: (_, record) => <span className="text-nowrap">{record?.id || 'No order id'}</span>,
    },

    {
      title: 'Amount',
      key: 'amount',
      render: (_, record) => <span>{formatBalance(record?.total_amount_refunded)}</span>,
    },
    {
      title: 'Customer ',
      dataIndex: 'customer',
      width: 150,
      render: (_, record: ReturnsDataWithKey) => (
        <div>
          <div className="font-medium">
            {record?.customer_name ?? 'Milacia Florence'}
          </div>
          <div className="text-sm text-gray-500">
            {record?.customer_email ?? 'milaciaflorence@gmail.com'}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return (
          <Tag
            color={record.status === 'pending' ? 'orange' : 'green'}
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
      render: (_, record) => (
        <ActionIcon
          variant="light"
          icon={<EyeOutlined className="text-[#1890FF]" />}
          onClick={() => {
            navigate(currentPath  ? `/pos/returns/view/${record.id}` : `/pos/customers/returns/view/${record.id}`);
          }}
        />
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
        pageSize={perPage}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
        updateLimitSize={updateLimitSize}
        scroll={{ x: '1000px' }} 
      />
    </div>
  );
};
