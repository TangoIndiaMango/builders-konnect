// components/discount/ProductSearchModal.tsx
import React from 'react';
import { Modal, Input, List, Checkbox, Avatar, Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useFetchData } from '../../../hooks/useApis';
import { ProductType } from '../../pages/sales/types';

interface ProductSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (ids: string[], products: ProductType[]) => void;
  selected: string[];
}

const ProductSearchModal: React.FC<ProductSearchModalProps> = ({
  open,
  onClose,
  onSelect,
  selected,
}) => {
  const products = useFetchData('merchants/inventory-products');
  const productData = (products?.data?.data as ProductType[]) || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [checked, setChecked] = useState<string[]>(selected);

  // Filter products by search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    return productData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.ean &&
          item.ean.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.SKU && item.SKU.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [productData, searchTerm]);

  // When modal opens, sync checked with selected
  useEffect(() => {
    setChecked(selected);
  }, [open, selected]);

  const handleClose = () => {
    setSearchTerm('');
    setChecked([]);
    onClose();
  };

  const handleSave = () => {
    const selectedProducts = productData.filter((item) =>
      checked.includes(item.id)
    );
    onSelect(checked, selectedProducts);
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={
        <div className="sticky bottom-0 z-10 flex justify-end gap-2 p-4 bg-white border-t">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      }
      title="Search Products"
      centered
      style={{ padding: 0 }}
      className=""
    >
      <Input.Search
        placeholder="Search by product name, category or code"
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="px-6 py-4 overflow-y-auto min-h-80 max-h-80">
        <List
          dataSource={filteredProducts}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                checked={checked.includes(item.id)}
                onChange={(e) => {
                  setChecked((val) =>
                    e.target.checked
                      ? [...val, item.id]
                      : val.filter((id) => id !== item.id)
                  );
                }}
              >
                <div className="flex items-center w-full gap-3 p-2">
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
                </div>
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

export default ProductSearchModal;
