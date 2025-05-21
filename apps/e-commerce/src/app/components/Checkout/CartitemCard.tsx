import React from 'react';
import { marble } from '../../lib/assets/images';
import { CartItem } from '../../../store/cartStore';
import { Image } from 'antd';

interface CartitemCardProps {
  product: CartItem;
}

const CartitemCard = ({ product }: CartitemCardProps) => {
  return (
    <div
      key={product.id}
      className="grid grid-cols-3 items-center py-3 border-b last:border-none border-gray-200 gap-4"
    >
      {/* Image column */}
      <div className="flex justify-center">
        <Image
          src={
            product?.metadata?.primary_media_url ??
            `https://placehold.co/60x60/E6F7FF/black?fontSize=10&text=${product?.product_name
              ?.charAt(0)
              ?.toUpperCase()}`
          }
          alt={product?.product_name}
          width={80}
          height={80}
          preview={false}
          className="rounded"
        />
      </div>

      {/* Name column */}
      <div className="flex flex-col justify-center">
        <p className="text-[#4E4E4E] capitalize font-medium">
          {product.product_name}
        </p>
        <p className="text-[#4E4E4E] text-sm">x {product.quantity}</p>
      </div>

      {/* Price column */}
      <div className="flex justify-end">
        <span className="font-medium text-[#4E4E4E]">
          ₦ {Number(product.price).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default CartitemCard;
