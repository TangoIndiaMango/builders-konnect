import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelection } from '../../../../hooks/useSelection';
import { formatBalance, getStatus } from '../../../../utils/helper';
import { Staff } from '../../../pages/staff/types';
import { PaginatedTable, type DataType } from '../../common/Table/Table';
import ActionIcon from '../../common/ActionIcon';
import { Discount } from '../../../pages/discount/types';

// Create a type that combines SalesOrder with required key
type DiscountListWithKey = Discount & DataType;

interface DiscountTableProps {
  data: Discount[];
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
  total: number;
  showCheckbox?: boolean;
}

export const DiscountTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
}: DiscountTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data: data as DiscountListWithKey[],
  });

  const navigate = useNavigate();

  // Map the data to include a key property
  const dataWithKeys: DiscountListWithKey[] = data?.map((item) => ({
    ...item,
    key: item.id,
  }));

  const columns: ColumnsType<DiscountListWithKey> = [
    {
      title: 'Name and code',
      dataIndex: 'name',
      render: (_, record: DiscountListWithKey) => (
        <div className="flex items-center gap-2">
          <div className="max-w-[150px]">
            <div className="font-medium capitalize">{record.name}</div>
            <div className="text-xs text-gray-500">
              Code: <span className="text-xs text-blue-600">{record.code}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Start date',
      dataIndex: 'start_date',
      render: (_, record: DiscountListWithKey) => (
        <div>
          <p>
            {record.start_date
              ? dayjs(record.start_date).format('DD-MM-YYYY')
              : '--'}
          </p>
          <p>
            {record.start_date ? dayjs(record.start_date).format('h:mm A') : ''}
          </p>
        </div>
      ),
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
      render: (_, record: DiscountListWithKey) => (
        <div>
          <p>
            {record.end_date
              ? dayjs(record.end_date).format('DD-MM-YYYY')
              : '--'}
          </p>
          <p>
            {record.end_date ? dayjs(record.end_date).format('h:mm A') : ''}
          </p>
        </div>
      ),
    },
    {
      title: 'Percent',
      dataIndex: 'percent',
      render: (_, record: DiscountListWithKey) => (
        <div>
          <p>{Number(record.percent) ? `${record.percent}%` : '--'}</p>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (_, record: DiscountListWithKey) => (
        <div>
          <p>{record.amount ? formatBalance(record.amount) : '--'}</p>
        </div>
      ),
    },
    {
      title: 'Redemption',
      dataIndex: 'redemption',
      render: (_, record: DiscountListWithKey) => (
        <div>
          <p>{record.redemption ? record.redemption : '--'}</p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: DiscountListWithKey) => (
        <Tag color={getStatus(record.status)} className="capitalize">
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DiscountListWithKey) => (
        <ActionIcon
          variant="light"
          icon={<EyeOutlined className="text-blue-600" />}
          onClick={() => navigate(`/pos/discounts/edit/${record.id}`)}
          className="text-gray-600 hover:text-blue-600"
        />
      ),
    },
  ];

  return (
    <div>
      <PaginatedTable<DiscountListWithKey>
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
