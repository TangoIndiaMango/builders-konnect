import React from 'react';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="py-24 w-full bg-[#003399]">
      <h1 className="text-lg md:text-2xl lg:text-4xl font-medium flex text-white items-center justify-center">
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;
