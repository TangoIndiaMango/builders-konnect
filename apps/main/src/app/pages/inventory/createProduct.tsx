import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Typography,
  Modal,
} from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
interface ProductFormData {
  name: string;
  sku: string;
  size: string;
  color: string;
  images: any[]; // You can be more specific with Antd UploadFile[] if needed
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  reorderLevel: number;
  description: string;
  tags: string;
}


const CreateProduct = () => {
  const [form] = Form.useForm();
const [formData, setFormData] = useState<ProductFormData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productCode, setProductCode] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    window.history.back();
  };

  const handleFinish = (values) => {
    const generatedCode = Math.random().toString(36).substr(2, 9).toUpperCase();
    setProductCode(generatedCode);
    setFormData(values);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    if (formData) {
      navigate('/pos/inventory/product-preview', {
        state: {
          ...formData,
          productCode,
          imageUrl: formData?.images?.[0]?.thumbUrl || '',
        },
      });
    }
  };

  const handleImagePreview = (file) => {
    const url = file?.thumbUrl || file?.url;
    if (url) {
      navigate('/pos/inventory/preview-page', {
        state: { imageUrl: url },
      });
    }
  };

  return (
    <div className="px-10 pb-20 bg-white h-fit">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
          />
          <Title level={4} className="!m-0">
            Add Product
          </Title>
        </div>
        <div className="flex justify-end gap-2 mt-4 sm:mt-6">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Finish
          </Button>
        </div>
      </div>

      <Text type="secondary" className="block mb-6">
        Search products to add a product or scan product barcode to add product
      </Text>

      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: 'Please enter the SKU' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: 'Please enter the size' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: 'Please enter the color' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Images"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[
            { required: true, message: 'Please upload at least one image' },
          ]}
        >
          <Upload
            name="images"
            listType="picture"
            beforeUpload={() => false}
            onPreview={handleImagePreview}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Cost Price"
          name="costPrice"
          rules={[{ required: true, message: 'Please enter the cost price' }]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Selling Price"
          name="sellingPrice"
          rules={[
            { required: true, message: 'Please enter the selling price' },
          ]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Stock Quantity"
          name="quantity"
          rules={[
            { required: true, message: 'Please enter the stock quantity' },
          ]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Reorder Level"
          name="reorderLevel"
          rules={[
            { required: true, message: 'Please enter the reorder level' },
          ]}
        >
          <InputNumber min={0} className="w-full" />
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
      </Form>

      <Modal
        title="Product Successfully Added"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <p className="text-sm text-[#000000D9]">
          A Product Code has been generated for this product.
        </p>
        <p className="font-bold text-sm mt-2 text-[#003399]">{productCode}</p>
      </Modal>
    </div>
  );
};

export default CreateProduct;
