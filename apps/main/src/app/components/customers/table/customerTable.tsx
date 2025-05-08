import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button} from 'antd';
import { useSelection } from '../../../../hooks/useSelection';
import { PaginatedTable, type DataType } from '../../common/Table/Table';
// import { formatBalance, getStatusColor } from '../../../../utils/helper';

import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Customer } from '@/app/lib/mockData';


// Create a type that combines SalesOrder with required key
type CustomerWithKey = Customer & DataType;

interface CustomersTableProps {
  data: Customer[];
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
  total: number;
  showCheckbox?: boolean;
}

export const CustomersTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
}: CustomersTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data: data as CustomerWithKey[],
  });
  // console.log('dataTable', data);
  const navigate = useNavigate();

  // Map the data to include a key property
  const dataWithKeys: CustomerWithKey[] = Array.isArray(data) ? data.map((item) => ({
    ...item,
    key: item.id,
  })) : [];

  const columns: ColumnsType<CustomerWithKey> = [
    {
      title: 'Customer ID',
      dataIndex: 'id',
      render: (_, record: CustomerWithKey) => (
        <div className="flex items-center space-x-2">
          <Avatar size="large" style={{ backgroundColor: '#E6F7FF',color: '#1890ff' }} icon={<UserOutlined />} />
          <div>
            <div className="text-sm text-gray-500">{record.name}</div>
            <div className="text-xs font-medium text-blue-600"><span className="font-bold text-gray-500">ID:</span> {record.customerID}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, record: CustomerWithKey) => (
        <div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      render: (_, record: CustomerWithKey) => (
        <div>
          <div className="text-sm text-gray-500">{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'referral_source',
      render: (_, record: CustomerWithKey) => (
        <div>
          <div className="text-sm text-gray-500">{record.referral_source}</div>
        </div>
      ),
    },
    {
      title: 'Location/Address',
      dataIndex: 'address',
      render: (_, record: CustomerWithKey) => (
        <div>
          <div className="text-sm text-gray-500">{record.address}</div>
        </div>
      ),
    },
    {
      title: 'Date Joined',
      dataIndex: 'date_joined',
      render: (_, record: CustomerWithKey) => (
        <div>
          <div className="text-sm text-gray-500">{dayjs(record.date_joined).format('DD-MM-YYYY')}</div>
          <div className="text-xs font-medium text-gray-500">{dayjs(record.date_joined).format('HH:mm A')}</div>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: CustomerWithKey) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          // onClick={() => ()}
          className="text-gray-600 hover:text-blue-600"
        />
      ),
    },

  ];

  return (
    <div>
      <PaginatedTable<CustomerWithKey>
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
