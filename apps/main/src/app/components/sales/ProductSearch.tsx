import { Input, AutoComplete, Avatar } from 'antd';
import { SearchOutlined, BarcodeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ProductType } from '../../lib./../pages/sales/types';

interface ProductSearchProps {
  onSelect: (product: any) => void;
  data: ProductType[];
  isLoading: boolean;
}

export const ProductSearch = ({
  onSelect,
  data,
  isLoading,
}: ProductSearchProps) => {
  // console.log(data);
  const [options, setOptions] = useState<any[]>([]);

  const handleSearch = (value: string) => {
    const filtered = data?.filter(
      (product) =>
        product.ean?.toLowerCase().includes(value?.toLowerCase()) ||
        product.name?.toLowerCase().includes(value?.toLowerCase()) ||
        product.SKU?.toLowerCase().includes(value?.toLowerCase())
    );

    const searchOptions = filtered.map((product) => ({
      label: (
        <div className="flex items-center w-full gap-3 p-2">
          <Avatar
            shape="square"
            size={40}
            className="bg-gray-200"
            src={
              product?.primary_media_url ||
              'https://api.dicebear.com/7.x/miniavs/svg?seed=2'
            }
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium capitalize break-words line-clamp-2">
              {product.name}
            </div>
            <div className="text-sm text-gray-500 capitalize">
              {product?.ean ? product.ean : product.SKU}
            </div>
          </div>
        </div>
      ),
      value: product.name,
      product: product,
      key: product.id,
    }));

    setOptions(searchOptions);
  };

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      onSelect={(_, option: any) => onSelect(option.product)}
      className="w-full"
    >
      <Input
        disabled={isLoading}
        size="large"
        placeholder="Search by product name, code etc."
        prefix={<SearchOutlined className="text-gray-400" />}
        suffix={
          <div className="pl-3 border-l">
            <BarcodeOutlined
              className="text-[#003399]"
              onClick={() => alert('Scanning barcode')}
            />
          </div>
        }
      />
    </AutoComplete>
  );
};
