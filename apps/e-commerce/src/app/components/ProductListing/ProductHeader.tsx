import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface ProductHeaderProps {
  onSortChange: (sortOption: string) => void;
  productCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductHeader({ onSortChange, productCount, currentPage, totalPages, onPageChange }: ProductHeaderProps) {
  const handleChange = (value: string) => {
    onSortChange(value);
  };

  return (
    <div className="w-full  rounded-md bg-[#003399] p-4 flex justify-between items-center">
      <div className="text-white hidden lg:flex items-center">
        <span className="text-3xl font-medium">{productCount}</span>
        <div className="flex-1 flex items-center gap-4">
          <span className="text-sm"> products found</span>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <Select
          defaultValue="newest"
          onChange={handleChange}
          className="min-w-[200px] text-sm text-[#000000D9]"
        >
          <Option value="newest">Sort By Newest</Option>
          <Option value="date_descending">Sort By Date (Latest)</Option>
          <Option value="price_ascending">Sort By Price: Low to High</Option>
          <Option value="price_descending">Sort By Price: High to Low</Option>
          <Option value="popularity">Sort By Popularity</Option>
          <Option value="ratings">Sort By Ratings</Option>
        </Select>
      </div>
    </div>
  );
}
