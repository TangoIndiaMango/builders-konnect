import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelection } from '../../../../hooks/useSelection';
import { PaginatedTable, type DataType } from '../../common/Table/Table';

import { ColumnsType } from 'antd/es/table';
import { Review } from '@/app/pages/customers/types';
import dayjs from 'dayjs';
import AddResponse from '../addResponse';
import ViewResponse from '../ViewResponse';
import { DataTableProps } from '../../../types/table';


type ReviewWithKey = Review & DataType;

interface ReviewTableProps extends DataTableProps {
  data: Review[];
  withPagination?: boolean;
}

export const ReviewTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  perPage,
  showCheckbox = true,
  updateLimitSize,
  withPagination = true,
}: ReviewTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data: data as ReviewWithKey[],
  });
  
  const dataWithKeys: ReviewWithKey[] = data?.map((item) => ({
    ...item,
    key: item.id.toString(),
  }));

  const columns: ColumnsType<ReviewWithKey> = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      render: (_, record: ReviewWithKey) => (
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Avatar size="large" style={{ backgroundColor: '#E6F7FF',color: '#1890ff' }} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.customer_name}</div>
            <div className="text-xs text-blue-600">
              <span className="font-bold text-gray-500">ID:</span> {record.customerID}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Feedbacks',
      dataIndex: 'feedbacks',
      render: (_, record: ReviewWithKey) => (
        <div className="text-sm text-gray-500">{record.feedback}</div>
      ),
    },
    {
      title: 'Ratings',
      dataIndex: 'ratings',
      render: (_, record: ReviewWithKey) => (
        <div className="flex items-center text-sm text-gray-500">
          {Array.from({ length: 5 }, (_, index) => (
            <StarFilled key={index} style={{ color: index < Math.round(Number(record.ratings)) ? '#FFD700' : '#D3D3D3' }} />
          ))}
        </div>
      ),
    },
    {
      title: 'Feedback Date',
      dataIndex: 'feedbackDate',
      render: (_, record: ReviewWithKey) => (
      <div>
        <div className="text-sm text-gray-500">{dayjs(record.feedback_date).format('DD-MM-YYYY')}</div>
        <div className="text-xs font-medium text-gray-500">{dayjs(record.feedback_date).format('HH:mm A')}</div>
      </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: ReviewWithKey) => (
        record.response ? (
          <ViewResponse 
            customerName={record.customer_name} 
            customerId={record.customerID} 
            rating={record.ratings} 
            feedback={record.feedback} 
            response={record.response} 
          />
        ) : (
          <AddResponse reviewId={record.id} />
        )
      ),
    },
  ];

  return (
    <div>
      <PaginatedTable<ReviewWithKey>
        data={dataWithKeys}
        columns={columns}
        currentPage={currentPage}
        onPageChange={onPageChange}
        updateLimitSize={updateLimitSize}
        loading={loading}
        total={total}
        showCheckbox={showCheckbox}
        showPagination={withPagination}
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
