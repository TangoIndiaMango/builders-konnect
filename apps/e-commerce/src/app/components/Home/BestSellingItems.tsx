import { Card } from 'antd';
import type { FC } from 'react';
import { tileCategories } from '../../lib/Constants';
import LargePromoTile from './image';

const { Meta } = Card;
const BestSellingItems: FC = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8 flex  items-center justify-between">
        <h2 className="md:text-3xl text-lg font-medium leading-[40px] text-[#000000D9] flex items-center">
          <span className="w-1.5 h-8 bg-red-600 mr-4 inline-block"></span>
          Best Selling Items
        </h2>
        <h4 className="text-[#FF4D4F] cursor-pointer font-medium">View All</h4>
      </div>
          <div>
              <LargePromoTile/>
    </div>
    </div>
  );
};

export default BestSellingItems