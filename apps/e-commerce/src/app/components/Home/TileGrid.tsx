import { Card, Rate } from 'antd';
import type { FC } from 'react';

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
  const originalPrice = item.price / (1 - item.discount / 100);
  
  return (
    <Card
      hoverable
      cover={
        <div className="relative pt-[100%]">
          <img
            alt={item.name}
            src={item.image}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      }
      className="h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="space-y-2">
        <h2 className="text-base font-medium text-gray-800 line-clamp-2 h-12">
          {item.name}
        </h2>

        <div className="space-y-1">
          <p className="text-red-500 font-bold text-lg">
            ₦ {item.price.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <p className="line-through text-gray-400 text-sm">
              ₦ {Math.round(originalPrice).toLocaleString()}
            </p>
            <p className="text-xs text-red-400">
              -{item.discount}% Off
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Rate
            disabled
            allowHalf
            defaultValue={item.rating}
            className="text-yellow-400 text-sm"
          />
          <p className="text-gray-500 text-xs">(567)</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{item.timeleft} items Left</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-red-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min((item.timeleft / 24) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TileCard;
