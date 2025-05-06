import { PaginatedTable } from '../common/Table/Table';
import { Avatar, Button, Input } from 'antd';
import { CloseOutlined, DeleteOutlined, XOutlined } from '@ant-design/icons';
import { DiscountType, ProductType } from '../../lib./../pages/sales/types';
import { formatBalance } from '../../../utils/helper';
import ActionIcon from '../common/ActionIcon';
import { DiscountIcon } from '../../lib/CustomIcon';
import DiscountModalAdd from './DiscountModalAdd';
import { useState, useMemo } from 'react';
import { useGetDiscounts } from '../../../service/discount/discountsFN';
import { useFetchData } from '../../../hooks/useApis';
import { DiscountMap } from '../../../hooks/useProductDiscount';

interface ProductTableProps {
  products: ProductType[];
  onQuantityChange: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
  handleApplyDiscount: (product: ProductType, discountId: string) => void;
  discountedPrices: DiscountMap;
  productDiscountData: DiscountType[];
  isLoading: boolean;
  selectedProductDiscount: string | null;
  setSelectedProductDiscount: (discount: string) => void;
  removeDiscount: (productId: string) => void;
}

export const ProductTable = ({
  products,
  onQuantityChange,
  onRemove,
  handleApplyDiscount,
  discountedPrices,
  productDiscountData,
  isLoading,
  selectedProductDiscount,
  setSelectedProductDiscount,
  removeDiscount,
}: ProductTableProps) => {
  // console.log(products);
  // const discounts = useFetchData(
  //   'merchants/discounts?paginate=0&category=products'
  // );
  // const discountData = discounts?.data?.data as DiscountType[];

  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  // const [newPrice, setNewPrice] = useState<number | null>(null);

  const [discountOptions, setDiscountOptions] = useState<any | null>(null);
  // const [discountedPrices, setDiscountedPrices] = useState<
  //   Record<string, number>
  // >({});

  const handleProductDiscountSelect = (value: string, option: any) => {
    setSelectedProductDiscount(value);
    setDiscountOptions(option);
  };

  // const handleApplyDiscount = () => {
  //   // Implementation for applying discount
  //   console.log(discountOptions);
  //   const discount = calculateDiscount(
  //     discountOptions?.discount?.type,
  //     discountOptions?.discount?.value,
  //     Number(selectedProduct?.retail_price)
  //   );
  //   const newPrice = Number(selectedProduct?.retail_price) - discount;
  //   setDiscountedPrices((prev) => ({
  //     ...prev,
  //     [String(selectedProduct?.id)]: newPrice,
  //   }));
  //   setShowDiscountModal(false);
  // };

  // const calculateDiscount = (type: string, discount: number, price: number) => {
  //   if (type === 'percentage') {
  //     return (discount / 100) * price;
  //   } else {
  //     return discount;
  //   }
  // };

  const columns = useMemo(
    () => [
      {
        title: 'Product Name & Number',
        dataIndex: 'name',
        render: (_: string, record: ProductType) => (
          <div className="flex items-center gap-3">
            <Avatar
              shape="square"
              size={40}
              className="bg-gray-200"
              src={
                record?.primary_media_url ||
                'https://api.dicebear.com/7.x/miniavs/svg?seed=2'
              }
            />
            <div>
              <div className="font-medium">{record.name}</div>
              <div className="text-sm text-gray-500">
                {record?.ean ? record.ean : record.SKU}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
        render: (_: any, record: ProductType) => (
          <span>{formatBalance(record.retail_price)}</span>
        ),
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (quantity: number, record: ProductType) => (
          <Input
            type="number"
            min={1}
            value={quantity || 1}
            onChange={(e) =>
              onQuantityChange(record.id, Number(e.target.value))
            }
            className="w-20"
          />
        ),
      },
      {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        render: (_: any, record: ProductType) => {
          const discountInfo = discountedPrices[record.id];
          return (
            <div className="flex items-center gap-2">
              <div>
                {discountInfo && (
                  <p className="text-sm text-gray-500">
                    {formatBalance(discountInfo.price * record.quantity)}
                  </p>
                )}
                <p className={discountInfo ? 'line-through' : ''}>
                  {formatBalance(Number(record.retail_price) * record.quantity)}
                </p>
              </div>

              {discountInfo && (
                <div>
                  <ActionIcon
                    variant="subtle"
                    icon={<CloseOutlined className="text-red-500" />}
                    onClick={() => {
                      removeDiscount(record.id);
                    }}
                  />
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: ProductType) => (
          <div className="flex items-center gap-2">
            <ActionIcon
              variant="light"
              icon={<DiscountIcon />}
              onClick={() => {
                setShowDiscountModal(true);
                setSelectedProduct(record);
              }}
            />
            <ActionIcon
              variant="subtle"
              icon={<DeleteOutlined />}
              className="text-red-500"
              onClick={() => {
                onRemove(record.id);
                delete discountedPrices[record.id];
              }}
            />
          </div>
        ),
      },
    ],
    [discountedPrices, onQuantityChange, onRemove, productDiscountData]
  );

  return (
    <>
      <PaginatedTable
        data={products as any}
        columns={columns as any}
        showPagination={false}
        showCheckbox={true}
        scroll={{ x: '1000px' }}
      />

      <DiscountModalAdd
        open={showDiscountModal && selectedProduct !== null}
        onClose={() => setShowDiscountModal(false)}
        onDiscountSelect={handleProductDiscountSelect}
        selectedDiscount={selectedProductDiscount}
        discountData={productDiscountData}
        isLoading={isLoading}
        handleApplyDiscount={() => {
          handleApplyDiscount(
            selectedProduct as ProductType,
            selectedProductDiscount as string
          );
          setShowDiscountModal(false);
        }}
      />
    </>
  );
};
