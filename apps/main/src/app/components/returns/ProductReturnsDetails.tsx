import { useState } from 'react';
import { Modal, Tag, Typography } from 'antd';

const productImages = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
];

const details = [
  { label: 'Product', value: "Sleek Sneakers'22" },
  { label: 'Store/Warehouse', value: 'Store 5' },
  { label: 'Amount', value: '₦32,000.00' },
  { label: 'Payment Method', value: 'Cash' },
  { label: 'Product ID', value: '34728042' },
  { label: 'Date Returned', value: 'April 29, 2024 12:00:21 PM' },
  { label: 'Date Bought', value: 'April 29, 2025 12:00:21 PM' },
  { label: 'Order ID', value: '7420 Sqm' },
  { label: 'Cashier', value: 'Ali Johnson' },
  { label: 'Discount', value: 'None' },
  { label: 'Reason for return', value: 'Damages through delivery' },
  { label: 'Status', value: <Tag>Processing</Tag> },
];

const ProductDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const handleImgClick = (src: string) => {
    setModalImg(src);
    setModalOpen(true);
  };

  return (
    <div className="p-5 space-y-5 bg-white">
      <Typography.Title level={5}>Return Details</Typography.Title>
      <div className="bg-[#F8F9FC] p-5 rounded">
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          {details.map((item, idx) => (
            <div key={idx} className="mb-2">
              <div className="text-sm text-gray-500">{item.label}</div>
              <div className="font-medium">{item.value}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-2 text-xs text-gray-400">Product Images</div>
          <div className="flex flex-wrap gap-3">
            {productImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Product ${idx + 1}`}
                className="object-cover h-20 transition border rounded cursor-pointer w-28 hover:shadow-lg"
                onClick={() => handleImgClick(src)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        style={{ padding: 0, textAlign: 'center' }}
      >
        <img
          src={modalImg}
          alt="Product Large"
          className="w-full h-auto rounded"
        />
      </Modal>
    </div>
  );
};

export default ProductDetails;
