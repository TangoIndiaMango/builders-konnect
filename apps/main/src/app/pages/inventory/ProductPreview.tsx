import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Image,
  List,
  Typography,
  Upload,
  message,
  Table
} from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload/interface';

const { Title } = Typography;

interface Variant {
  name: string;
  price: string;
  stock: number;
  sku: string;
  size: string;
  finishType: string;
  color: string;
  shapeType: string;
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  costPrice?: string;
  stockQuantity?: number;
  size?: string;
  color?: string;
  finishType?: string;
  images: Array<{ url: string; thumbUrl: string }>;
  variants?: Variant[];
  imageUrl?: string; 
  
}

const ProductPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state as ProductData;

  const [selectedImages, setSelectedImages] = useState(product?.images || []);
  const [variants, setVariants] = useState(product?.variants || []);

  const handleContinueEditing = () => navigate('/pos/inventory/add-product');
  const handleAddProduct = () => {
    message.success('Product added successfully!');
    setTimeout(() => navigate('/pos/inventory'), 1000);
  };

  const handleCancel = () => window.history.back();

  const handleImageUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setSelectedImages((prev) => [...prev, { url: imageUrl, thumbUrl: imageUrl }]);
    };
    reader.readAsDataURL(file);
    return true;
  };

  if (!product) return <div>No product data available</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleCancel} />
          <Title level={4} className="!m-0">Preview Product</Title>
        </div>
        <div className="flex justify-end gap-2 mt-4 sm:mt-6">
          <Button onClick={handleContinueEditing}>Continue Editing</Button>
          <Button type="primary" onClick={handleAddProduct}>Add Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <img
            src={product.imageUrl || selectedImages[0]?.url}
            alt="Product"
            className="rounded-lg w-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <Title level={3}>{product.name}</Title>
          <div className="text-4xl font-bold text-gray-900">₦{parseFloat(product.price).toLocaleString()}</div>
          <Descriptions column={1} bordered size="small">
            {product.description && (
              <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
            )}
            {product.costPrice && (
              <Descriptions.Item label="Cost Price">₦{parseFloat(product.costPrice).toLocaleString()}</Descriptions.Item>
            )}
            {product.stockQuantity !== undefined && (
              <Descriptions.Item label="Stock Quantity">{product.stockQuantity}</Descriptions.Item>
            )}
            {product.size && <Descriptions.Item label="Size">{product.size}</Descriptions.Item>}
            {product.color && <Descriptions.Item label="Color">{product.color}</Descriptions.Item>}
            {product.finishType && <Descriptions.Item label="Finish Type">{product.finishType}</Descriptions.Item>}
          </Descriptions>
        </div>
      </div>

      <Divider orientation="left">Images</Divider>
      <Upload customRequest={({ file }) => handleImageUpload(file)} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={selectedImages}
        renderItem={(img) => (
          <List.Item>
            <Image src={img.url} alt="product" width={200} />
          </List.Item>
        )}
      />

      {variants.length > 0 && (
        <>
          <Divider orientation="left">Variants</Divider>
          <Table
            dataSource={variants}
            columns={[
              { title: 'Size', dataIndex: 'size' },
              { title: 'Finish Type', dataIndex: 'finishType' },
              { title: 'Shape Type', dataIndex: 'shapeType' },
              { title: 'Color', dataIndex: 'color' },
              {
                title: 'Action',
                key: 'action',
                render: (_, record, index) => (
                  <Button
                    type="link"
                    danger
                    onClick={() => {
                      const newVariants = [...variants];
                      newVariants.splice(index, 1);
                      setVariants(newVariants);
                    }}
                  >
                    Delete
                  </Button>
                ),
              },
            ]}
            pagination={false}
          />
        </>
      )}
    </div>
  );
};

export default ProductPreview;
