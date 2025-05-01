import { Button, Card, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CheckoutBreadcrumb from '../BreadCrumb';
import { details, shippingProducts, steps } from '../../lib/Constants';
import { useCheckout } from '../../../hooks/useContext';

const CheckoutShippingPage = () => {
  const [discountCode, setDiscountCode] = useState('');
   const { setStep } = useCheckout();

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col xl:flex-row">
      <div className="w-full xl:w-[60%] bg-white px-4 md:px-10 xl:px-24 py-8 md:py-12">
        <h2 className="text-lg md:text-2xl font-medium text-[#1E1E1E] mb-6 md:mb-8">
          Builder Konnect
        </h2>

        <div className="text-sm text-gray-600 mb-6 space-x-1">
          <CheckoutBreadcrumb steps={steps} activeStep="Shipping" />
        </div>

        <Card className="mb-4 rounded-md border-[#A4A4A4]">
          {details.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2 sm:gap-x-4 ${
                index !== details.length - 1
                  ? 'py-3 border-b border-[#A4A4A4]'
                  : 'py-3'
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

        <div className="w-full border border-[#3B43FF] bg-[#E1E2FF] rounded-md px-3 py-3 text-sm text-[#4E4E4E] mb-6">
          Standard Delivery within 3-5 days
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div
            onClick={() => setStep('checkout')}
            className="text-[#3B43FF] flex items-center gap-2 text-sm"
          >
            <LeftOutlined className="mt-1" /> Return to information
          </div>

          <Button
            onClick={() => setStep('paymentmethod')}
            className="rounded-md w-full sm:w-auto"
            type="primary"
          >
            Continue to Payment
          </Button>
        </div>
      </div>

      <div className="w-full xl:w-1/3 bg-[#F9F9F9] px-4 md:px-8 py-10 md:py-16">
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
                <div className="text-sm md:text-base">
                  <p className="text-[#4E4E4E]">{product.name}</p>
                </div>
              </div>
              <div className="font-medium text-[#4E4E4E] text-sm md:text-base">
                {product.price}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
          <Input
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Gift Card or Discount Code"
          />
          <Button className="bg-[#A4A4A4] text-white font-bold py-2 sm:py-5 rounded-md px-4 sm:px-6 w-full sm:w-auto">
            Apply
          </Button>
        </div>

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-[#4E4E4E]">Subtotal</span>
            <span className="font-medium md:text-lg text-[#4E4E4E]">
              ₦3,900
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4E4E4E]">Shipping Address 1</span>
            <span className="text-[#4E4E4E]">₦1,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4E4E4E]">Shipping Address 2</span>
            <span className="text-[#4E4E4E]">₦1,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4E4E4E]">Total Shipping</span>
            <span className="text-[#4E4E4E]">₦2,000</span>
          </div>
          <div className="flex justify-between font-semibold pt-2">
            <span className="text-[#1E1E1E]">Total</span>
            <span className="font-medium md:text-lg text-[#4E4E4E]">
              ₦5,900
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShippingPage;
