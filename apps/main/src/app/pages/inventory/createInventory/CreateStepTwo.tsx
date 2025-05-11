import { Input, InputNumber } from 'antd';

import { Select } from 'antd';

import { Form } from 'antd';
import MultiVariants from '../components/MultiVariants';
import { ProductOptionModalProps } from './ProductOptionModal';
interface CreateStepTwoProps extends ProductOptionModalProps {
  measuringUnits: any[];
  handleMeasuringUnitChange: (value: string) => void;
  additionType: string; //multiple or single
  isEdit: boolean;
}
const CreateStepTwo = ({
  measuringUnits,
  handleMeasuringUnitChange,
  additionType,
  isEdit,
  isVariantModalVisible,
  setIsVariantModalVisible,
  variantAttributesData,
  setVariants,
  variants,
  selectedCategoryId,
  setIsColorModalVisible,
  editingVariantIndex,
  setEditingVariantIndex,
}: CreateStepTwoProps) => {
  return (
    <div>
      {additionType === 'single' ? (
        <>
          <Form.Item
            label="Unit Type"
            name="measurement_unit"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select
              placeholder="Select measuring unit"
              options={measuringUnits}
              onChange={handleMeasuringUnitChange}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Cost Price"
            name="unit_cost_price"
            rules={[{ required: true, message: 'Required' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              formatter={(value: any) =>
                value
                  ? `₦ ${value
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                  : '₦'
              }
            />
          </Form.Item>

          <Form.Item
            label="Selling Price"
            name="unit_retail_price"
            rules={[{ required: true, message: 'Required' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              formatter={(value: any) =>
                value
                  ? `₦ ${value
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                  : '₦'
              }
            />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Please enter the stock quantity',
              },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Reorder Level"
            name="reorder_value"
            rules={[
              {
                required: true,
                message: 'Please enter the reorder level',
              },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </>
      ) : (
        <div className="xl:w-[80vw] mx-auto w-full relative">
          <MultiVariants
            isVariantModalVisible={isVariantModalVisible}
            setIsVariantModalVisible={setIsVariantModalVisible}
            variantAttributesData={variantAttributesData}
            setVariants={setVariants}
            variants={variants}
            selectedCategoryId={selectedCategoryId}
            setIsColorModalVisible={setIsColorModalVisible}
            editingVariantIndex={editingVariantIndex}
            setEditingVariantIndex={setEditingVariantIndex}
          />
        </div>
      )}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Product Tags"
        name="tags"
        rules={[{ required: true, message: 'Please enter tags' }]}
      >
        <Input placeholder="e.g cement, building, bag" />
      </Form.Item>
    </div>
  );
};

export default CreateStepTwo;
