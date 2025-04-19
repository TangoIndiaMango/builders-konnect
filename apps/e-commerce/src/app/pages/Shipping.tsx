import { Button, Card, Input} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { details, shippingProducts, steps } from '../lib/Constants';
import CheckoutBreadcrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CheckoutShippingPage = () => {
  const [discountCode, setDiscountCode] = useState('');

  return (
    <div className="min-h-screen bg-[#F9F9F9]  flex">
      <div className="w-full lg:w-[60%]  bg-white px-4 lg:px-24 py-16">
        <h2 className="md:text-2xl text-lg font-medium text-[#1E1E1E] mb-8">
          Builder Konnect
        </h2>
        <div className="text-sm text-gray-600 mb-6 space-x-1">
          <CheckoutBreadcrumb steps={steps} activeStep="Shipping" />
        </div>
        <Card className="mb-4 rounded-md border-[#A4A4A4]">
          {details.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center justify-between text-sm gap-x-4 ${
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
        <div className="flex justify-between items-center">
          <Link to="/checkout">
            <div className="text-[#3B43FF] flex items-center gap-2 text-sm">
              <LeftOutlined className="mt-1" /> Return to information
            </div>
                  </Link>
                  <Link to="/payment">     
          <Button className="rounded-md" type="primary">
            Continue to Payment
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
            <span className=" text-base  text-[#4E4E4E] ">
              ₦1,000
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#4E4E4E]">Shipping Address 2</span>
            <span className=" text-base  text-[#4E4E4E] ">₦1000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#4E4E4E]">Total Shipping</span>
            <span className=" text-base  text-[#4E4E4E] ">₦2000</span>
          </div>
          <div className="flex justify-between font-semibold pt-2">
            <span className="text-sm text-[#1E1E1E]">Total </span>
            <span className=" text-base font-medium md:text-lg text-[#4E4E4E] ">
              ₦5,900
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShippingPage;
