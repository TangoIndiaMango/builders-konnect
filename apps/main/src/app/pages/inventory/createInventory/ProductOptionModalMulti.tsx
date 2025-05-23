import { Modal, Form, Select, Button, Input, message } from 'antd';
import React, { useEffect } from 'react';

type InventoryAttribute = {
  id: string;
  attribute: string;
  possible_values?: string[];
  category: string;
};

interface ProductOptionModalMultiProps {
  open: boolean;
  onCancel: () => void;
  onSave: (combinations: any[]) => void;
  variantAttributesData: InventoryAttribute[];
  variants: any[];
  setVariants: (variants: any[]) => void;
  selectedCategoryId: string;
  setIsColorModalVisible: (visible: boolean) => void;
  editingVariantIndex: number | null;
  setEditingVariantIndex: (index: number | null) => void;
}

const generateSKU = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `MD-${timestamp}-${random}`.toUpperCase();
};

const ProductOptionModalMulti = ({
  open,
  onCancel,
  onSave,
  variantAttributesData,
  variants,
  setVariants,
  selectedCategoryId,
  setIsColorModalVisible,
  editingVariantIndex,
  setEditingVariantIndex,
}: ProductOptionModalMultiProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (editingVariantIndex !== null && variants[editingVariantIndex]) {
        const currentVariant = variants[editingVariantIndex];
        const initialValues = {};
        variantAttributesData.forEach((attr) => {
          initialValues[attr.id] = currentVariant[attr.id];
        });
        form.setFieldsValue(initialValues);
      }
    }
  }, [open, form, editingVariantIndex, variants, variantAttributesData]);

  const handleFinish = (values: any) => {
    // Build a single variant as an array of { id, attribute, value }
    const variant = variantAttributesData.map((attr) => ({
      id: attr.id,
      attribute: attr.attribute,
      value: values[attr.id] ?? '',
    }));

    // Optionally, you can add SKU and other fields as a separate object:
    const variantWithMeta = {
      attributes: variant,
      sku: generateSKU(),
      costPrice: '',
      sellingPrice: '',
      quantity: '',
      reorderQty: '',
      images: [],
    };

    onSave([variantWithMeta]);
    onCancel();
  };

  return (
    <Modal
      open={open}
      title={
        editingVariantIndex !== null
          ? 'Edit Product Attributes'
          : 'Add Product Attributes'
      }
      onCancel={() => {
        setEditingVariantIndex(null);
        onCancel();
      }}
      footer={null}
      width={600}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="flex flex-col h-[500px]"
      >
        <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar">
          {!selectedCategoryId ? (
            <div className="p-4 text-center">
              <p className="mb-2 text-red-500">
                Please select a product category first.
              </p>
              <Button onClick={onCancel}>Close</Button>
            </div>
          ) : (
            variantAttributesData.map((attr) => (
              <Form.Item
                key={attr.id}
                label={attr.attribute}
                name={attr.id}
                rules={[
                  {
                    // required: true,
                    message: `Select or enter ${attr.attribute}`,
                  },
                ]}
              >
                {attr.possible_values && attr.possible_values.length > 1 ? (
                  <Select
                    // mode="multiple"
                    options={attr.possible_values.map((v) => ({
                      value: v,
                      label: v,
                      name: attr.attribute,
                    }))}
                    placeholder={`Select ${attr.attribute}`}
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
                  <Input placeholder={`Enter ${attr.attribute}`} />
                )}
              </Form.Item>
            ))
          )}
        </div>
        <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
          <Button
            onClick={() => {
              setEditingVariantIndex(null);
              onCancel();
            }}
          >
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

export default ProductOptionModalMulti;
