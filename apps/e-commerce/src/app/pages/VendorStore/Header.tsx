import { SetStateAction, useState } from 'react';
import { Select } from 'antd';
import { Card } from 'antd';
import {
  StarFilled,
  StarTwoTone,
  ShoppingOutlined,
  ClockCircleOutlined,
  SmileOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Option } = Select;

export default function ProductHeader() {
  const [sortOption, setSortOption] = useState('latest');
  const productCount = 391;

  const handleChange = (value: SetStateAction<string>) => {
    setSortOption(value);
  };

  return (
    <div className="bg-[#FAFAFA] shadow-md w-full">
      <h1 className="text-sm cursor-pointer text-[#00000073] py-8">
        Home / <span className="text-[#000000D9]">Builder’s Hub</span>
      </h1>
      <div className="w-full  rounded-md bg-[#003399] p-6 flex justify-between items-center">
        <div>
          <h2 className="text-[#FFFFFF] font-medium text-base md:text-xl">
            Builder’s Hub
          </h2>
          <div className="text-white hidden  lg:flex items-center">
            <span className="text-3xl font-medium">{productCount}</span>
            <span className="text-xl ml-2">products found</span>
          </div>
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
      <div className="flex flex-wrap py-5 border-b border-[#1018280F] gap-4 w-full items-start">
        {/* Review Stars */}
        <div className="flex flex-col gap-4 min-w-[200px] flex-1">
          <div className="flex text-orange-500 text-lg">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarTwoTone twoToneColor="#f97316" />
          </div>
          <span className="text-sm text-gray-700">4.4 from 34 reviews</span>
        </div>

        {/* Successful Sales */}
        <Card
          className="bg-blue-50 border border-blue-200 rounded-md text-blue-900 flex-1 min-w-[200px] px-4 py-2 flex items-center gap-2"
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex items-center gap-2 px-2 py-1 w-full">
            <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-base">
              <ShoppingOutlined />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">833</div>
              <div className="text-xs text-gray-600 leading-tight">
                Successful Sales
              </div>
            </div>
          </div>
        </Card>

        {/* Selling Duration */}
        <Card
          className="bg-blue-50 border border-blue-200 rounded-md text-blue-900 flex-1 min-w-[200px] px-4 py-2 flex items-center gap-2"
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex items-center gap-2 px-2 py-1 w-full">
            <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-base">
              <ClockCircleOutlined />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">
                5 Months
              </div>
              <div className="text-xs text-gray-600 leading-tight">
                Selling on builder’s Konnect
              </div>
            </div>
          </div>
        </Card>

        {/* View Feedback */}
        <Card
          className="border border-blue-700 text-blue-700 hover:bg-blue-50 cursor-pointer flex-1 min-w-[200px] px-4 py-3 flex items-center gap-2"
          bodyStyle={{ padding: 0 }}
        >
          <Link to="/review">
          <div className="flex items-center gap-2 text-sm font-medium px-2 py-1 w-full">
            <SmileOutlined />
            View Feedback (4)
            <RightOutlined/>
          </div>
          </Link>
        </Card>
      </div>
    </div>
  );
}
