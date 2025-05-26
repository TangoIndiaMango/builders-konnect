'use client';
import {
  ArrowLeftOutlined,
  ShopOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import { App, Button, Checkbox, Form, Input } from 'antd';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAddressManagement } from '../../../hooks/useAddress';
import { useCartDiscount } from '../../../hooks/useCartDiscount';
import { useCheckout } from '../../../hooks/useContext';
import { useFulfillment } from '../../../hooks/useFulfillment';
import { usePurchaseBreakdown } from '../../../hooks/usePurchaseBreakdown';
import { getAuthUser } from '../../../utils/auth';
import { steps } from '../../lib/Constants';
import CheckoutBreadcrumb from '../BreadCrumb';
import AddressComp from './AddressComp';
import CartSummary from './CartSummary';
import { useCart } from '../../../store/cartStore';
import CheckoutForm from './CheckoutForm';

function Index() {
  const user = getAuthUser();
  const { setStep } = useCheckout();
  const navigate = useNavigate();
  const location = useLocation();
  const { notification } = App.useApp();

  const {
    form,
    showModal,
    setShowModal,
    selectedShippingAddress,
    selectedBillingAddress,
    existingShippingAddress,
    existingBillingAddress,
    handleCreateAddress,
    handleAddressSelect,
    createAddress,
    isInitialized,
    isLoading: addressLoading,
  } = useAddressManagement(user);

  const { value, handleFulfilmentTypeChange } = useFulfillment(
    existingShippingAddress,
    existingBillingAddress
  );

  const { cart: cartItemsStore, fetchCart, isLoading } = useCart();

  const { discountCode, setDiscountCode } = useCartDiscount();

  const { handlePurchaseAmountBreakdown } = usePurchaseBreakdown();

  const handleNotSinedInAction = () => {
    navigate('/auth/login', {
      state: {
        from: location.pathname,
        message: 'Please login to continue with your checkout',
      },
    });
  };

  const handleNextStepAction = () => {
    if (value === 'delivery') {
      setStep('shipping');
    } else {
      setStep('paymentmethod');
    }
  };

  useEffect(() => {
    handlePurchaseAmountBreakdown(
      cartItemsStore,
      value,
      discountCode,
      selectedShippingAddress?.id || ''
    );
  }, [cartItemsStore, value, discountCode, selectedShippingAddress]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex bg-[#F9F9F9]  flex-col lg:flex-row min-h-screen space-y-5">
        <div className="w-full xl:w-[60%]  bg-white px-6 xl:px-24 py-16">
          <h2 className="md:text-2xl text-lg font-medium text-[#1E1E1E] space-y-5">
            Builder Konnect
          </h2>
          <div className="text-sm text-gray-600 mb-6 space-x-1">
            <CheckoutBreadcrumb steps={steps} activeStep="Information" />
          </div>

          <CheckoutForm
            form={form}
            value={value}
            user={user}
            handleCreateAddress={handleCreateAddress}
            existingShippingAddress={existingShippingAddress}
            existingBillingAddress={existingBillingAddress}
            createAddress={createAddress}
            handleAddressSelect={handleAddressSelect}
            showModal={showModal}
            setShowModal={setShowModal}
            selectedShippingAddress={selectedShippingAddress}
            selectedBillingAddress={selectedBillingAddress}
            handleNextStepAction={handleNextStepAction}
            handleFulfilmentTypeChange={handleFulfilmentTypeChange}
            isLoading={addressLoading}
            isInitialized={isInitialized}
          />
        </div>

        {/* Cart Items */}
        <CartSummary
          cartItemsStore={cartItemsStore}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
        />
      </div>
    </div>
  );
}

export default Index;
