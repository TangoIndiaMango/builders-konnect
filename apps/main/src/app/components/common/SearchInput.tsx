import { Divider, Input } from 'antd';
import { Search } from 'lucide-react';
import useDebounce from '../../../hooks/useDebounce';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
}

export const SearchInput = ({
  placeholder = 'Search',
  onSearch,
  className = '',
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Effect to handle debounced search
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <Input
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      suffix={
        <div className="flex items-center gap-1">
          <Divider type="vertical" className="h-8" />
          <SearchOutlined size={18} className="text-gray-400" />
        </div>
      }
      className={`rounded-sm ${className}`}
    />
  );
};
