import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Select, Tag, Typography } from 'antd';
import { OrderView } from '../../components/sales/view/OrderView';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchData, useGetData, usePutData } from '../../../hooks/useApis';
import { SingleSalesOrder } from './types';
import { getStatusColor } from '../../../utils/helper';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import SuccessModal from '../../components/common/SuccessModal';
import ErrorModal from '../../components/common/ErrorModal';
import { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];
const orderStatusOptions = [
  { label: 'Paid', value: 'paid' },
  { label: 'Failed', value: 'failed' },
  { label: 'Pending', value: 'pending' },
  // { label: 'Cancelled', value: 'cancelled' },
];

const items: MenuItem[] = [
  {
    key: 'download',
    label: <Button type="text">Download Reciept</Button>,
  },
  {
    key: 'share',
    label: <Button type="text">Share Reciept</Button>,
  },
];
const SalesViewPage = () => {
  const { id } = useParams();
  const getSalesOrder = useFetchData(`merchants/sales-orders/${id}`);
  const singleSalesOrder = getSalesOrder?.data?.data as SingleSalesOrder;
  const updateSalesOrder = usePutData(`merchants/sales-orders/${id}`);
  const [option, setOption] = useState<string>(singleSalesOrder?.payment_status);
  // console.log('getSalesOrder', singleSalesOrder);
  // const onClick: MenuProps['onClick'] = (e) => {
  //   console.log('click ', e);
  // };

  const navigate = useNavigate();

  const handleUpdateSalesOrder = (status: string) => {
    setOption(status);
    updateSalesOrder.mutate({
      payment_status: status,
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined onClick={() => navigate(-1)} />
          <Typography.Title level={4} className="!mb-0">
            View order
          </Typography.Title>
          <SkeletonLoader active={getSalesOrder.isLoading} type="simple">
            <Tag color={getStatusColor(singleSalesOrder?.status)}>
              {singleSalesOrder?.status}
            </Tag>
          </SkeletonLoader>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Select
            placeholder="Select order status"
            options={orderStatusOptions}
            onChange={handleUpdateSalesOrder}
            value={option}
          />

          <Dropdown menu={{ items }} placement="bottomLeft">
            <Button type="primary" className="space-x-1 rounded">
              <span>Quick Action</span>{' '}
              <span>
                <DownOutlined />
              </span>
            </Button>
          </Dropdown>
        </div>
      </div>
      <OrderView
        orderId={singleSalesOrder?.order_number}
        orderData={singleSalesOrder}
        isLoading={getSalesOrder.isLoading}
      />

      <SuccessModal
        open={updateSalesOrder.isSuccess}
        onClose={() => {
          getSalesOrder?.refetch();
          updateSalesOrder.reset();
        }}
        title="Sales Order Updated"
        message="The sales order has been updated successfully"
      />

      <ErrorModal
        open={updateSalesOrder.isError}
        onClose={() => {
          updateSalesOrder.reset();
        }}
        title="Error"
        message="An error occurred while updating the sales order"
      />
    </div>
  );
};

export default SalesViewPage;
