import { Input, InputNumber } from 'antd';

import { Select } from 'antd';

import { Form } from 'antd';
interface CreateStepTwoProps {
  measuringUnits: any[];
  handleMeasuringUnitChange: (value: string) => void;
}
const CreateStepTwo = ({
  measuringUnits,
  handleMeasuringUnitChange,
}: CreateStepTwoProps) => {
  return (
    <div>
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
            value ? `₦ ${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '₦'
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
            value ? `₦ ${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '₦'
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
