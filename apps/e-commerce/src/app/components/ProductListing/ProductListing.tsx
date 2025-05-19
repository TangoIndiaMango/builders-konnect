import { Card, Rate } from 'antd';
import defaultProductImage from '../../../assets/images/ceramic.png';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface ProductCardProps {
  item: Product;
}

const ProductCard: FC<ProductCardProps> = ({ item }) => {
  return (
    <Link to={`/product-details/${item.id}`} className="block">
      <Card
        key={item.id}
        hoverable
        cover={
          <img
            alt={item.name}
            src={item.images?.[0] || defaultProductImage}
            className="object-cover w-full h-64"
          />
        }
        className="border-none p-2 shadow-none hover:shadow-lg transition-shadow"
        style={{ padding: 2 }}
      >
        <div className="p-5">
          <h2 className="text-md font-medium text-gray-800 mb-1 line-clamp-2">
            {item.name}
          </h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-500 font-bold text-lg">
                ₦{item.discount
                  ? (item.price - (item.price * item.discount / 100)).toLocaleString()
                  : item.price.toLocaleString()}
              </p>
              {item.discount && (
                <div className="flex items-center gap-2">
                  <p className="line-through text-[#00000040]">₦{item.price.toLocaleString()}</p>
                  <p className="text-xs text-red-400">
                    -{item.discount}% Off
                  </p>
                </div>
              )}
            </div>
            {item.icon && (
              <div className="flex float-end">
                <img src={item.icon} alt={item.name} width="48" />
              </div>
            )}
          </div>
          {item.rating && (
            <div className="flex items-center justify-between">
              <Rate
                disabled
                allowHalf
                defaultValue={item.rating}
                className="text-yellow-500"
              />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
