import { Button, Card, Input, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CheckoutBreadcrumb from '../BreadCrumb';
import { details, shippingProducts, steps } from '../../lib/Constants';
import { useCheckout } from '../../../hooks/useContext';
import { useShippingInfo } from '../../../store/shippingInfo';
import { getAuthUser } from '../../../utils/auth';
import CartSummary from '../Checkout/CartSummary';
import { useCart } from '../../../store/cartStore';
const CheckoutShippingPage = () => {
  const [discountCode, setDiscountCode] = useState('');
  const { setStep } = useCheckout();
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
  ];

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

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col lg:flex-row">
      <div className="w-full xl:w-[60%] bg-white px-4 md:px-10 xl:px-24 py-8 md:py-12">
        <h2 className="text-lg md:text-2xl font-medium text-[#1E1E1E] mb-6 md:mb-8">
          Builder Konnect
        </h2>

        <div className="text-sm text-gray-600 mb-6 space-x-1">
          <CheckoutBreadcrumb
            steps={steps}
            activeStep="Shipping"
          />
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
            className="text-[#003399] flex items-center gap-2 text-sm cursor-pointer hover:text-[#003399] transition-colors hover:underline"
          >
            <LeftOutlined className="" /> Return to information
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

      <CartSummary
        cartItemsStore={cartItemsStore}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
      />
    </div>
  );
};

export default CheckoutShippingPage;
