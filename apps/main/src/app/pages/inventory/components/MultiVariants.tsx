import {
  DeleteOutlined,
  EyeOutlined,
  PictureOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  Upload,
  message,
  Tag,
  Select
} from 'antd';
import { useState, useEffect } from 'react';
import { beforeUpload } from '../../../../utils/helper';
import EditVariantModal from './EditVariant';

const initialVariant = {
  size: '',
  finishType: '',
  color: '',
  sku: '',
  costPrice: '',
  sellingPrice: '',
  quantity: '',
  reorderQty: '',
  images: [],
};

const generateSKU = (size: string, finishType: string, color: string) =>
  `MD-${finishType?.slice(0, 2).toUpperCase()}-${size?.replace(/\s/g, '')}-${color?.slice(0, 2).toUpperCase()}-GL`;

const MultiVariants = () => {
  const [variants, setVariants] = useState([{ ...initialVariant }]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [imageModal, setImageModal] = useState({ open: false, rowIdx: null });
  const [imageList, setImageList] = useState({}); // { [variantKey]: [urls] }
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState([]);
  const [priceModal, setPriceModal] = useState({ open: false, value: '' });
  const [qtyModal, setQtyModal] = useState({ open: false, value: '' });
  const [tempImages, setTempImages] = useState<any[]>([]); // For modal editing
  const [editVariantModal, setEditVariantModal] = useState(false);

  // Handle input change for a specific row/column
  const handleInputChange = (value, rowIdx, key) => {
    const newVariants = [...variants];
    newVariants[rowIdx][key] = value;
    // Auto-generate SKU if relevant fields are filled
    if (['size', 'finishType', 'color'].includes(key)) {
      const { size, finishType, color } = newVariants[rowIdx];
      if (size && finishType && color) {
        newVariants[rowIdx].sku = generateSKU(size, finishType, color);
      }
    }
    setVariants(newVariants);
  };

  // Add a new empty row
  const handleAddMore = () => {
    setVariants([...variants, { ...initialVariant }]);
  };

  // Add all variants (for now, just log them)
  const handleAddVariant = () => {
    // Filter out incomplete rows
    const validVariants = variants.filter(
      v => v.size && v.finishType && v.color && v.sku
    );
    if (validVariants.length === 0) {
      message.warning('Please fill in at least one complete variant.');
      return;
    }
    console.log('Submitted Variants:', validVariants);
    console.log('Description:', desc);
    console.log('Tags:', tags);
    message.success('Variants submitted! Check console.');
    // Optionally, clear the table or keep the rows for further editing
  };

  // Open modal and load current images
  const openImageModal = (rowIdx) => {
    setTempImages(variants[rowIdx]?.images || []);
    setImageModal({ open: true, rowIdx });
  };

  const handleEditVariant = (values) => {
    setVariants(values);
    setEditVariantModal(false);
  };

  // Save images to variant
  const handleSaveImages = () => {
    setVariants((prev: any) =>
      prev.map((v, idx) =>
        idx === imageModal.rowIdx ? { ...v, images: tempImages } : v
      )
    );
    setImageModal({ open: false, rowIdx: null });
    setTempImages([]);
  };

  // Cancel image editing
  const handleCancelImages = () => {
    setImageModal({ open: false, rowIdx: null });
    setTempImages([]);
  };

  // Handle upload
  const handleImageUpload = ({ file }) => {
    const url = URL.createObjectURL(file);
    setTempImages((prev: any) => [...prev, url]);
    return false; // Prevent upload
  };

  // Handle remove
  const handleImageRemove = (url) => {
    setTempImages((prev) => prev.filter((img) => img !== url));
  };

  // Price and Quantity Modals
  const handleBulkUpdate = (field, value) => {
    setVariants((prev) =>
      prev.map((v, idx) =>
        selectedRowKeys.includes(idx) ? { ...v, [field]: value } : v
      )
    );
  };

  const columns = [
    {
      title: 'Size',
      dataIndex: 'size',
      render: (text, record, rowIdx) => (
        <Input
          value={text}
          onChange={e => handleInputChange(e.target.value, rowIdx, 'size')}
          placeholder="e.g. 10x10 cm"
        />
      ),
    },
    {
      title: 'Finish Type',
      dataIndex: 'finishType',
      render: (text, record, rowIdx) => (
        <Input
          value={text}
          onChange={e => handleInputChange(e.target.value, rowIdx, 'finishType')}
          placeholder="e.g. Matte"
        />
      ),
    },
    {
      title: 'Colour',
      dataIndex: 'color',
      render: (text, record, rowIdx) => (
        <Input
          value={text}
          onChange={e => handleInputChange(e.target.value, rowIdx, 'color')}
          placeholder="e.g. Pink"
        />
      ),
    },
    {
      title: 'Generated SKU',
      dataIndex: 'sku',
      render: (text) => (
        <Input value={text} readOnly />
      ),
    },
    {
      title: 'Cost Price',
      dataIndex: 'costPrice',
      render: (text, record, rowIdx) => (
        <Input
          value={text}
          onChange={e => handleInputChange(e.target.value, rowIdx, 'costPrice')}
          placeholder="e.g. 25000"
        />
      ),
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      render: (text, record, rowIdx) => (
        <Input
          value={text}
          onChange={e => handleInputChange(e.target.value, rowIdx, 'sellingPrice')}
          placeholder="e.g. 25000"
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (text, record, rowIdx) => (
        <Input
          value={text}
          onChange={e => handleInputChange(e.target.value, rowIdx, 'quantity')}
          placeholder="e.g. 100"
        />
      ),
    },
    {
      title: 'Reorder Quantity',
      dataIndex: 'reorderQty',
      render: (text, record, rowIdx) => (
        <Input
          value={text}
          onChange={e => handleInputChange(e.target.value, rowIdx, 'reorderQty')}
          placeholder="e.g. 10"
        />
      ),
    },
    {
      title: 'Option Image',
      dataIndex: 'images',
      render: (_, record, rowIdx) => (
        <Button
          type="link"
          onClick={() => openImageModal(rowIdx)}
        >
          {(variants[rowIdx]?.images || []).length > 0 ? 'View Images' : 'Add Image'}
        </Button>
      ),
    },
  ];

  // Add row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record, idx) => ({
      // You can disable selection for incomplete rows if you want
      disabled: !record.size || !record.finishType || !record.color,
    }),
  };

  return (
    <div className="p-4 w-full">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddVariant}>
          Add Variant
        </Button>
        <Button onClick={handleAddMore}>
          Add More
        </Button>
      </Space>

      {/* Bulk Actions */}
      <Space className="my-4">
        <Button
          onClick={() => setEditVariantModal(true)}
          disabled={selectedRowKeys.length === 0}
        >
          Edit variant
        </Button>
        <Button
          danger
          onClick={() => {
            setVariants((prev) =>
              prev.filter((_, idx) => !selectedRowKeys.includes(idx))
            );
            setSelectedRowKeys([]);
          }}
          disabled={selectedRowKeys.length === 0}
        >
          Delete variant
        </Button>
        <Button
          onClick={() => setPriceModal({ open: true, value: '' })}
          disabled={selectedRowKeys.length === 0}
        >
          Input price
        </Button>
        <Button
          onClick={() => setQtyModal({ open: true, value: '' })}
          disabled={selectedRowKeys.length === 0}
        >
          Input Quantity
        </Button>
      </Space>

      {/* Variants Table */}
      <Table
        rowSelection={rowSelection as any}
        columns={columns}
        dataSource={variants}
        pagination={false}
        scroll={{ x: true }}
        className='w-full'
      />


      {/* Option Image Modal */}
      <Modal
        open={imageModal.open}
        title="Manage Option Images"
        onCancel={handleCancelImages}
        footer={[
          <Button key="cancel" onClick={handleCancelImages}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveImages}>
            Save
          </Button>,
        ]}
        width={700}
        centered
      >
        <Upload
          beforeUpload={beforeUpload}
          showUploadList={false}
          accept="image/*"
          onChange={handleImageUpload}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        <div className="flex flex-wrap gap-2 mt-4">
          {tempImages.map((url) => (
            <div key={url} style={{ position: 'relative', display: 'inline-block' }}>
              <Image
                src={url}
                width={100}
                height={100}
                style={{ objectFit: 'cover', borderRadius: 8 }}
                preview={{ src: url, mask: <EyeOutlined /> }}
              />
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 2,
                  background: 'rgba(255,255,255,0.7)',
                }}
                onClick={() => handleImageRemove(url)}
              />
            </div>
          ))}
        </div>
      </Modal>

      {/* Price Modal */}
      <Modal
        open={priceModal.open}
        title="Input Price"
        onCancel={() => setPriceModal({ open: false, value: '' })}
        onOk={() => {
          handleBulkUpdate('costPrice', priceModal.value);
          setPriceModal({ open: false, value: '' });
        }}
        okText="Save"
        cancelText="Cancel"
        centered
      >
        <div>
          <div style={{ marginBottom: 8 }}>
            The price you put will affect only the selected product options
          </div>
          <Input
            prefix="₦"
            placeholder="Enter price"
            value={priceModal.value}
            onChange={e => setPriceModal({ ...priceModal, value: e.target.value })}
          />
        </div>
      </Modal>

      {/* Quantity Modal */}
      <Modal
        open={qtyModal.open}
        title="Input Quantity"
        onCancel={() => setQtyModal({ open: false, value: '' })}
        onOk={() => {
          handleBulkUpdate('quantity', qtyModal.value);
          setQtyModal({ open: false, value: '' });
        }}
        okText="Save"
        cancelText="Cancel"
        centered
      >
        <div>
          <div style={{ marginBottom: 8 }}>
            The quantity you put will affect only the selected product options
          </div>
          <Input
            placeholder="Enter quantity"
            value={qtyModal.value}
            onChange={e => setQtyModal({ ...qtyModal, value: e.target.value })}
          />
        </div>
      </Modal>


      <EditVariantModal
        open={editVariantModal}
        onCancel={() => setEditVariantModal(false)}
        onSave={handleEditVariant}
        initialValues={variants}
        options={columns}
      />
    </div>
  );
};

export default MultiVariants;