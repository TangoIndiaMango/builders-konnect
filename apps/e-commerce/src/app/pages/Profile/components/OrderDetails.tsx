import React from 'react';
import { Tag, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { OrderDetailsProps } from '../../../../utils/types';

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderNumber,
  orderDate,
  status,
  amount,
  onBack,
  onCancel,
  products,
  discount,
  deliveryFee,
  paymentMethod,
  paymentStatus,
}) => {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              className="pl-0 text-[#667085]"
            >
              Back to Orders
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="">Order<span className="font-semibold text-[#003399]"> {orderNumber}</span>  was Placed on <span className="font-semibold text-[#003399]">{new Date(orderDate).toLocaleDateString()}</span>   {status === 'Processing' ? 'is' : status === 'Cancelled' ? 'has' : 'has'} {status === 'Processing' ? 'being' : status === 'Cancelled' ? 'been' : 'been'} <span className="font-semibold text-[#003399]">{status === 'Processing' ? 'Processing' : status === 'Cancelled' ? 'Cancelled' : 'Completed'}</span></h1>
          </div>
        </div>
        {status === 'Processing' && (
          <div className="flex items-center gap-5">
            <p className='text-[#FF4D4F] mt-5 cursor-pointer' onClick={onCancel}>Cancel</p>
            <Button 
              type="primary" 
              className="text-white bg-[#003399]" 
              onClick={() => {
                const timeline = document.getElementById('order-timeline');
                if (timeline) {
                  timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Track Order
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4 border border-grey-200 rounded-md ">
        <div className="flex justify-between border-b border-grey-200 my-2">
          <div className="p-4">
            <h1 className="font-semibold text-2xl">Products</h1>
            <ul className="space-y-2 text-[#667085]">
              {products.map((product) => (
                <li key={product.name} className="flex items-center">
                  <span className="font-medium">
                    {product.name} x {product.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <h1 className="font-semibold text-2xl">Subtotal</h1>
            <ul className="space-y-2 text-[#667085]">
              {products.map((product) => (
                <li key={product.name} className="flex items-center">
                  <span className="font-medium">₦{product.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-6 space-y-2 border-b border-grey-200 my-2 p-4"
          style={{ color: ' rgba(102, 112, 133, 1)' }}
        >
          <div className=" flex justify-between">
            <div>
              <p>Subtotal</p>
              <p>Order Discount</p>
              <p>Delivery Fee</p>
            </div>
            <div>
              <p className="">₦{amount}</p>
              <p className="text-[#F04438]">₦{discount}</p>
              <p>{deliveryFee === 0 ? 'Free' : `₦${deliveryFee}`}</p>
            </div>
          </div>
        </div>

        <div
          className="mt-6  border-b border-grey-200 my-2 p-4"
          style={{ color: ' rgba(102, 112, 133, 1)' }}
        >
          <div className="flex justify-between mb-4 ">
            <h1 className="font-bold text-xl">Total</h1>
            <p className="font-bold text-xl">₦{amount + (deliveryFee || 0) - (discount || 0)}</p>
          </div>
          <div className=" flex md:flex-row flex-col justify-between md:mx-14">
            <div>
              <p className="font-bold mb-[-1px]">Order Number</p>
              <p className="">{orderNumber}</p>
            </div>
            <div>
              <p className="font-bold mb-[-1px]">Order Date</p>
              <p className="">{orderDate}</p>
            </div>
            <div>
              <p className="font-bold mb-[-1px]">Payment Status</p>
              <p className="">{paymentStatus}</p>
            </div>
            <div>
              <p className="font-bold mb-[-1px]">Payment Method</p>
              <p className="">{paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#F9F9F9] p-4 rounded-md">
            <h2 className="font-semibold text-2xl mb-4">Billing Address</h2>
            <div className="text-[#667085]">
              <p className="font-medium">John Doe</p>
              <p>13, Adeola Odeku Street, Victoria</p>
              <p>Island, Lagos, Nigeria</p>
            </div>
          </div>
          <div className="bg-[#F9F9F9] p-4 rounded-md">
            <h2 className="font-semibold text-2xl mb-4">Shipping Address</h2>
            <div className="text-[#667085]">
              <p className="font-medium">John Doe</p>
              <p>13, Adeola Odeku Street, Victoria</p>
              <p>Island, Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>

      <div id="order-timeline" className="mt-8 space-y-4 border border-grey-200 rounded-md p-6">
        <div className="">
          <h2 className="font-semibold text-2xl">Order Timeline</h2>
          <div className="">
            <p className="text-[#667085]">Delivery Time</p>
            <p className="font-semibold text-2xl">2 Hrs</p>
          </div>
        </div>

        <div className="relative">
          {[
            { title: 'Order Received', description: 'waiting for vendor to confirm your order', time: orderDate },
            { title: 'Preparing Your Order', description: 'Your order will be ready 2 hrs', time: orderDate },
            { title: 'Rider Accepted Order', description: 'Your order has been assigned to a rider.', time: orderDate },
            { title: 'Rider At The Vendor Order', description: 'Rider is waiting to pick up your order', time: orderDate },
            { title: 'Rider Picked Up Order', description: 'Your order is on its way', time: orderDate },
            { title: 'Order Arrived', description: 'Your driver is around to deliver your order.', time: orderDate },
            { title: 'Order Delivered', description: 'Your order has been delivered.', time: orderDate }
          ].map((step, index) => {
            let isCompleted = false;
            let isCancelled = false;

            if (status === 'Completed') {
              isCompleted = true;
            } else if (status === 'Cancelled') {
              isCancelled = index === 0;
              isCompleted = index === 0;
            } else if (status === 'Processing') {
              isCompleted = index === 0;
            }

            const iconColor = isCancelled ? '#F04438' : isCompleted ? '#003399' : '#D0D5DD';

            return (
              <div key={index} className="flex items-start mb-8 relative">
                <div className="flex items-center">
                  <div className={`rounded-full w-5 h-5 flex items-center justify-center z-10 bg-[${iconColor}]`}>
                    {isCancelled ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
                      </svg>
                    ) : isCompleted ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
                      </svg>
                    ) : null}
                  </div>
                  {index !== 6 && (
                    <div className={`h-14 w-0.5 absolute left-2.5 top-5 bg-[${iconColor}]`}></div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold text-base ${!isCompleted ? 'text-[#667085]' : ''}`}>{step.title}</h3>
                      <p className="text-[#667085] text-sm">{step.description}</p>
                    </div>
                    <span className="text-[#667085] text-sm">{step.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
