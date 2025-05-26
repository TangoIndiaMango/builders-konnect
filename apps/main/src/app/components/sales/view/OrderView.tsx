import { CustomerInfoCard } from './CustomerInfoCard';
import { OrderHeader } from './OrderHeader';
import { OrderItemsTable } from './OrderItemsTable';
import { OrderSummary } from './OrderSummary';
import { SingleSalesOrder } from '../../../pages/sales/types';
import { SkeletonLoader } from '../../common/SkeletonLoader';
interface OrderViewProps {
  orderId: string;
  orderData: SingleSalesOrder;
  isLoading: boolean;
}

export const OrderView = ({
  orderId,
  orderData,
  isLoading,
}: OrderViewProps) => {
  return (
    <div className="p-6 space-y-6">
      <SkeletonLoader active={isLoading} type="simple">
        <OrderHeader orderId={orderId} orderType="IN-STORE SALES" />
      </SkeletonLoader>

      <SkeletonLoader active={isLoading} type="card" hasHeader className="p-5">
        <CustomerInfoCard
          customerName={orderData?.customer?.name}
          telephone={orderData?.customer?.phone}
          email={orderData?.customer?.email}
          totalItems={orderData?.items_count}
          paymentStatus={orderData?.payment_status}
          orderStatus={orderData?.status}
          paymentMethod={orderData?.payment_methods}
          billingAddress={orderData?.billing_address}
          shippingAddress={orderData?.shipping_address}
        />
      </SkeletonLoader>

      <SkeletonLoader
        active={isLoading}
        type="table"
        hasHeader
        className="p-5"
        rows={4}
        columns={3}
      >
        <OrderItemsTable items={orderData?.line_items} />
      </SkeletonLoader>

      <div className="p-5 bg-white rounded shadow-sm">
        <SkeletonLoader active={isLoading} type="card" hasHeader>
          <OrderSummary
            subtotal={orderData?.subtotal}
            itemCount={orderData?.items_count}
            discount={orderData?.total_discount}
            tax={orderData?.fees?.tax}
            serviceFee={orderData?.fees?.service_fee}
            total={orderData?.amount}
          />
        </SkeletonLoader>
      </div>
    </div>
  );
};
