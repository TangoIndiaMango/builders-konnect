import { Card, Rate } from 'antd';
import type { FC } from 'react';


interface ProductCardProps {
  item: {
    id: number;
    image: string;
    name: string;
    price: number;
    discount: number;
    rating: number;
    icon?: string;
    category?: string;
  };
}


const ProductCards: FC<ProductCardProps> = ({ item }) => {
  return (
    <Card
      key={item.id}
      hoverable
      cover={
        <img
          alt={item.name}
          src={item.image}
          className="object-cover w-full h-48"
        />
      }
      className="border-none p-2 shadow-none"
      bodyStyle={{ padding: 2 }}
    >
      <div className="px-0 py-0">
        <h2 className="text-md font-medium text-gray-800 mb-1 truncate">
          {item.name}
        </h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-red-500 font-bold text-lg">
              ₦ {item.price.toLocaleString()}
            </p>
            {item.discount > 0 && (
              <div className="flex items-center gap-2">
                <p className="line-through text-[#00000040]">
                  ₦ {(item.price / (1 - item.discount / 100)).toLocaleString()}
                </p>
                <p className="text-xs text-red-400">-{item.discount}% Off</p>
              </div>
            )}
          </div>
          {item.icon && (
            <div className="flex float-end">
              <img src={item.icon} alt={item.name} width="48" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Rate
            disabled
            allowHalf
            defaultValue={item.rating}
            className="text-yellow-500 text-sm"
          />
          <p className="text-[#00000073] mt-3 text-xs">(567)</p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCards;
