import { Button, Card, Checkbox, Input, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  loggedinpaymentOptions,
  paymentDetails,
  paymentOptions,
  shippingProducts,
  steps,
} from '../../lib/Constants';
import CheckoutBreadcrumb from '../BreadCrumb';
import { useCheckout } from '../../../hooks/useContext';
import { getAuthUser } from '../../../utils/auth';
import { useShippingInfo } from '../../../store/shippingInfo';
import PaymentOptionCard from './PaymentOptionCard';
import PaymentOptImage from './PaymentOptImage';
import { frontendBaseUrl } from '../../layouts/Applayout';
import { usePayment } from '../../../hooks/usePayment';

const CheckoutPaymentPage = () => {
  const [selected, setSelected] = useState('paystack');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [useOther, setUseOther] = useState(false);
  const [useDifferentPaymentMethod, setUseDifferentPaymentMethod] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const user = getAuthUser();

  const { shippingInfo } = useShippingInfo();
  console.log(shippingInfo);

  const details = [
    {
      label: 'Contact',
      value: user?.user?.email,
    },
    {
      label: 'Phone',
      value: user?.user?.name,
    },
    {
      label: 'Ship to',
      value: `${shippingInfo.addresses.shipping?.address}, ${shippingInfo.addresses.shipping?.city}, ${shippingInfo.addresses.shipping?.state}, ${shippingInfo.addresses.shipping?.country}`,
    },
    {
      label: 'Billing Address',
      value: `${shippingInfo.addresses.billing?.address}, ${shippingInfo.addresses.billing?.city}, ${shippingInfo.addresses.billing?.state}, ${shippingInfo.addresses.billing?.country}`,
    },
    {
      label: 'Method',
      value: 'Standard ( Delivered within 3-5 working days)',
    },
  ];

  const { setStep } = useCheckout();

  function handleChange() {
    setUseDifferentPaymentMethod(!useDifferentPaymentMethod);
  }

  const { initiatePayment, isLoading: isInitiatingPayment } = usePayment();
  const handlePayment = async (values) => {
    if (!selected) {
      message.error('Please select a payment method');
      return;
    }
    try {
      await initiatePayment({
        payload: {
          line_items: ['1'],
          discounts: ['1'],
          fulfilment_type: 'delivery',
          shipping_address_id: '1',
          callback_url: `${frontendBaseUrl}/auth/register-vendor`,
        },
        provider: selected as 'paystack' | 'stripe',
      });
    } catch (error: any) {
      message.error(error?.message || 'Failed to initiate payment');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="w-full xl:w-[60%] bg-white px-4 md:px-10 xl:px-24 py-10 xl:py-16">
        <h2 className="text-lg md:text-2xl font-medium text-[#1E1E1E] mb-6 md:mb-8">
          Builder Konnect
        </h2>

        <div className="text-sm text-gray-600 mb-6 space-x-1">
          <CheckoutBreadcrumb steps={steps} activeStep="Payment" />
        </div>

        <Card className="mb-6 rounded-md border-[#A4A4A4]">
          {details.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-wrap items-center justify-between text-sm gap-x-4 ${
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

        <div className="text-base md:text-lg font-medium mb-2">Payment</div>
        <p className="text-sm text-[#4E4E4E] mb-4">
          All transactions are secure and encrypted
        </p>
        {user ? (
          <div className="space-y-4">
            {loggedinpaymentOptions.map((method) => (
              <PaymentOptionCard
                key={method.id}
                method={method}
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            ))}

            <Checkbox
              checked={useOther}
              onChange={(e) => setUseOther(e.target.checked)}
              onClick={handleChange}
              className="text-black"
            >
              Use other payment methods
            </Checkbox>
            {useDifferentPaymentMethod && (
              <div className="flex flex-col gap-3">
                {paymentOptions.map((option) => (
                  <PaymentOptImage
                    key={option.value}
                    option={option}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {paymentOptions.map((option) => (
              <PaymentOptImage
                key={option.value}
                option={option}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
          <div
            onClick={() => setStep('shipping')}
            className="text-[#003399] flex items-center gap-2 text-sm"
          >
            <LeftOutlined className="mt-1" /> Return to Information
          </div>
          <Button
            onClick={handlePayment}
            type="primary"
            className="rounded-md px-10 py-4 w-full sm:w-auto"
          >
            Pay ₦3,900
          </Button>
        </div>
      </div>

      {/* Right side - Summary */}
      <div className="w-full xl:w-1/3 bg-[#F9F9F9] px-4 md:px-8 py-10 md:py-24">
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
              <div className="font-medium text-[#4E4E4E]">{product.price}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Gift Card or Discount Code"
            className="flex-1"
          />
          <Button className="bg-[#A4A4A4] text-white font-bold rounded-md px-6">
            Apply
          </Button>
        </div>

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-[#4E4E4E]">Subtotal</span>
            <span className="font-medium text-[#4E4E4E]">₦3,900</span>
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
            <span className="font-medium text-[#4E4E4E]">₦5,900</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
