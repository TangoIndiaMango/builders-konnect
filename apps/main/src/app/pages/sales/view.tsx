import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Select, Tag, Typography } from 'antd';
import { OrderView } from '../../components/sales/view/OrderView';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchData, useGetData } from '../../../hooks/useApis';
import { SingleSalesOrder } from './types';
import { getStatusColor } from '../../../utils/helper';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';

type MenuItem = Required<MenuProps>['items'][number];
const orderStatusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
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
const SalesViewPage = ({
  isCustomerOrder = true,
}: {
  isCustomerOrder?: boolean;
}) => {
  const { id } = useParams();
  const getSalesOrder = useFetchData(`merchants/sales-orders/${id}`);
  const singleSalesOrder = getSalesOrder?.data?.data as SingleSalesOrder;
  // console.log('getSalesOrder', singleSalesOrder);
  // const onClick: MenuProps['onClick'] = (e) => {
  //   console.log('click ', e);
  // };
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined onClick={() => navigate(-1)} />
          <Typography.Title level={4} className="!mb-0">
            View order
          </Typography.Title>
          {isCustomerOrder && (
            <SkeletonLoader active={getSalesOrder.isLoading} type="simple">
              <Tag color={getStatusColor(singleSalesOrder?.status)}>
                {singleSalesOrder?.status}
              </Tag>
            </SkeletonLoader>
          )}
        </div>

        {isCustomerOrder && (
          <div className="flex items-center justify-end gap-3">
            {/* <Select
            placeholder="Select order status"
            options={orderStatusOptions}
          /> */}

            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button type="primary" className="space-x-1 rounded">
                <span>Quick Action</span>{' '}
                <span>
                  <DownOutlined />
                </span>
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
      <OrderView
        orderId={singleSalesOrder?.order_number}
        orderData={singleSalesOrder}
        isLoading={getSalesOrder.isLoading}
      />
    </div>
  );
};

export default SalesViewPage;
