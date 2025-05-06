import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

interface Option {
  label: string;
  value: string;
}

interface FilterCategory {
  label: string;
  key: string;
  options: Option[];
}

interface MultiOptionsFilterProps {
  items: FilterCategory[];
  onChange: (filterKey: string, value: string) => void;
  className?: string;
  label?: React.ReactNode;
}

const MultiOptionsFilter = ({
  items,
  onChange,
  className,
  label,
}: MultiOptionsFilterProps) => {
  const [open, setOpen] = useState(false);

  const menuItems = items.map((category) => ({
    key: category.key,
    label: category.label,
    children: category.options.map((option) => ({
      key: `${category.key}:${option.value}`,
      label: option.label,
    })),
  }));

  // Handle menu item click
  const handleMenuClick = (info: { key: string }) => {
    const [filterKey, value] = info.key.split(':');
    onChange(filterKey, value);
    setOpen(false);
  };

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleMenuClick,
      }}
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
      placement="bottom"
    >
      <button
        className={`
          flex items-center justify-between p-2
          bg-white border border-gray-200 rounded-sm
          md:min-w-[150px] hover:border-gray-300
          transition-colors duration-200 ${className}
        `}
      >
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{label}</span>
        </div>
        <DownOutlined
          size={20}
          className={`text-gray-400 transition-transform duration-200
            ${open ? 'transform rotate-180' : ''}`}
        />
      </button>
    </Dropdown>
  );
};

export default MultiOptionsFilter;
