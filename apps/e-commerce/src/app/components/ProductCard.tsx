import React from 'react';
import { Card, Rate, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  imageUrl,
  onAddToCart,
}) => {
  return (
    <Card
      hoverable
      className="w-full max-w-[300px]"
      cover={
        <div className="relative pt-[100%]">
          <img
            src={imageUrl}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
              -{discount}% Off
            </div>
          )}
        </div>
      }
    >
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-bold text-red-500">₦{price.toLocaleString()}</span>
        {originalPrice && (
          <span className="text-sm text-gray-400 line-through">
            ₦{originalPrice.toLocaleString()}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Rate disabled defaultValue={rating} allowHalf />
        <span className="text-sm text-gray-500">({reviews})</span>
      </div>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        className="w-full bg-blue-500"
        onClick={onAddToCart}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
