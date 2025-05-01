'use client';
import {useCheckout } from '../../hooks/useContext';
import CheckoutShippingPage from '../components/ShippingAddress/Shipping';
import CheckoutPaymentPage from '../components/PaymentMethod/Payment';
import PaymentPage from '../components/PaymentDetails/PaymentPage';
import Index from '../components/Checkout';

export default function CheckoutPage() {
  const { step } = useCheckout();  
    
  return (
    <div>
      {step === 'checkout' && (
       <Index/>
      )}
      {step === 'shipping' && <CheckoutShippingPage />}
      {step === 'paymentmethod' && <CheckoutPaymentPage />}
      {step === 'payment' && <PaymentPage />}
    </div>
  );
}
