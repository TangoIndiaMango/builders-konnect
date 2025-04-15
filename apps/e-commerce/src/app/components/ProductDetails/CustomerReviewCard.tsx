'use client';

import { Avatar, Rate } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { floors } from '../../lib/assets/images';

export default function CustomerReviewCard() {
  return (
    <div className="flex flex-col md:flex-row md:gap-20 gap-10">
      {/* Write Review Section */}
      <div className="md:w-[35%] w-full">
        <h2 className="text-lg md:text-2xl font-medium text-[#000000D9] mb-4">
          Review This Product
        </h2>
        <p className="py-4 text-[#00000073] text-sm">
          Share Your Thoughts With Other Customers
        </p>
        <TextArea
          placeholder="Write Review"
          autoSize={{ minRows: 2, maxRows: 5 }}
          className="rounded-md"
          allowClear
        />
      </div>

      {/* Customer Reviews Section */}
      <div className="md:w-[60%] w-full">
        <h2 className="text-lg md:text-2xl font-medium text-[#000000D9] mb-4">
          Customer Reviews
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar size={48} />
            <p className="text-[#000000D9] text-sm mt-2">John Doe</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Rate allowHalf disabled defaultValue={4.5} />
            <p className="text-[#000000D9] text-sm mt-1">Beautiful Flooring</p>
          </div>
          <p className="text-[#00000073] text-sm">
            Bought this flooring last month and laid in my daughter's room.
            Beautiful product and easy to lay.
          </p>

          <div className="flex gap-4 flex-wrap">
            <img
              src={floors}
              alt="Review 1"
              className="w-28 h-36 object-cover rounded-md border"
            />
            <img
              src={floors}
              alt="Review 2"
              className="w-28 h-36 object-cover rounded-md border"
            />
          </div>

          <div className="flex items-center gap-2 pt-2 text-blue-600">
            <p className="mt-3 text-sm text-[#000000D9]">Helpful</p>
            <LikeOutlined className="cursor-pointer hover:text-blue-800" />
            <p className="mt-3 text-sm text-[#000000D9]">(0)</p>
            <DislikeOutlined className="cursor-pointer hover:text-blue-800" />
            <p className="mt-3 text-sm text-[#000000D9]">(0)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
