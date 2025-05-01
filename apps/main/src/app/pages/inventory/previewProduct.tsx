import { useLocation, useNavigate } from 'react-router-dom';
import { Button,Typography, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

export default function ProductPreview() {
  const navigate = useNavigate();

  const handleContinueEditing = () => {
    navigate('/pos/inventory/add-product');
  };

 const handleAddProduct = () => {
  message.success('Product added successfully!');
  setTimeout(() => {
    navigate('/pos/inventory'); 
  }, 1000); 
};
    const handleCancel = () => {
      window.history.back();
    };
  const location = useLocation();
  const product = location.state;

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
          />
          <Title level={4} className="!m-0">
            Previw Product
          </Title>
        </div>
        <div className="flex justify-end gap-2 mt-4 sm:mt-6">
          <Button onClick={handleContinueEditing}> Continue Editing</Button>
          <Button type="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Product Image */}
        <div className="w-full">
          <img
            src={product.imageUrl}
            alt="Product"
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Right - Product Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-medium">
              {product.name}
              <span> {product.size}</span>
            </h1>
            <p className="text-blue-600 underline mt-3 text-base">
              Added by Builder's Hub Construction
            </p>
          </div>

          <div className="text-4xl font-bold text-gray-900">
            ₦ {product.sellingPrice}
          </div>
          <div>
            Size:
            <div className="border text-sm w-fit mt-3 border-[#003399] text-[#003399] px-3 py-2 rounded-sm">
              {product.size}
            </div>
          </div>
          <div className="mt-4 text-[#00000073] text-sm">
            <p> {product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
