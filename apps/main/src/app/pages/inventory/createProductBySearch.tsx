import { Product } from '../../../service/inventory/inventory.types';
import { useSearchProducts, useCreateProduct } from "../../../service/inventory/inventoryFN";
import { ArrowLeftOutlined, BarcodeOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Select, Form, Input, InputNumber, Upload, Typography, Modal, Spin, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import type { FormInstance } from 'antd/es/form';

const { Title, Text } = Typography;

interface ProductFormData {
  name: string;
  SKU: string;
  measurement_unit: string;
  images: { thumbUrl?: string; url?: string }[];
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  reorderLevel: number;
  description: string;
  tags: string;
  catalogue_id: string;
}

const CreateProductBySearch = () => {
  const [form] = Form.useForm<ProductFormData>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: searchResults, isLoading: isSearching } = useSearchProducts({ q: searchQuery });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate: createProduct, isLoading: isCreating } = useCreateProduct();
  const [productCode, setProductCode] = useState('');
  const [formData, setFormData] = useState<ProductFormData | null>(null);

  const navigate = useNavigate();

  const handleCancel = () => {
    window.history.back();
  };

  const handleSelect = (value: string) => {
    if (value === 'add-new') {
      navigate('/pos/inventory/add-product');
    } else {
      const found = searchResults?.data?.find((p) => p.id.toString() === value);
      if (found) {
        setSelectedProduct(found);
        form.setFieldsValue({
          name: found.name,
          SKU: found.SKU || '',
          catalogue_id: found.identifier_no
        });
        // Set initial values for the form fields
        form.setFieldValue('name', found.name);
        form.setFieldValue('SKU', found.SKU || '');
      }
    }
  };

  const handleFinish = (values: ProductFormData) => {
    const productData = {
      product_creation_format: 'catalogue' as const,
      name: selectedProduct?.name || '',
      SKU: selectedProduct?.SKU || '',
      unit_cost_price: values.costPrice,
      unit_retail_price: values.sellingPrice,
      quantity: values.quantity,
      reorder_value: values.reorderLevel,
      description: values.description,
      tags: values.tags,
      size: values.measurement_unit,
      catalogue_id : selectedProduct?.identifier_no,

    };

    createProduct(productData, {
      onSuccess: (response: { code?: string }) => {
        const generatedCode = response?.code || Math.random().toString(36).substr(2, 9).toUpperCase();
        setProductCode(generatedCode);
        setFormData(values);
        setIsModalVisible(true);
      },
      onError: () => {
        message.error('Failed to create product. Please try again.');
      }
    });
  };
console.log("generatedCode", productCode)
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

  const handleImagePreview = (file: { thumbUrl?: string; url?: string }) => {
    const url = file?.thumbUrl || file?.url;
    if (url) {
      navigate('/pos/inventory/preview-page', {
        state: { imageUrl: url },
      });
    }
  };

  return (
    <div className="p-3 h-fit">
      <div className="bg-white p-3">
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
          {selectedProduct && (
            <div className="flex gap-2">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" onClick={() => form.submit()} loading={isCreating}>Submit</Button>
            </div>
          )}
        </div>
        <Text type="secondary" className="block mb-6">
          Search products to add a product or scan product barcode to add product
        </Text>
      </div>

      <div className="bg-white p-6 m-1">
        {!selectedProduct ? (
          <div>
            <div className="flex flex-col items-center justify-center mb-4 w-full">
              <h1 className="font-medium text-base mb-5">Search here to add product</h1>
              <Select
                showSearch
                placeholder="Search product by name or sku"
                className="w-full max-w-sm"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={(value: string) => setSearchQuery(value)}
                onSelect={handleSelect}
                loading={isSearching}
                options={[
                  {
                    value: 'add-new',
                    label: <div>
                      <Text onClick={() => navigate('/pos/inventory/add-product')} className='text-[12px]'>Can't find the product you want to add?  <span className="text-[#003399] cursor-pointer" >Request to add product</span></Text>
                    </div>
                  },
                  ...(searchResults?.data?.map((product) => ({
                    value: product.id.toString(),
                    label: `${product.name} - ${product.sku}`,
                  })) || [])
                ]}
              />
            </div>
           
            <div className="flex gap-3 cursor-pointer w-fit mx-auto px-4 items-center text-sm text-[#000000] py-2 bg-[#D9D9D9] rounded-md">
              <BarcodeOutlined />
              <p onClick={() => navigate('/pos/inventory/scan-product')}>Click here to scan product barcode to add product</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <Form
              form={form}
              layout="horizontal"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={handleFinish}
              className="w-full max-w-2xl"
            >
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the product name' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="SKU"
                name="SKU"
                rules={[{ required: true, message: 'Please enter the SKU' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Size"
                name="size"
                rules={[{ required: true, message: 'Please enter the size' }]}
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
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Selling Price"
                name="sellingPrice"
                rules={[
                  { required: true, message: 'Please enter the selling price' },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Stock Quantity"
                name="quantity"
                rules={[
                  { required: true, message: 'Please enter the stock quantity' },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Reorder Level"
                name="reorderLevel"
                rules={[
                  { required: true, message: 'Please enter the reorder level' },
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
            </Form>
          </div>
        )}
      </div>

  
      <Modal
        title="Product Successfully Added"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <div>
          <p className="text-sm text-[#000000D9]">
            A Product Code has been generated for this product.
          </p>
          <p className="font-bold text-sm mt-2 text-[#003399]">{productCode}</p>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProductBySearch;
