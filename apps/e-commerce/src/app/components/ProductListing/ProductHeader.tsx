import { SetStateAction, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function ProductHeader() {
  const [sortOption, setSortOption] = useState('latest');
  const productCount = 391;

  const handleChange = (value: SetStateAction<string>) => {
    setSortOption(value);
  };

  return (
    <div className="w-full  rounded-md bg-[#003399] p-4 flex justify-between items-center">
      <div className="text-white hidden lg:flex items-center">
        <span className="text-3xl font-medium">{productCount}</span>
        <span className="text-xl ml-2">products found</span>
      </div>

      <div>
        <Select
          value={sortOption}
          onChange={handleChange}
          className="min-w-[200px] text-sm text-[#000000D9]"
        >
          <Option value="latest">Sort By latest</Option>
          <Option value="price-low">Sort By price: low to high</Option>
          <Option value="price-high">Sort By price: high to low</Option>
          <Option value="name-asc">Sort By name: A-Z</Option>
          <Option value="name-desc">Sort By name: Z-A</Option>
        </Select>
      </div>
    </div>
  );
}
