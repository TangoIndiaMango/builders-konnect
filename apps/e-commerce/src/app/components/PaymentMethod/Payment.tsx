import { Button, Card, Checkbox, Input, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import CartSummary from '../Checkout/CartSummary';
import { useCart } from '../../../store/cartStore';
import { useAtomValue } from 'jotai';
import {
  purchaseBreakdownAtom,
  fulfilmentTypeAtom,
} from '../../../store/purchaseBreakdown';

const CheckoutPaymentPage = () => {
  const [selected, setSelected] = useState('paystack');
  const [useDifferentPaymentMethod, setUseDifferentPaymentMethod] =
    useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const user = getAuthUser();
  const fulfilmentType = useAtomValue(fulfilmentTypeAtom);
  const {
    cart: cartItemsStore,
    isLoading,
    error,
    fetchCart,
    removeFromCart,
  } = useCart();
  console.log(cartItemsStore);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDeleteItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      message.success('Item removed from cart');
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(
        err?.response?.data?.message || 'Failed to remove item from cart'
      );
    }
  };

  const { shippingInfo } = useShippingInfo();
  console.log(shippingInfo);
  const purchaseBreakdown = useAtomValue(purchaseBreakdownAtom);

  const userInfo = [
    {
      label: 'Contact',
      value: user?.user?.email,
    },
    {
      label: 'Phone',
      value: user?.user?.name,
    },
  ];

  const addressInfo = [
    {
      label: 'Ship to',
      value: `${shippingInfo.addresses.shipping?.address}, ${shippingInfo.addresses.shipping?.city}, ${shippingInfo.addresses.shipping?.state}, ${shippingInfo.addresses.shipping?.country}`,
    },
    {
      label: 'Billing Address',
      value: `${shippingInfo.addresses.billing?.address}, ${shippingInfo.addresses.billing?.city}, ${shippingInfo.addresses.billing?.state}, ${shippingInfo.addresses.billing?.country}`,
    },
  ];

  const paymentMethod = [
    {
      label: 'Method',
      value:
        fulfilmentType === 'delivery'
          ? 'Standard ( Delivered within 3-5 working days)'
          : 'Pickup',
    },
  ];

  const details = [
    ...userInfo,
    ...(shippingInfo.addresses.shipping?.id ? addressInfo : []),
    ...paymentMethod,
  ];

  const { setStep } = useCheckout();

  function handleChange() {
    setUseDifferentPaymentMethod(!useDifferentPaymentMethod);
  }
  console.log(selected);
  const { initiatePayment, isLoading: isInitiatingPayment } = usePayment();
  const handlePayment = async (values) => {
    if (!selected) {
      message.error('Please select a payment method');
      return;
    }
    try {
      await initiatePayment({
        payload: {
          line_items: cartItemsStore.map((item) => item.id),
          discounts: [discountCode],
          fulfilment_type: fulfilmentType,
          shipping_address_id: shippingInfo.selectedShippingAddressId?.id || '',
          callback_url: `${frontendBaseUrl}/success`,
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
        {/* {user ? (
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
        )} */}

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

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
          <div
            onClick={() =>
              setStep(fulfilmentType === 'delivery' ? 'shipping' : 'checkout')
            }
            className="text-[#003399] flex items-center gap-2 text-sm cursor-pointer hover:text-[#003399] transition-colors hover:underline"
          >
            <LeftOutlined className="" /> Return to Information
          </div>
          <Button
            onClick={handlePayment}
            type="primary"
            className="rounded-md px-10 py-4 w-full sm:w-auto"
            loading={isInitiatingPayment}
          >
            Pay ₦{purchaseBreakdown?.data?.total.toLocaleString()}
          </Button>
        </div>
      </div>

      {/* Right side - Summary */}
      <CartSummary
        cartItemsStore={cartItemsStore}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
      />
    </div>
  );
};

export default CheckoutPaymentPage;
