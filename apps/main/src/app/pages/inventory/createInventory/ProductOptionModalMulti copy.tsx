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

const cartesian = (arrays: any[][]) =>
  arrays.reduce(
    (a, b) =>
      a
        .map((x: any) => b.map((y: any) => x.concat([y])))
        .reduce((a: any, b: any) => a.concat(b), []),
    [[]]
  );

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
    // 1. Get all the keys and their values (preserve order, allow duplicates)
    const keys = Object.keys(values);
    const valueArrays = keys.map(k => {
      const val = values[k];
      if (Array.isArray(val)) {
        return val; // No Set, allow duplicates
      }
      if (typeof val === 'string') {
        return val.split(',').map(v => v.trim());
      }
      return [];
    });

    // 2. Find the max length among all columns
    const maxLength = Math.max(...valueArrays.map(arr => arr.length));

    // 3. Build each variant row-wise, filling missing with ''
    const combinations = Array.from({ length: maxLength }).map((_, idx) => {
      const variant = keys.reduce((acc, k, i) => ({
        ...acc,
        [k]: valueArrays[i][idx] ?? '', // Fill with empty string if missing
      }), {});
      return {
        ...variant,
        sku: generateSKU(),
        costPrice: '',
        sellingPrice: '',
        quantity: '',
        reorderQty: '',
        images: [],
      };
    });

    // 4. Update variants
    if (editingVariantIndex !== null) {
      const updatedVariants = [...variants];
      combinations.forEach((combo, index) => {
        if (updatedVariants[editingVariantIndex + index]) {
          updatedVariants[editingVariantIndex + index] = {
            ...updatedVariants[editingVariantIndex + index],
            ...combo,
          };
        }
      });
      setVariants(updatedVariants);
    } else {
      setVariants(combinations);
    }

    onSave(combinations);
    onCancel();
  };

  return (
    <Modal
      open={open}
      title={
        editingVariantIndex !== null
          ? 'Edit Product Variants'
          : 'Add Product Variants'
      }
      onCancel={() => {
        setEditingVariantIndex(null);
        onCancel();
      }}
      footer={null}
      width={600}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
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
                  required: true,
                  message: `Select or enter ${attr.attribute}`,
                },
              ]}
            >
              {attr.possible_values && attr.possible_values.length > 1 ? (
                <Select
                  mode="multiple"
                  options={attr.possible_values.map((v) => ({
                    value: v,
                    label: v,
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
                <Input
                  placeholder={`Enter ${attr.attribute} (comma separated for multiple)`}
                />
              )}
            </Form.Item>
          ))
        )}
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
