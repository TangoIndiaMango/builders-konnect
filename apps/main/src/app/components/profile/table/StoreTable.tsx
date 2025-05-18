import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelection } from '../../../../hooks/useSelection';
import { getStatus } from '../../../../utils/helper';
import { Store } from '../../../pages/profile/types';
import { DataTableProps } from '../../../types/table';
import ActionIcon from '../../common/ActionIcon';
import { PaginatedTable, type DataType } from '../../common/Table/Table';
// Create a type that combines SalesOrder with required key
type StoreWithKey = Store & DataType;

interface StoreTableProps extends DataTableProps {
  data: Store[];
}

export const StoreTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
  perPage,
  updateLimitSize,
}: StoreTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data: data as StoreWithKey[],
  });

  const navigate = useNavigate();

  // Map the data to include a key property
  const dataWithKeys: StoreWithKey[] = data?.map((item) => ({
    ...item,
    key: item.id,
  }));

  const columns: ColumnsType<StoreWithKey> = [
    {
      title: 'Store ID',
      dataIndex: 'storeID',
      render: (_, record: StoreWithKey) => (
        <div>
          <div className="font-medium capitalize">{record.name}</div>
          <div className="text-sm text-gray-500">
            ID: <span className="text-blue-600 ">#{record.storeID}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Total Products',
      dataIndex: 'total_products',
      render: (_, record: StoreWithKey) => (
        <div>
          <div className="font-medium">{record.total_products}</div>
        </div>
      ),
    },
    {
      title: 'Total Sales',
      dataIndex: 'total_sales',
      render: (_, record: StoreWithKey) => (
        <div>
          <div className="font-medium">{record.total_sales}</div>
        </div>
      ),
    },
    {
      title: 'Total Staff',
      dataIndex: 'total_staff',
      render: (_, record: StoreWithKey) => (
        <div>
          <div className="font-medium">{record.total_staff}</div>
        </div>
      ),
    },
    {
      title: 'Date Created',
      dataIndex: 'date_created',
      render: (_, record: StoreWithKey) => (
        <div>
          <div>{dayjs(record.date_created).format('DD-MM-YYYY')}</div>
          <div>{dayjs(record.date_created).format('h:mm A')}</div>
        </div>
      ),
    },

    {
      title: ' Status',
      dataIndex: 'status',
      render: (_, record: StoreWithKey) => (
        <Tag color={getStatus(record.status)} className='capitalize'>{record.status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: StoreWithKey) => (
        <ActionIcon
          variant="light"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/pos/profile/store/${record.id}`)}
          className="text-gray-600 hover:text-blue-600"
        />
      ),
    },
  ];

  return (
    <div>
      <PaginatedTable<StoreWithKey>
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
