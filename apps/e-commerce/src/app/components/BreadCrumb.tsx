import { Breadcrumb } from 'antd';
import React from 'react';
import { useCheckout } from '../../hooks/useContext';

interface CheckoutBreadcrumbProps {
  steps: string[];
  activeStep: string;
}

const stepToPath = {
  'Cart': '/cart',
  'Information': '/checkout',
  'Shipping': '/shipping',
  'Payment': '/payment'
};

const CheckoutBreadcrumb: React.FC<CheckoutBreadcrumbProps> = ({
  steps,
  activeStep,
}) => {
  const { setStep } = useCheckout();

  const stepToCheckoutStep = {
    'Cart': 'checkout',
    'Information': 'checkout',
    'Shipping': 'shipping',
    'Payment': 'payment'
  } as const;

  const handleStepClick = (step: string) => {
    const currentIndex = steps.indexOf(activeStep);
    const clickedIndex = steps.indexOf(step);
    
    // Only allow navigation to current or previous steps
    if (clickedIndex <= currentIndex) {
      const mappedStep = stepToCheckoutStep[step as keyof typeof stepToCheckoutStep];
      if (mappedStep) {
        setStep(mappedStep);
      }
    }
  };

  return (
    <Breadcrumb separator=">" className="text-sm mb-6">
      {steps.map((step) => {
        const currentIndex = steps.indexOf(activeStep);
        const stepIndex = steps.indexOf(step);
        const isClickable = stepIndex <= currentIndex;

        return (
          <Breadcrumb.Item
            key={step}
            className={
              `${step === activeStep ? 'text-[#595AFF] font-medium' : 'text-[#4E4E4E]'} 
              ${isClickable ? 'cursor-pointer hover:text-[#595AFF]' : 'cursor-not-allowed opacity-60'}`
            }
            onClick={() => isClickable && handleStepClick(step)}
          >
            {step}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default CheckoutBreadcrumb;
