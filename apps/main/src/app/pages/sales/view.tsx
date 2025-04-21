import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Select, Tag, Typography } from 'antd';
import { OrderView } from '../../components/sales/view/OrderView';
const orderData = {
  customer: {
    name: 'Oluwawolemi *******',
    phone: '0904556****',
    email: '******************',
  },
  items: [
    {
      key: '1',
      image: '/product-images/cement.png',
      name: 'Premium Cement',
      variant: '10kg Smooth',
      unitPrice: 25000.0,
      quantity: 2,
      totalPrice: 50000.0,
    },
    {
      key: '2',
      image: '/product-images/cement.png',
      name: 'Premium Cement',
      variant: '10 kg Coarse',
      unitPrice: 25000.0,
      quantity: 5,
      totalPrice: 150000.0,
    },
  ],
  paymentStatus: 'Paid',
  orderStatus: 'Pending',
  paymentMethod: 'Bank Transfer',
  subtotal: 60000,
  tax: 60000,
  serviceFee: 1000,
  total: 63250,
};

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
const SalesViewPage = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined />
          <Typography.Title level={4} className="!mb-0">
            View order
          </Typography.Title>
          <Tag>Pending</Tag>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Select
            placeholder="Select order status"
            options={orderStatusOptions}
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
      <OrderView orderId="12345" orderData={orderData} />;
    </div>
  );
};

export default SalesViewPage;
