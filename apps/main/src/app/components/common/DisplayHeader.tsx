import React from 'react';

interface DisplayHeaderProps {
  title: string;
  description: string;
  actionButton?: React.ReactNode;
  showProductCode?: boolean;
  productCode?: string;
}
const DisplayHeader = ({
  title,
  description,
  actionButton,
  showProductCode = false,
  productCode,
}: DisplayHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="space-y-2">
        {showProductCode ? <h1 className="md:text-lg xl:text-xl font-bold">{title}</h1> : <h1 className="md:text-lg xl:text-xl">{title}</h1>}
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <section className='space-y-2 justify-end'>
       {showProductCode && <p>Product Code:<span className="font-medium text-blue-500">{productCode}</span></p>}
        {actionButton && <div>{actionButton}</div>}
      </section>
     
    </div>
  );
};

export default DisplayHeader;
