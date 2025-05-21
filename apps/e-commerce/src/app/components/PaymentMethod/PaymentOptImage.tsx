import React from 'react';

interface PaymentOptImageProps {
  option: {
    value: string;
    label: string;
    image?: string;
  };
  selected: string;
  setSelected: (value: string) => void;
}

const PaymentOptImage = ({
  option,
  selected,
  setSelected,
}: PaymentOptImageProps) => {
  return (
    <div
      key={option.value}
      className={`w-full border p-3 rounded-md cursor-pointer flex justify-between items-center ${
        selected === option.value ? 'border-blue-500' : 'border-gray-200'
      }`}
      onClick={() => setSelected(option.value)}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            selected === option.value
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-400'
          }`}
        />
        <span className="text-sm text-[#1E1E1E]">{option.label}</span>
      </div>
      {option.image && (
        <div className="flex justify-end">
          <img src={option.image} alt={option.label} className="h-6" />
        </div>
      )}
    </div>
  );
};

export default PaymentOptImage;
