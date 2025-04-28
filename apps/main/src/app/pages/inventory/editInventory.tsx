import { Button, Input, Table, Form, Typography, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;

interface Product {
  key: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  reorderLevel: number;
}

const sampleProduct: Product = {
  key: '1',
  name: 'Premium Cement',
  description: '10 kg Coarse',
  unitPrice: 25000,
  quantity: 10,
  reorderLevel: 250000,
};

export default function EditInventoryById() {
  const [form] = Form.useForm();
  const [product] = useState<Product>(sampleProduct);

  const handleCancel = () => {
    window.history.back();
  };

  const handleSave = (values: any) => {
    console.log('Saved values:', values);
    message.success('Inventory updated successfully!');
  };

  const columns = [
    {
      title: 'Product Name & Number',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: Product) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded" />
          <div>
            <Text strong>{record.name}</Text>
            <div className="text-gray-400 text-xs">{record.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number) => `₦ ${price.toLocaleString()}`,
    },
    {
      title: 'Stock Level',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty: number) => (
        <Text type={qty <= 10 ? 'danger' : undefined}>{qty} left</Text>
      ),
    },
    {
      title: 'Reorder Level',
      dataIndex: 'reorderLevel',
      key: 'reorderLevel',
      render: (price: number) => `₦ ${price.toLocaleString()}`,
    },
  ];

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
          />
          <Title level={4} className="!m-0">
            Edit Inventory Level
          </Title>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </div>

      <Text type="secondary" className="block mb-6">
        Form pages are used to collect or verify information from users, and
        basic forms are common in scenarios where there are fewer data items.
      </Text>

      {/* Product Table */}
      <div className="border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-medium text-base">Product Inventory</h1>
        </div>
        <Table
          dataSource={[product]}
          columns={columns}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* Inventory Form */}
      <div className="border rounded-lg p-4 sm:p-6">
        <Title level={5}>Inventory Details</Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            currentStock: product.quantity,
            addedStock: '',
            newReorderLevel: '',
          }}
          onFinish={handleSave}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item label="Current Stock Level" name="currentStock">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Added Stock Level"
              name="addedStock"
              rules={[
                { required: true, message: 'Please input added stock level!' },
              ]}
            >
              <Input placeholder="Enter stock level" />
            </Form.Item>

            <Form.Item
              label="New Reorder level (optional)"
              name="newReorderLevel"
            >
              <Input placeholder="Enter reorder level" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
