import { Tag } from 'antd';
import { PaymentMethod } from '../../../pages/sales/types';
import { formatBalance, getStatusColor } from '../../../../utils/helper';
interface CustomerInfoCardProps {
  customerName: string;
  telephone: string;
  email: string;
  totalItems: number;
  paymentStatus: string;
  orderStatus: string;
  paymentMethod: PaymentMethod[];
  billingAddress?: string;
  shippingAddress?: string;
}

export const CustomerInfoCard = ({
  customerName,
  telephone,
  email,
  totalItems,
  paymentStatus,
  orderStatus,
  paymentMethod,
  billingAddress = '-',
  shippingAddress = '-',
}: CustomerInfoCardProps) => {
  // const getStatusColor = (status: string) => {
  //   const colorMap: Record<string, string> = {
  //     paid: 'blue',
  //     Pending: 'gold',
  //     Completed: 'green',
  //     Failed: 'red',
  //   };
  //   return colorMap[status] || 'default';
  // };

  return (
    <div className="p-6 space-y-6 rounded-lg bg-gray-50">
      <h2 className="mb-4 text-lg font-semibold">Customer Information</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <p className="mb-1 text-gray-500">Customer Name</p>
          <p className="font-medium">{customerName}</p>
        </div>
        <div>
          <p className="mb-1 text-gray-500">Telephone No</p>
          <p className="font-medium">{telephone}</p>
        </div>
        <div>
          <p className="mb-1 text-gray-500">Email Address</p>
          <p className="font-medium truncate" title={email}>
            {email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <p className="mb-1 text-gray-500">Total Item</p>
          <p className="font-medium">{totalItems} Items</p>
        </div>
        <div>
          <p className="mb-1 text-gray-500">Payment Status</p>
          <Tag color={getStatusColor(paymentStatus)}>{paymentStatus}</Tag>
        </div>
        <div>
          <p className="mb-1 text-gray-500">Order Status</p>
          <Tag color={getStatusColor(orderStatus)}>{orderStatus}</Tag>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <p className="mb-1 text-gray-500">Payment method</p>
          <ul className="space-y-1">
            {paymentMethod?.map((method, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <span className="font-medium">{method.method}</span>
                <span className="text-gray-700">{formatBalance(method.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 text-gray-500">Billing Address</p>
          <p className="font-medium">{billingAddress || '-'}</p>
        </div>
        <div>
          <p className="mb-1 text-gray-500">Shipping Address</p>
          <p className="font-medium">{shippingAddress || '-'}</p>
        </div>
      </div>
    </div>
  );
};
