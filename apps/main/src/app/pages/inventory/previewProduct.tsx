import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  message,
  Modal,
  Row,
  Tag,
  Typography,
  Image,
} from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFetchSingleData } from '../../../hooks/useApis';
import { SingleProductResponse } from './types';
import { formatBalance } from '../../../utils/helper';

const { Title, Text, Paragraph } = Typography;

// Dummy variant data (if not present in API)
const dummyVariants = [
  {
    size: '50kg',
    finishType: 'Glossy',
    shapeType: 'Rectangular',
    color: 'Gray',
  },
  { size: '25kg', finishType: 'Matte', shapeType: 'Square', color: 'White' },
];

const getColorCode = (color: string) => {
  const colors: Record<string, string> = {
    white: '#ffffff',
    black: '#000000',
    pink: '#ff69b4',
    cream: '#fffdd0',
    grey: '#808080',
    gray: '#808080',
    brown: '#a52a2a',
  };
  return colors[color?.toLowerCase()] || '#d1d5db';
};

const ProductPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const productFromState = location.state;
  const idToUse = id ?? productFromState?.id;

  const { data: singleProduct } = useFetchSingleData(
    `merchants/inventory-products/${idToUse}`,
    !!idToUse
  );
  const product: any = singleProduct?.data || productFromState;

  // Media logic
  const mediaList: string[] = product?.media?.length
    ? product.media
    : product?.primary_media_url
    ? [product.primary_media_url]
    : [];

  const [previewImg, setPreviewImg] = useState(
    mediaList[0] ||
      `https://placehold.co/500x500/E6F7FF/black?text=${product.name
        ?.split(' ')
        .map((word) => word[0]?.toUpperCase())
        .join('')}`
  );
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  if (!product) {
    return <div>No product data available</div>;
  }

  const handleCancel = () => navigate(-1);
  const handleContinueEditing = () => {
    if (product?.id) {
      navigate(`/pos/inventory/edit-product/${product.id}`, {
        state: product,
      });
    }
  };

  const handleAddProduct = () => {
    setIsSuccessModalVisible(true);
  };

  const handlePreview = (img: string) => {
    if (mediaList?.length > 1) {
      setPreviewImg(img);
    }
  };

  return (
    <div className="" key="product-preview">
      {/* Header */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-5 p-5 bg-white">
        <div>
          <div className="flex items-center gap-3">
            <ArrowLeftOutlined onClick={() => navigate(-1)} />
            <Typography.Title level={4} className="!mb-0">
              Preview Product
            </Typography.Title>
          </div>
          <Typography.Text className="text-gray-500">
            Viewing product summary
          </Typography.Text>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleContinueEditing}>Continue Editing</Button>
          <Button type="primary" onClick={handleAddProduct}>
            Submit Product
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <div className="bg-white p-4 sm:p-6">
          <Row gutter={[32, 16]}>
            {/* Product Images */}
            <Col xs={24} lg={12}>
              <div className=" ">
                <Image
                  src={previewImg}
                  alt={product.name}
                  width="100%"
                  height={600}
                  style={{
                    objectFit: 'cover',
                    border: '1px',
                    background: '#f5f5f5',
                  }}
                  fallback="/placeholder.svg"
                  preview={false}
                />
              </div>
              {/* Thumbnails if multiple images */}
              {mediaList.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {mediaList.map((img, idx) => (
                    <Image
                      key={img + idx}
                      src={
                        img ||
                        `https://placehold.co/150x150/E6F7FF/black?text=${product.name
                          ?.split(' ')
                          .map((word) => word[0]?.toUpperCase())
                          .join('')}`
                      }
                      width={60}
                      height={60}
                      style={{
                        objectFit: 'cover',
                        border:
                          previewImg === img
                            ? '2px solid #003399'
                            : '1px solid #e5e7eb',
                        borderRadius: 4,
                        cursor: 'pointer',
                        background: '#f5f5f5',
                      }}
                      onClick={() => handlePreview(img)}
                      preview={false}
                    />
                  ))}
                </div>
              )}
            </Col>

            {/* Product Details */}
            <Col xs={24} lg={12}>
              <div>
                <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                  {product?.name}
                </Title>
                <Text className="text-blue-600">
                  <a href="#">Added by Builder's Hub Construction</a>
                </Text>
                <div className="mt-2 mb-2">
                  <Text strong>Product Code (SKU): </Text>
                  <Text>{product?.SKU || 'N/A'}</Text>
                </div>
                <Title level={3} style={{ margin: '16px 0' }}>
                  {formatBalance(product?.retail_price)}
                </Title>
                <div className="mb-4">
                  <Text type="secondary">Size:</Text>
                  <div className="border text-sm w-fit mt-1 border-[#003399] text-[#003399] px-3 py-2 rounded-sm">
                    {(dummyVariants[0] && dummyVariants[0].size) || 'N/A'}
                  </div>
                </div>
                <div className="mb-2">
                  <Text strong>Stock: </Text>
                  <Text>{product?.quantity ?? 0} in stock</Text>
                </div>
                <div className="mb-2">
                  <Text strong>Reorder Level: </Text>
                  <Text>{product?.reorder_value ?? 'N/A'}</Text>
                </div>
                <div className="mb-4">
                  <Text strong>Tags: </Text>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(typeof product.tags === 'string'
                      ? product.tags.split(',').filter((tag) => tag.trim())
                      : Array.isArray(product.tags)
                      ? product.tags
                      : []
                    ).map((tag: string, idx: number) => (
                      <Tag key={idx} color="blue">
                        {tag.trim()}
                      </Tag>
                    ))}
                  </div>
                </div>
                {/* Variants */}
                <div className="mt-4">
                  <Text strong>Product Variants:</Text>
                  <Card className="mt-2 p-0 overflow-x-auto">
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', minWidth: '400px' }}>
                        <thead>
                          <tr>
                            <th style={{ padding: '8px', textAlign: 'left' }}>
                              Size
                            </th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>
                              Finish
                            </th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>
                              Shape
                            </th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>
                              Color
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(product.variants && product.variants.length > 0
                            ? product.variants
                            : dummyVariants
                          ).map((variant: any, idx: number) => (
                            <tr key={idx}>
                              <td style={{ padding: '8px' }}>
                                {variant.size || '-'}
                              </td>
                              <td style={{ padding: '8px' }}>
                                {variant.finishType || '-'}
                              </td>
                              <td style={{ padding: '8px' }}>
                                {variant.shapeType || '-'}
                              </td>
                              <td style={{ padding: '8px' }}>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      borderRadius: '50%',
                                      backgroundColor: getColorCode(
                                        variant.color || ''
                                      ),
                                      marginRight: '8px',
                                      border: '1px solid #e5e7eb',
                                    }}
                                  />
                                  {variant.color || '-'}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>

                {/* Product Attributes */}
                <div className="mt-4">
                  <Text strong>Product Attributes:</Text>
                  <Card className="mt-2 p-0">
                    {product?.metadata?.attributes &&
                    Object.keys(product.metadata.attributes).length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        {Object.entries(product.metadata.attributes).map(
                          ([key, values]: [string, any]) => (
                            <div key={key}>
                              <Text strong className="block mb-1">
                                {key}
                              </Text>
                              <div className="flex flex-wrap gap-2">
                                {Array.isArray(values) && values.length > 0 ? (
                                  values.map((val: string, vIdx: number) => (
                                    <Tag key={vIdx} color="blue">
                                      {val}
                                    </Tag>
                                  ))
                                ) : typeof values === 'string' ? (
                                  <Tag color="blue">{values}</Tag>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="p-4 text-gray-400">
                        No attributes available
                      </div>
                    )}
                  </Card>
                </div>
                {/* Description */}
                <div className="mt-4">
                  <Text strong>Description:</Text>
                  <Paragraph style={{ fontSize: '14px', marginTop: '8px' }}>
                    {product.description}
                  </Paragraph>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* Success Modal (if needed) */}
      <Modal
        title="Product Successfully Added"
        open={isSuccessModalVisible}
        onOk={() => setIsSuccessModalVisible(false)}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setIsSuccessModalVisible(false)}
          >
            OK
          </Button>,
        ]}
      >
        <p className="text-sm text-[#000000D9]">
          A Product Code has been generated for this product.
        </p>
        <p className="font-bold text-sm mt-2 text-[#003399]">{product.SKU}</p>
      </Modal>
    </div>
  );
};

export default ProductPreview;
