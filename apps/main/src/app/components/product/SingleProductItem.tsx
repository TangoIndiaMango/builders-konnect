import { Avatar } from 'antd';
import React from 'react';
import { ProductType } from '../../pages/sales/types';
import { formatBalance } from '../../../utils/helper';
interface SingleProductItemProps {
  item: ProductType & { unit_retail_price?: number };
}
const SingleProductItem = ({ item }: SingleProductItemProps) => {

  return (
    <div className="flex items-center w-full gap-3">
      <Avatar
        shape="square"
        size={40}
        className="bg-gray-200"
        src={
          item?.primary_media_url ||
          'https://api.dicebear.com/7.x/miniavs/svg?seed=2'
        }
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium capitalize break-words line-clamp-2">
          {item?.name}
        </div>
        <div className="text-sm text-gray-500 capitalize">
          {item?.ean ? item.ean : item.SKU}
        </div>
      </div>
      <div className="font-semibold">
        {(formatBalance(item.retail_price ?? item?.unit_retail_price)).toLocaleString()}
      </div>
    </div>
  );
};

export default SingleProductItem;
