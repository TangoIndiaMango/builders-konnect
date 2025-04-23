import React from 'react';

interface DisplayHeaderProps {
  title: string;
  description: string;
  actionButton?: React.ReactNode;
}
const DisplayHeader = ({
  title,
  description,
  actionButton,
}: DisplayHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="space-y-2">
        <h1 className="md:text-lg xl:text-xl">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {actionButton && <div className="justify-end ">{actionButton}</div>}
    </div>
  );
};

export default DisplayHeader;
