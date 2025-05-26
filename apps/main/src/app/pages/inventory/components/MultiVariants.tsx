import {
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  EditOutlined,
  DollarOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import {
  Button,
  Image,
  Input,
  message,
  Modal,
  Space,
  Table,
  TableProps,
  Upload,
} from 'antd';
import { useState } from 'react';
import { beforeUpload, getBase64 } from '../../../../utils/helper';
import { DataType } from '../../../components/common/Table/Table';
import { ProductOptionModalProps } from '../createInventory/ProductOptionModal';
import ProductOptionModalMulti from '../createInventory/ProductOptionModalMulti';

const generateSKU = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `MD-${timestamp}-${random}`.toUpperCase();
};

const MultiVariants = ({
  variants,
  selectedCategoryId,
  setIsColorModalVisible,
  variantAttributesData,
  setVariants,
  editingVariantIndex,
  setEditingVariantIndex,
}: ProductOptionModalProps) => {
  // const [variants, setVariants] = useState([{ ...initialVariant }]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [imageModal, setImageModal] = useState({ open: false, rowIdx: null });
  const [imageList, setImageList] = useState({}); // { [variantKey]: [urls] }
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState([]);
  const [priceModal, setPriceModal] = useState({ open: false, value: '' });
  const [qtyModal, setQtyModal] = useState({ open: false, value: '' });
  const [tempImages, setTempImages] = useState<any[]>([]); // For modal editing
  const [multiOptionModalOpen, setMultiOptionModalOpen] = useState(false);

  // Handle input change for a specific row/column
  const handleInputChange = (value: string, rowIdx: number, key: string) => {
    console.log('Value', value);
    console.log('Row Index', rowIdx);
    console.log('Key', key);
    const newVariants = [...variants];
    console.log('Variants', newVariants);
    newVariants[rowIdx][key] = value;
    setVariants(newVariants);
  };

  const handleAttributeChange = (
    value: string,
    rowIdx: number,
    attrId: string
  ) => {
    const newVariants = [...variants];
    const attr = newVariants[rowIdx][0].attributes.find((a) => a.id === attrId);
    if (attr) attr.value = value;
    setVariants(newVariants);
  };

  // Add all variants (for now, just log them)
  const handleAddVariant = () => {
    // Filter out incomplete rows
    const validVariants = variants.filter(
      (v) => v[0] && v[0].size && v[0].finishType && v[0].color && v[0].sku
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

  const handleEditVariant = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning('Please select exactly one variant to edit.');
      return;
    }
    setEditingVariantIndex(selectedRowKeys[0]);
    setMultiOptionModalOpen(true);
  };

  // Save images to variant
  const handleSaveImages = () => {
    setVariants((prev: any) =>
      prev.map((variant: any, idx: number) =>
        idx === imageModal.rowIdx ? { ...variant, images: tempImages } : variant
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
  const handleImageUpload = async ({ file }) => {
    const url = await getBase64(file);
    setTempImages((prev: any) => [...prev, url]);
    return false; // Prevent upload
  };

  // Handle remove
  const handleImageRemove = (url) => {
    setTempImages((prev) => prev.filter((img) => img !== url));
  };

  // Price and Quantity Modals
  const handleBulkUpdate = (field, value) => {
    setVariants(
      variants.map((v, idx) =>
        selectedRowKeys.includes(idx)
          ? { ...v, [field]: value, attributes: [...v.attributes] }
          : v
      )
    );
  };

  const handleMultiOptionSave = (updatedVariant) => {
    if (editingVariantIndex !== null) {
      // Edit mode: replace the variant at the index
      setVariants(
        variants.map((v, idx) =>
          idx === editingVariantIndex ? updatedVariant[0] : v
        )
      );
    } else {
      // Add mode: append the new variant
      setVariants([...variants, updatedVariant[0]]);
    }
    setMultiOptionModalOpen(false);
    setEditingVariantIndex(null);
  };

  const handleDeleteVariants = () => {
    setVariants(variants.filter((_, idx) => !selectedRowKeys.includes(idx)));
    setSelectedRowKeys([]);
  };

  // Get attribute columns from the first variant. Just so columns are consistent
  const attributeColumns =
    variants[0]?.attributes?.map((attr) => ({
      key: attr.id,
      title: attr.attribute,
      dataIndex: attr.id,
      render: (_, record, rowIdx) => {
        const attrObj = record.attributes.find((a) => a.id === attr.id);
        return (
          <Input
            className="w-full"
            disabled
            value={attrObj?.value || ''}
            placeholder={`e.g. ${attr.value || ''}`}
          />
        );
      },
    })) || [];

  const metaColumns = [
    {
      title: 'Generated SKU',
      dataIndex: 'sku',
      render: (_, record) => <Input value={record.sku} readOnly />,
    },
    {
      title: 'Cost Price',
      dataIndex: 'costPrice',
      render: (_, record, rowIdx) => (
        <Input
          value={record.costPrice}
          onChange={(e) =>
            handleInputChange(e.target.value, rowIdx, 'costPrice')
          }
          placeholder="e.g. 25000"
        />
      ),
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      render: (_, record, rowIdx) => (
        <Input
          value={record.sellingPrice}
          onChange={(e) =>
            handleInputChange(e.target.value, rowIdx, 'sellingPrice')
          }
          placeholder="e.g. 25000"
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (_, record, rowIdx) => (
        <Input
          value={record.quantity}
          onChange={(e) =>
            handleInputChange(e.target.value, rowIdx, 'quantity')
          }
          placeholder="e.g. 100"
        />
      ),
    },
    {
      title: 'Reorder Quantity',
      dataIndex: 'reorderQty',
      render: (_, record, rowIdx) => (
        <Input
          value={record.reorderQty}
          onChange={(e) =>
            handleInputChange(e.target.value, rowIdx, 'reorderQty')
          }
          placeholder="e.g. 10"
        />
      ),
    },
    {
      title: 'Option Image',
      dataIndex: 'images',
      render: (_, record, rowIdx) => (
        <Button type="link" onClick={() => openImageModal(rowIdx)}>
          {(record.images || []).length > 0 ? 'View Images' : 'Add Image'}
        </Button>
      ),
    },
  ];

  const columns = [...attributeColumns, ...metaColumns];

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRowKeys(selectedRowKeys as any);
    },
    getCheckboxProps: (record: DataType) => ({
      id: record.id,
    }),
  };

  return (
    <div className="p-4 w-full mx-auto space-y-4">
      {/* Bulk Actions */}
      <div className=" flex flex-wrap gap-2">
        <Button type="primary" onClick={() => setMultiOptionModalOpen(true)}>
          Add Product Attributes
        </Button>

        <Button
          icon={<EditOutlined />}
          onClick={handleEditVariant}
          disabled={selectedRowKeys.length !== 1}
        >
          <span className="hidden md:inline">Edit variant</span>
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={handleDeleteVariants}
          disabled={selectedRowKeys.length === 0}
        >
          <span className="hidden md:inline">Delete variant</span>
        </Button>
        <Button
          icon={<DollarOutlined />}
          onClick={() => setPriceModal({ open: true, value: '' })}
          disabled={selectedRowKeys.length === 0}
        >
          <span className="hidden md:inline">Input price</span>
        </Button>
        <Button
          icon={<NumberOutlined />}
          onClick={() => setQtyModal({ open: true, value: '' })}
          disabled={selectedRowKeys.length === 0}
        >
          <span className="hidden md:inline">Input Quantity</span>
        </Button>
      </div>

      {/* Variants Table */}
      <Table
        rowSelection={rowSelection as any}
        columns={columns}
        dataSource={variants}
        pagination={false}
        scroll={{ x: 'max-content' }}
        rowKey={(_, idx: any) => idx}
        className="w-full !min-h-[200px]"
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
            <div
              key={url}
              style={{ position: 'relative', display: 'inline-block' }}
            >
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
            onChange={(e) =>
              setPriceModal({ ...priceModal, value: e.target.value })
            }
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
            onChange={(e) =>
              setQtyModal({ ...qtyModal, value: e.target.value })
            }
          />
        </div>
      </Modal>

      <ProductOptionModalMulti
        open={multiOptionModalOpen}
        onCancel={() => setMultiOptionModalOpen(false)}
        onSave={handleMultiOptionSave}
        variantAttributesData={variantAttributesData}
        variants={variants}
        setVariants={setVariants}
        selectedCategoryId={selectedCategoryId}
        setIsColorModalVisible={setIsColorModalVisible}
        editingVariantIndex={editingVariantIndex}
        setEditingVariantIndex={setEditingVariantIndex}
      />
    </div>
  );
};

export default MultiVariants;
