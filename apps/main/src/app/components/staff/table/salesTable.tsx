import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelection } from '../../../../hooks/useSelection';
import { getStatus } from '../../../../utils/helper';
import { Staff } from '../../../pages/staff/types';
import { PaginatedTable, type DataType } from '../../common/Table/Table';
import ActionIcon from '../../common/ActionIcon';

// Create a type that combines SalesOrder with required key
type StaffListWithKey = Staff & DataType;

interface StaffTableProps {
  data: Staff[];
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
  total: number;
  showCheckbox?: boolean;
}

export const StaffTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
}: StaffTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data: data as StaffListWithKey[],
  });

  const navigate = useNavigate();

  // Map the data to include a key property
  const dataWithKeys: StaffListWithKey[] = data?.map((item) => ({
    ...item,
    key: item.id,
  }));

  const columns: ColumnsType<StaffListWithKey> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record: StaffListWithKey) => (
        <div className='flex items-center gap-2'>
          <Avatar
            src={record?.avatar}
            size={30}
            style={{ backgroundColor: '#E6F7FF' }}
            icon={<UserOutlined className='text-blue-600' />}
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">ID: <span className='text-blue-600'>{record.id}</span></div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, record: StaffListWithKey) => (
        <div>
          <div className="font-medium">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      render: (_, record: StaffListWithKey) => (
        <div>
          <div>{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (_, record: StaffListWithKey) => (
        <span className="font-medium">{record.role || 'N/A'}</span>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'last_active',
      render: (_, record: StaffListWithKey) => (
        <div>
          <p>{record.last_active ? dayjs(record.last_active).format('DD-MM-YYYY') : '--'}</p>
          <p>{record.last_active ? dayjs(record.last_active).format('h:mm A') : ''}</p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: StaffListWithKey) => (
        <Tag color={getStatus(record.status)} className='capitalize'>{record.status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: StaffListWithKey) => (
        <ActionIcon
          variant='light'
          icon={<EyeOutlined className='text-blue-600' />}
          onClick={() => navigate(`/pos/staff/view/${record.id}`)}
          className="text-gray-600 hover:text-blue-600"
        />
      ),
    },
  ];

  return (
    <div>
      <PaginatedTable<StaffListWithKey>
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
      />
    </div>
  );
};
