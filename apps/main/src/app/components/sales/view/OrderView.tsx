import { CustomerInfoCard } from "./CustomerInfoCard";
import { OrderHeader } from "./OrderHeader";
import { OrderItemsTable } from "./OrderItemsTable";
import { OrderSummary } from "./OrderSummary";

interface OrderViewProps {
  orderId: string;
  orderData: any; // Type this based on your data structure
}

export const OrderView = ({ orderId, orderData }: OrderViewProps) => {
  return (
    <div className="p-6 space-y-6">
      <OrderHeader
        orderId={orderId}
        orderType="IN-STORE SALES"
      />

      <CustomerInfoCard
        customerName={orderData.customer.name}
        telephone={orderData.customer.phone}
        email={orderData.customer.email}
        totalItems={orderData.items.length}
        paymentStatus={orderData.paymentStatus}
        orderStatus={orderData.orderStatus}
        paymentMethod={orderData.paymentMethod}
        billingAddress={orderData.billingAddress}
        shippingAddress={orderData.shippingAddress}
      />

      <OrderItemsTable items={orderData.items} />

      <div className="bg-[#F8F9FC] shadow-sm p-3 rounded">
        <OrderSummary
          subtotal={orderData.subtotal}
          itemCount={orderData.items.length}
          discount={orderData.discount}
          tax={orderData.tax}
          serviceFee={orderData.serviceFee}
          total={orderData.total}
        />
      </div>
    </div>
  );
};
