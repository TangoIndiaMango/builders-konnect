import { Input, Modal, Select } from 'antd';
import { Form } from 'antd';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';

type InventoryAttribute = {
  id: string;
  attribute: string;
  possible_values?: string[];
  category: string;
};

export interface ProductOptionModalProps {
  isVariantModalVisible: boolean;
  setIsVariantModalVisible: (value: boolean) => void;
  variantAttributesData: any[];
  setVariants: (value: any) => void;
  variants: any;
  selectedCategoryId: string;
  setIsColorModalVisible: (value: boolean) => void;
  editingVariantIndex: number | null;
  setEditingVariantIndex: (value: number | null) => void;
}
const ProductOptionModal = ({
  isVariantModalVisible,
  setIsVariantModalVisible,
  variantAttributesData,
  setVariants,
  variants,
  selectedCategoryId,
  setIsColorModalVisible,
  editingVariantIndex,
  setEditingVariantIndex,
}: ProductOptionModalProps) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if content is scrollable
  // useEffect(() => {
  //   const checkScrollable = () => {
  //     if (contentRef.current) {
  //       const { scrollHeight, clientHeight } = contentRef.current;
  //       setShowScrollIndicator(scrollHeight > clientHeight);
  //     }
  //   };

  //   checkScrollable();
  //   // Recheck on window resize
  //   window.addEventListener('resize', checkScrollable);
  //   return () => window.removeEventListener('resize', checkScrollable);
  // }, [variantAttributesData]); // Recheck when attributes data changes

  const placeholder = (attr: InventoryAttribute) => {
    if (attr.possible_values && attr.possible_values.length > 1) {
      return `Select ${attr.attribute}`
    }
    return `Enter ${attr.possible_values?.[0]}`
  }

  return (
    <Modal
      title={editingVariantIndex !== null ? "Edit Product Option" : "Add Product Option"}
      open={isVariantModalVisible}
      onCancel={() => {
        setVariants([])
        setIsVariantModalVisible(false)
        setEditingVariantIndex(null)
      }}
      footer={null}
      width={600}
      centered
    >
      <Form
        onFinish={(values) => {
          // Create a mapping of IDs to attribute names
          const labels =
            variantAttributesData?.reduce(
              (acc, attr) => ({
                ...acc,
                [attr.id]: attr.attribute,
              }),
              {}
            ) || {};

          if (editingVariantIndex !== null) {
            variants[editingVariantIndex] = {
              values: values,
              labels: labels,
            };
          } else {
          // Add new variant/attribute combination
          setVariants([
            ...variants,
            {
              values: values,
              labels: labels,
              },
            ]);
          }
          setIsVariantModalVisible(false);
          setEditingVariantIndex(null)
        }}
        layout="vertical"
        className="flex flex-col h-[500px]"
      >
        <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar">
          {!selectedCategoryId ? (
            <div className="p-4 text-center">
              <p className="mb-2 text-red-500">
                Please select a product category in the main form first.
              </p>
              <Button onClick={() => setIsVariantModalVisible(false)}>
                Close
              </Button>
            </div>
          ) : (
            variantAttributesData &&
            variantAttributesData.map((attr: InventoryAttribute) => (
              <Form.Item
                key={attr.id}
                label={attr.attribute}
                name={attr.id}
                rules={[{ required: false, message: 'Required' }]}
              >
                {attr.possible_values && attr.possible_values.length > 1 ? (
                  <Select
                    placeholder={`Select ${attr.attribute}`}
                    options={attr.possible_values.map((value) => ({
                      value,
                      label: value,
                    }))}
                    style={{ width: '100%' }}
                    dropdownRender={(menu) => (
                      <div>
                        {menu}
                        {attr.attribute.toLowerCase() === 'color' && (
                          <div className="p-2 border-t">
                            <Button
                              type="link"
                              className="w-full p-0 text-left"
                              onClick={() => setIsColorModalVisible(true)}
                            >
                              + Add Color
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  />
                ) : (
                  <Input placeholder={placeholder(attr)} />
                )}
              </Form.Item>
            ))
          )}
        </div>

        {/* {showScrollIndicator && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
            <DownOutlined className="text-2xl text-gray-400" />
          </div>
        )} */}

        <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
          <Button onClick={() => {
            setVariants([])
            setIsVariantModalVisible(false)
          }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductOptionModal;
