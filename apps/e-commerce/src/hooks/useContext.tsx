import { createContext, useContext, useState, ReactNode } from 'react';

type CheckoutContextType = {
  step: 'checkout' | 'shipping' | 'paymentmethod'| 'payment';
  setStep: (step: 'checkout' | 'shipping' |"paymentmethod"| 'payment') => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<
    'checkout' | 'shipping' | 'payment' | 'paymentmethod'
  >('checkout');

  return (
    <CheckoutContext.Provider value={{ step, setStep }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
