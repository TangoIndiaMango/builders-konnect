import { Card, Rate } from 'antd';
import type { FC } from 'react';
import { tileCards } from '../../lib/Constants';

interface tileCards {
  id: number;
  image: string;
  name: string;
  price: number;
  discount: number;
  rating: number;
  timeleft: number;
}

interface ProductCardProps {
  item: {
    id: number;
    image: string;
    name: string;
    price: number;
    discount: number;
    rating: number;
    icon: string;
    timeleft: number;
  };
}

const TileCard: FC<ProductCardProps> = ({ item }) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {tileCards.map((item) => (
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
            bodyStyle={{ padding: 2 }}
          >
            <div className="px-0 py-0">
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

              <div className="flex items-center justify-between mt-2">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={item.rating}
                  className="text-yellow-500"
                />
                <p className="text-[#00000073] text-xs">(567)</p>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-[#00000073] mb-1">
                  <span>{item.timeleft} items Left</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-[#F5222D] h-2 rounded"
                    style={{ width: `${item.timeleft}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TileCard;
