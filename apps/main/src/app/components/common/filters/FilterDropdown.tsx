import { Button, Popover } from 'antd';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label?: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  const activeOption = options.find((opt) => opt.value === value);

  const content = (
    <div className="w-48 py-1">
      {options.map((option) => (
        <div
          key={option.value}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-50
            ${
              value === option.value
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700'
            }`}
          onClick={() => {
            onChange(option.value);
            setOpen(false);
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottom"
    >
      <button
        className={`
          flex items-center justify-between p-2
          bg-white border border-gray-200 rounded-sm
          min-w-[150px] hover:border-gray-300
          transition-colors duration-200 ${className}
        `}
      >
        <div className="flex flex-col items-start">
          {label && <span className="text-sm text-gray-500">{label}</span>}
          <span className="">{activeOption?.label}</span>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-200
            ${open ? 'transform rotate-180' : ''}`}
        />
      </button>
    </Popover>
  );
};

export default FilterDropdown;
