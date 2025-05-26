import { useState } from 'react';
import { Modal, Tag, Typography } from 'antd';


type ReturnOrderData = {
  id?: string;
  product_name? : string;
  product_sku?: string;
  date_returned?: string;
  orderID?: string;
  total_amount_refunded?: string;
  customer_name?: string;
  customer_email?: string;
  status?: string;
  location_name?: string;
  discount?: string | null;
  payment_method?: { name: string; amount: string }[];
  date_bought?: string;
  cashier?: string;
  reason?: string;
  customer_phone?: string;
  orders_count?: number;
  customer_id?: string;
  product_id?: string;
};
// Helper functions
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

const formatCurrency = (amount: string) => `₦${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;




const ReturnOrderDetails = ({ returnOrderData,productImages }: { returnOrderData: ReturnOrderData,productImages:string[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const handleImgClick = (src: string) => {
    setModalImg(src);
    setModalOpen(true);
  };

  const details = [
    { label: 'Product', value: returnOrderData?.product_name },
    { label: 'SKU', value: returnOrderData?.product_sku || '-' },
    { label: 'Store/Warehouse', value: returnOrderData?.location_name || '-' },
    { label: 'Amount Refunded', value: returnOrderData?.total_amount_refunded ? formatCurrency(returnOrderData.total_amount_refunded) : '-' },
    { label: 'Payment Method', value: returnOrderData?.payment_method?.map(pm => `${pm.name} (${formatCurrency(pm.amount)})`).join(', ') || '-' },
    { label: 'Date Returned', value: returnOrderData?.date_returned ? formatDate(returnOrderData.date_returned) : '-' },
    { label: 'Date Bought', value: returnOrderData?.date_bought ? formatDate(returnOrderData.date_bought) : '-' },
    { label: 'Order ID', value: returnOrderData?.orderID || '-' },
    { label: 'Cashier', value: returnOrderData?.cashier || '-' },
    { label: 'Discount', value: returnOrderData?.discount ? formatCurrency(returnOrderData.discount) : 'None' },
    { label: 'Reason for return', value: returnOrderData?.reason || '-' },
    { label: 'Status', value: <Tag color={returnOrderData?.status === 'pending' ? 'orange' : 'green'} className='capitalize'>{returnOrderData?.status}</Tag> },
  ];

  return (
    <div className="p-5 space-y-5 bg-white">
      <Typography.Title level={5}>Return Details</Typography.Title>
      <div className="bg-[#F8F9FC] p-5 rounded">
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          {details.map((item, idx) => (
            <div key={idx} className="mb-2">
              <div className="text-sm text-gray-500">{item.label}</div>
              <div className="font-medium capitalize">{item.value}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-2 text-xs text-gray-400">Product Images</div>
          <div className="flex flex-wrap gap-3">
            {productImages && productImages.length > 0 && productImages[0] !== "" ? (
              productImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Product ${idx + 1}`}
                  className="object-cover h-20 transition border rounded cursor-pointer w-28 hover:shadow-lg"
                  onClick={() => handleImgClick(src)}
                />
              ))
            ) : (
              <div className="text-gray-500 italic">No product images available</div>
            )}
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

export default ReturnOrderDetails;
