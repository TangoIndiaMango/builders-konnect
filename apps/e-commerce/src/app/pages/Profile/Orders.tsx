import React from 'react';
import OrdersTable from './components/OrdersTable';
import OrderDetails from './components/OrderDetails';
import OrderConfirmation from './components/OrderConfirmation';
import { mockData } from '../../lib/Constants';
import { OrderData } from '../../../utils/types';



const Orders = () => {
  const [selectedOrder, setSelectedOrder] = React.useState<OrderData | null>(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [confirmationType, setConfirmationType] = React.useState<'success' | 'cancel'>('success');
  const [view, setView] = React.useState<'list' | 'details'>('list');

  const handleViewOrder = (orderNumber: string) => {
    const order = mockData.find(order => order.orderNumber === orderNumber);
    if (order) {
      setSelectedOrder(order);
      setView('details');
    }
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
    setView('list');
  };

  const handleCancelOrder = () => {
    setConfirmationType('cancel');
    setShowConfirmation(true);
  };

  const handleConfirmCancel = (reason?: string) => {
    // Here you would make an API call to cancel the order with the reason
    console.log('Cancelling order:', selectedOrder, 'Reason:', reason);
    setShowConfirmation(false);
    setConfirmationType('success');
    handleBackToList();
  };

  const defaultAddress = {
    name: 'John Doe',
    street: '123 Main St',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
  };


  return (
    <div className="bg-white rounded-lg">
      {view === 'list' ? (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Order History</h2>
          </div>
          <OrdersTable onViewOrder={handleViewOrder} />
        </>
      ) : (
        <div className="space-y-8">
          {selectedOrder && (
            <>
              <OrderDetails 
                orderNumber={selectedOrder.orderNumber}
                orderDate={`${selectedOrder.orderDate} ${selectedOrder.orderTime}`}
                status={selectedOrder.status}
                amount={selectedOrder.amount}
                shippingAddress={defaultAddress}
                onBack={handleBackToList}
                onCancel={handleCancelOrder}
                products={selectedOrder.products}
                discount={selectedOrder.discount}
                deliveryFee={selectedOrder.deliveryFee}
                paymentMethod={selectedOrder.paymentMethod}
                paymentStatus={selectedOrder.paymentStatus}
              />
            </>
          )}
        </div>
      )}

      <OrderConfirmation
        type={confirmationType}
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmCancel}
        orderNumber={selectedOrder?.orderNumber || undefined}
      />
    </div>
  );
};

export default Orders;
