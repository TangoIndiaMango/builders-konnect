import { Divider, Input } from 'antd';
import { Search } from 'lucide-react';
import useDebounce from '../../../hooks/useDebounce';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchInput = ({
  placeholder = 'Search',
  value,
  onChange,
  className = '',
}: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 500);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (typeof onChange === 'function') {
        onChange(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <Input
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      suffix={
        <div className="flex items-center gap-1">
          <Divider type="vertical" className="!h-8" />
          <SearchOutlined size={18} className="text-gray-400" />
        </div>
      }
      className={`rounded-sm ${className}`}
    />
  );
};
