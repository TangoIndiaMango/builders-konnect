import { Button, Input, Table, Form, Typography, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useFetchData, usePutData } from '../../../hooks/useApis';

const { Title, Text } = Typography;

interface Product {
  id: string;
  name: string;
  description: string;
  cost_price: string; // API returns this as string
  quantity: number;
  reorder_value: number;
  product_type: string;
  category: string;
}

export default function EditInventoryById() {
  const [form] = Form.useForm();
  const location = useLocation();
  const productId = location.pathname.split('/').pop() || '';

  // Fetch product details
  const productQuery = useFetchData(
    productId ? `merchants/inventory-products/${productId}` : ''
  );

  // Extract product from the response
  const product = productQuery.data?.data;

  // Update inventory mutation
  const updateInventory = usePutData(productId ? `merchants/inventory-products/${productId}/edit-quantity` : '');

  const handleCancel = () => {
    window.history.back();
  };

  interface FormValues {
    currentStock: number;
    addedStock: number;
    newReorderLevel?: number;
  }

  const handleSave = async (values: FormValues) => {
    // Convert form values to numbers
    const addedStock = Number(values.addedStock);
    const newReorderLevel = values.newReorderLevel ? Number(values.newReorderLevel) : undefined;

    // Additional validation
    if (isNaN(addedStock) || addedStock <= 0) {
      message.error('Please enter a valid positive number for stock level');
      return;
    }

    if (newReorderLevel !== undefined && (isNaN(newReorderLevel) || newReorderLevel < 0)) {
      message.error('Please enter a valid non-negative number for reorder level');
      return;
    }
    if (!product) {
      message.error('Product not found');
      return;
    }

    try {
      const payload = {
        new_quantity: Number(values.addedStock) + Number(product.quantity),
        reorder_value: values.newReorderLevel ? Number(values.newReorderLevel) : product.reorder_value
      };

      await updateInventory.mutateAsync(payload);
      message.success('Inventory updated successfully!');
      form.resetFields(['addedStock', 'newReorderLevel']);
      productQuery.refetch();
    } catch (err) {
      console.error('Failed to update inventory:', err);
      message.error('Failed to update inventory');
    }
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
      dataIndex: 'cost_price',
      key: 'costPrice',
      render: (price: string) => price ? `₦ ${Number(price).toLocaleString()}` : '-',
    },
    {
      title: 'Stock Level',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty: number) => (
        qty ? <Text type={qty <= 10 ? 'danger' : undefined}>{qty} left</Text> : '-'
      ),
    },
    {
      title: 'Reorder Level',
      dataIndex: 'reorder_value',
      key: 'reorderValue',
      render: (value: number) => value ? value.toLocaleString() : '-',
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
        <div className="flex items-center gap-2">
          <Button onClick={handleCancel}>Cancel</Button>
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
          dataSource={product ? [product] : []}
          loading={productQuery.isLoading}
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
            addedStock: '',
            newReorderLevel: product?.reorder_value || '',
          }}
          onFinish={handleSave}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Form.Item label="Current Stock Level">
              <Input 
                value={product?.quantity ? product.quantity.toLocaleString() : '0'} 
                disabled 
                style={{ width: '100%' }} 
              />
            </Form.Item>

            <Form.Item
              label="Add Stock"
              name="addedStock"
              rules={[
                { required: true, message: 'Stock level is required' },
                { 
                  validator: async (_, value) => {
                    if (value && (isNaN(value) || value <= 0)) {
                      throw new Error('Please enter a positive number');
                    }
                  }
                }
              ]}
              validateTrigger={['onChange', 'onBlur']}
            >
              <Input 
                placeholder="Enter stock level" 
                type="number" 
                min={1}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="New Reorder level (optional)"
              name="newReorderLevel"
              rules={[
                { 
                  validator: async (_, value) => {
                    if (value && (isNaN(value) || value < 0)) {
                      throw new Error('Please enter a non-negative number');
                    }
                  }
                }
              ]}
              validateTrigger={['onChange', 'onBlur']}
            >
              <Input 
                placeholder="Enter reorder level" 
                type="number" 
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-2">
            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit"
                loading={updateInventory.isLoading}
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
