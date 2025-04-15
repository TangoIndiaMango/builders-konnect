'use client';

import { useRef } from 'react';
import { Rate } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ratingData, reviewImages } from '../../lib/Constants';

export default function CustomerReviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[35%]">
          <h2 className=" text-lg md:text-2xl font-medium text-[#000000D9] mb-4">
            Customer Reviews
          </h2>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-2">
              <Rate allowHalf defaultValue={3.9} disabled className="text-xl" />
            </div>
            <span className="text-sm text-[#000000D9] font-medium">
              3.9 out of 5
            </span>
          </div>

          <div className="space-y-3">
            {ratingData.map((rating) => (
              <div key={rating.stars} className="flex items-center">
                <span className="w-16 text-[#000000D9] text-sm">
                  {rating.stars} stars
                </span>
                <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span className="w-10 text-sm text-right">
                  {rating.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-[60%]">
          <h2 className="md:text-2xl text-[#000000D9] text-lg font-medium  mb-4">
            Reviews with images
          </h2>

          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Scroll left"
            >
              <LeftOutlined className="text-gray-600" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviewImages.map((src, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    src={src}
                    alt={`Customer review image ${index + 1}`}
                    className="w-60 h-60 object-cover cursor-pointer hover:opacity-90 transition-opacity rounded-md"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Scroll right"
            >
              <RightOutlined className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
