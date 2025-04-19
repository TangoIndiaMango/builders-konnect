import { Button, Card, Input} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { details, paymentDetails, paymentOptions, shippingProducts, steps } from '../lib/Constants';
import CheckoutBreadcrumb from '../components/BreadCrumb';

const CheckoutPaymentPage = () => {
  const [selected, setSelected] = useState('paystack');
  const [discountCode, setDiscountCode] = useState('');

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex">
      <div className="w-full lg:w-[60%] bg-white px-4 lg:px-24 py-16">
        <h2 className="md:text-2xl text-lg font-medium text-[#1E1E1E] mb-8">
          Builder Konnect
        </h2>
        <div className="text-sm text-gray-600 mb-6 space-x-1">
          <CheckoutBreadcrumb steps={steps} activeStep="Payment" />
        </div>

        <Card className="mb-6 rounded-md border-[#A4A4A4]">
          {paymentDetails.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center justify-between text-sm gap-x-4 ${
                index !== paymentDetails.length - 1
                  ? 'py-3 border-b border-[#A4A4A4]'
                  : 'py-3 '
              }`}
            >
              <p className="text-[#4E4E4E] min-w-[70px]">{item.label}</p>
              <p className="text-[#1E1E1E]">{item.value}</p>
              <Link to="/checkout">
                <p className="text-[#3B43FF] border-b border-[#A4A4A4] cursor-pointer whitespace-nowrap">
                  Change
                </p>
              </Link>
            </div>
          ))}
        </Card>

        <div className="md:text-lg text-base font-medium mb-2">Payment</div>
        <p className="text-sm text-[#4E4E4E] mb-4">
          All transactions are secure and encrypted
        </p>

        <div className="flex flex-col gap-3">
          {paymentOptions.map((option) => (
            <div
              key={option.value}
              className={`w-full border p-3 rounded-md cursor-pointer flex justify-between items-center ${
                selected === option.value
                  ? 'border-blue-500'
                  : 'border-gray-200'
              }`}
              onClick={() => setSelected(option.value)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selected === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  }`}
                />
                <span className="text-sm text-[#1E1E1E]">{option.label}</span>
              </div>
              {option.image && (
                <div className="flex justify-end">
                  <img src={option.image} alt={option.label} className="h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link to="/shipping">
            <div className="text-[#003399] flex items-center gap-2 text-sm">
              <LeftOutlined className="mt-1" /> Return to Information
            </div>
                  </Link>
                  <Link to="/pay">       
          <Button type="primary" className="rounded-md px-10 py-4">
            Pay ₦3,900
          </Button>
                  </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-[#F9F9F9] px-4 lg:px-8 py-24">
        <div className="space-y-4 mb-6">
          {shippingProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between py-3 border-b last:border-none border-gray-200"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 object-cover border"
                />
                <div className="text-base">
                  <p className="text-[#4E4E4E]">{product.name}</p>
                </div>
              </div>
              <div className="font-medium text-[#4E4E4E]">{product.price}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-6 mb-6">
          <Input
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Gift Card or Discount Code"
          />
          <Button className="bg-[#A4A4A4] text-white font-bold py-5 rounded-md px-6">
            Apply
          </Button>
        </div>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-[#4E4E4E]">Subtotal</span>
            <span className=" text-base font-medium md:text-lg text-[#4E4E4E] ">
              ₦3,900
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#4E4E4E]">Shipping Address 1</span>
            <span className=" text-base  text-[#4E4E4E] ">₦1,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#4E4E4E]">Shipping Address 2</span>
            <span className=" text-base  text-[#4E4E4E] ">₦1,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#4E4E4E]">Total Shipping</span>
            <span className=" text-base  text-[#4E4E4E] ">₦2,000</span>
          </div>
          <div className="flex justify-between font-semibold pt-2">
            <span className="text-sm text-[#1E1E1E]">Total</span>
            <span className=" text-base font-medium md:text-lg text-[#4E4E4E] ">
              ₦5,900
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
