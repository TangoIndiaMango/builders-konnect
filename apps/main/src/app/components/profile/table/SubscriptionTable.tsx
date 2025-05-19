import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelection } from '../../../../hooks/useSelection';
import { formatBalance, getStatus } from '../../../../utils/helper';
import { Store, Subscription } from '../../../pages/profile/types';
import { DataTableProps } from '../../../types/table';
import ActionIcon from '../../common/ActionIcon';
import { PaginatedTable, type DataType } from '../../common/Table/Table';
// Create a type that combines SalesOrder with required key
type SubscriptionWithKey = Subscription & DataType;

interface SubscriptionTableProps extends DataTableProps {
  data: Subscription[];
  handleViewSubscription: (record: Subscription) => void;
}

export const SubscriptionTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
  perPage,
  updateLimitSize,
  handleViewSubscription
}: SubscriptionTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data: data as SubscriptionWithKey[],
  });

  const navigate = useNavigate();

  // Map the data to include a key property
  const dataWithKeys: SubscriptionWithKey[] = data?.map((item) => ({
    ...item,
    key: item.id,
  }));

  const columns: ColumnsType<SubscriptionWithKey> = [
    {
      title: 'Plans',
      dataIndex: 'plan_name',
      render: (_, record: SubscriptionWithKey) => (
        <div>
          <div className="font-medium capitalize">{`${record.plan_name} (${record.interval})`}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount_paid',
      render: (_, record: SubscriptionWithKey) => (
        <div>
          <div className="font-medium">{record.amount_paid}</div>
        </div>
      ),
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      render: (_, record: SubscriptionWithKey) => (
        <div>
          <div className="font-medium capitalize">{record.payment_method}</div>
        </div>
      ),
    },
    {
      title: 'Payment Date',
      dataIndex: 'date_created',
      render: (_, record: SubscriptionWithKey) => (
        <div>
          <div>{dayjs(record.payment_date).format('DD-MM-YYYY')}</div>
          <div>{dayjs(record.payment_date).format('h:mm A')}</div>
        </div>
      ),
    },

    {
      title: ' Status',
      dataIndex: 'status',
      render: (_, record: SubscriptionWithKey) => (
        <Tag color={getStatus(record.status)} className='capitalize'>{record.status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: SubscriptionWithKey) => (
        <ActionIcon
          variant="light"
          icon={<EyeOutlined />}
          onClick={() => handleViewSubscription(record)}
          className="text-gray-600 hover:text-blue-600"
        />
      ),
    },
  ];

  return (
    <div>
      <PaginatedTable<SubscriptionWithKey>
        data={dataWithKeys}
        columns={columns}
        currentPage={currentPage}
        onPageChange={onPageChange}
        loading={loading}
        total={total}
        showCheckbox={showCheckbox}
        striped={true}
        pageSize={perPage}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
        scroll={{ x: '1000px' }}
        updateLimitSize={updateLimitSize}
      />
    </div>
  );
};
