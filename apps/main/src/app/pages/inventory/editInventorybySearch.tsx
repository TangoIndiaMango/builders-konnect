import {
  Button,
  Input,
  Table,
  Form,
  Typography,
  Space,
  message,
  Avatar,
} from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductSearch } from '../../components/sales/ProductSearch';
import { useFetchData, usePutData } from '../../../hooks/useApis';
import { ProductType } from '../sales/types';
import { formatBalance } from '../../../utils/helper';

const { Title, Text } = Typography;

export default function EditInventoryPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<ProductType | null>(
    null
  );
  const products = useFetchData('merchants/inventory-products');
  const editInvetoryLevel = usePutData(
    `merchants/inventory-products/${selectedProducts?.id}/edit-quantity`
  );

  const handleSave = (values: any) => {
    console.log('Saved values:', values);
    const payload = {
      new_quantity: values.new_quantity,
      reorder_value: values.reorder_value,
    };
    editInvetoryLevel.mutate(payload, {
      onSuccess: () => {
        message.success('Inventory updated successfully!');
        form.resetFields();
        navigate(-1);
      },
      onError: (error: any) => {
        message.error(error.response.data.message);
      },
    });
  };

  const columns = [
    {
      title: 'Product Name & Number',
      dataIndex: 'name',
      key: 'name',
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
      key: 'unitPrice',
      render: (_: string, record: ProductType) =>
        ` ${formatBalance(record?.retail_price)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: string, record: ProductType) => (
        <Text type={record.quantity <= 10 ? 'danger' : undefined}>
          {record.quantity} left
        </Text>
      ),
    },
    {
      title: 'Reorder Level',
      dataIndex: 'reorderLevel',
      key: 'reorderLevel',
      render: (_: string, record: ProductType) =>
        ` ${formatBalance(record?.retail_price)}`,
    },
  ];
  const productData = products?.data?.data as ProductType[];

  const handleProductSelect = (product: ProductType) => {
    setSelectedProducts(product);
    form.setFieldsValue({
      current_stock: product?.quantity ?? 0,
    });
  };

  return (
    <div className="min-h-screen p-6 space-y-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
          <Title level={4} className="!m-0">
            Edit Inventory Level
          </Title>
        </div>
        <div className="flex justify-end gap-2 mt-4 sm:mt-6">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            form="inventoryForm"
            loading={editInvetoryLevel.isPending}
          >
            Save
          </Button>
        </div>
      </div>

      <Text type="secondary" className="block mb-6">
        Form pages are used to collect or verify information to users, and basic
        forms are common in scenarios where there are fewer data items.
      </Text>

      <div className="p-4 space-y-4 border rounded-lg min-h-40">
        <div className="flex flex-wrap items-center justify-between w-full gap-5">
          <div>
            <h3 className="font-medium md:text-lg">Search Product</h3>
          </div>
          <div className="justify-end w-full md:w-1/2">
            <ProductSearch
              onSelect={handleProductSelect}
              data={productData}
              isLoading={products?.isLoading}
            />
          </div>
        </div>
        {selectedProducts && (
          <Table
            dataSource={[selectedProducts]}
            columns={columns}
            pagination={false}
          />
        )}
      </div>

      <div className="p-6 border rounded-lg">
        <Title level={5}>Inventory Details</Title>
        <Form
          id="inventoryForm"
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Form.Item label="Current Stock Level" name="current_stock">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Added Stock Level"
              name="new_quantity"
              rules={[
                {
                  required: true,
                  message: 'Please input added stock level!',
                },
              ]}
            >
              <Input placeholder="Enter stock level" />
            </Form.Item>

            <Form.Item
              label="New Reorder level (optional)"
              name="reorder_value"
            >
              <Input placeholder="Enter reorder level" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
