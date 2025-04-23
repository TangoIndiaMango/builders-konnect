// components/CheckoutBreadcrumb.tsx

'use client';

import { Breadcrumb } from 'antd';
import React from 'react';

interface CheckoutBreadcrumbProps {
  steps: string[];
  activeStep: string;
}

const CheckoutBreadcrumb: React.FC<CheckoutBreadcrumbProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <Breadcrumb separator=">" className="text-sm mb-6">
      {steps.map((step) => (
        <Breadcrumb.Item
          key={step}
          className={
            step === activeStep
              ? 'text-[#595AFF] font-medium'
              : 'text-[#4E4E4E]'
          }
        >
          {step}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CheckoutBreadcrumb;
