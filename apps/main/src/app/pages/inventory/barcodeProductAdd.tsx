import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { message, Modal } from 'antd';

export default function ScanProductPage() {
  const navigate = useNavigate();
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleScan = (err: any, result: any) => {
    if (result?.text && result.text !== scannedCode) {
      setScannedCode(result.text);
      message.success(`Scanned barcode: ${result.text}`);
      navigate(`/product/${result.text}`);
    } else if (!result?.text) {
      setIsModalVisible(true);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddNewProduct = () => {
    navigate('/pos/inventory/add-product');
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center font-bold text-[#000000D9]">
          Scan Product
        </button>
        <CloseOutlined
          onClick={() => navigate(-1)}
          style={{ fontSize: 24, color: 'black' }}
        />
      </div>

      <p className="text-sm text-gray-500 mb-4">
        The quantity you put will affect only the selected product options
      </p>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-semibold text-[#101928]">Scanning Guide</h3>
        <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
          <li>Connect your barcode scanner to your device</li>
          <li>
            Using the barcode scanner, scan the product's barcode at the back or
            front of the product
          </li>
        </ol>
      </div>

      <div className="rounded overflow-hidden border border-gray-300 bg-black w-full max-w-3xl mx-auto mb-6">
        <BarcodeScannerComponent onUpdate={handleScan} />
      </div>

      <Modal
        title="Product Not Found"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <button
            key="cancel"
            onClick={handleModalCancel}
            className="ant-btn ant-btn-default"
          >
            <CloseOutlined className="mr-2" />
            Cancel
          </button>,
          <button
            key="add"
            onClick={handleAddNewProduct}
            className="ant-btn ant-btn-primary"
          >
            <PlusOutlined className="mr-2" />
            Add New Product
          </button>,
        ]}
      >
        <p>
          Could not find the product associated with this barcode. Would you
          like to add a new product?
        </p>
      </Modal>
    </div>
  );
}
