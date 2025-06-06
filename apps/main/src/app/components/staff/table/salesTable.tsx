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
import { DataTableProps } from '../../../types/table';

// Create a type that combines SalesOrder with required key
type StaffListWithKey = Staff & DataType;

interface StaffTableProps extends DataTableProps {
  data: Staff[];
}

export const StaffTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
  perPage,
  updateLimitSize,
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
      title: 'Staff Name and ID',
      dataIndex: 'name',
      render: (_, record: StaffListWithKey) => (
        <div className="flex items-center gap-2">
          <Avatar
            src={record?.avatar}
            size={30}
            style={{ backgroundColor: '#E6F7FF' }}
            icon={<UserOutlined className="text-blue-600" />}
          />
          <div className="max-w-[150px]">
            <div className="font-medium">{record?.name}</div>
            <div className="text-xs text-gray-500">
              ID: <span className="text-xs text-blue-600">{record?.staffID}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, record: StaffListWithKey) => (
        <div className="max-w-[150px]">
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
          <p>
            {record.last_active
              ? dayjs(record.last_active).format('DD-MM-YYYY')
              : '--'}
          </p>
          <p>
            {record.last_active
              ? dayjs(record.last_active).format('h:mm A')
              : ''}
          </p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: StaffListWithKey) => (
        <Tag color={getStatus(record.status)} className="capitalize">
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: StaffListWithKey) => (
        <ActionIcon
          variant="light"
          icon={<EyeOutlined className="text-blue-600" />}
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
        updateLimitSize={updateLimitSize}
        loading={loading}
        total={total}
        showCheckbox={showCheckbox}
        striped={true}
        pageSize={perPage}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        resetSelection={resetSelection}
        scroll={{ x: '1000px' }}
      />
    </div>
  );
};
