import { Card, Rate } from 'antd';
import type { FC } from 'react';
import {SimilarProductData } from '../../lib/Constants';

interface productCards {
  id: number;
  image: string;
  name: string;
  price: number;
  discount: number;
  rating: number;
}



const ProductCard: FC = () => {
  return (
    <div className="py-8">
      <h1 className="py-4 text-[#000000D9] font-medium text-lg md:text-2xl">Similar Products</h1>
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {SimilarProductData.map((item) => (
          <Card
            key={item.id}
            hoverable
            cover={
              <img
                alt={item.name}
                src={item.image}
                className="object-cover w-full"
              />
            }
            className="border-none p-2 shadow-none"
            style={{ padding: 2 }}
          >
            <div className="px-0 py-0">
              {' '}
              <h2 className="text-md font-medium text-gray-800 mb-1">
                {item.name}
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-red-500 font-bold text-lg">
                    ₦ {item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="line-through text-[#00000040]">₦ 23,803</p>
                    <p className="text-xs text-red-400">
                      -{item.discount}% Off
                    </p>
                  </div>
                </div>
                <div className="flex float-end">
                  <img src={item.icon} alt={item.name} width="48" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={item.rating}
                  className="text-yellow-500"
                />
                <p className="text-[#00000073] mt-3 text-xs">(567)</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
