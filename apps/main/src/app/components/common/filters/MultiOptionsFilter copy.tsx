import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { App, MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

interface Option {
  label: string;
  value: string;
  onClick?: () => void;
}

interface OptionsFilterProps {
  key: string;
  label: string;
  children: Option[];
  className?: string;
}

interface MultiOptionsFilterProps {
  items: MenuProps['items'];
  className?: string;
  label?: React.ReactNode;
}


const MultiOptionsFilter = ({
  items,
  className,
  label,
}: MultiOptionsFilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown menu={{ items }} trigger={['click']} open={open} onOpenChange={setOpen} placement="bottom">
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
