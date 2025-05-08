import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Empty, message, Modal, Table, Typography, Avatar } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateData, useFetchData } from '../../../hooks/useApis';
import { formatBalance } from '../../../utils/helper';
import { ProductSearch } from '../../components/sales/ProductSearch';
import { ProductType } from '../sales/types';

const { Title, Text } = Typography;
const { confirm } = Modal;

export default function TriggerReorder() {
  // const [form] = Form.useForm();
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reorderModalOpen, setReorderModalOpen] = useState(false);

  const products = useFetchData('merchants/inventory-products');
  const triggerReorder = useCreateData(
    `merchants/inventory-products/trigger-reorder`
  );

  const navigate = useNavigate();
  const handleTriggerReorder = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select at least one product to reorder.');
      return;
    }
    setReorderModalOpen(true);
  };

  const handleConfirm = () => {
    const formData = new FormData();
    selectedRowKeys.forEach((id) => {
      formData.append('ids[]', id.toString());
    });
    triggerReorder.mutate(formData, {
      onSuccess: () => {
        message.success('Reorder triggered successfully!');
      },
      onError: (error: any) => {
        message.error(error.message);
        setReorderModalOpen(false);
      },
      onSettled: () => {
        setReorderModalOpen(false);
      },
    });

  };

  const productData = products?.data?.data as ProductType[];

  const handleProductSelect = (product: ProductType) => {
    if (!selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns = [
    {
      title: 'Product Name & Number',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: ProductType) => (
        <div className="flex items-center gap-3">
          <Avatar
            shape="square"
            size={40}
            className="bg-gray-200"
            src={
              record?.primary_media_url ||
              'https://api.dicebear.com/7.x/miniavs/svg?seed=2'
            }
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">
              {record?.ean ? record.ean : record.SKU}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (_: string, record: ProductType) =>
        ` ${formatBalance(record?.retail_price)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: string, record: ProductType) => (
        <Text type={record.quantity <= 10 ? 'danger' : undefined}>
          {record.quantity} left
        </Text>
      ),
    },
    {
      title: 'Reorder Level',
      dataIndex: 'reorderLevel',
      key: 'reorderLevel',
      render: (_: string, record: ProductType) =>
        ` ${formatBalance(record?.retail_price)}`,
    },
  ];

  return (
    <div className="min-h-screen p-4 bg-white md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
          <Title level={4} className="!m-0 ml-2">
            Trigger Reorder
          </Title>
        </div>
        <div className="flex flex-col justify-end gap-2 sm:flex-row">
          <Button onClick={() => navigate(-1)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            className="!bg-[#CF1322] w-full sm:w-auto"
            type="primary"
            htmlType="button"
            onClick={handleTriggerReorder}
            loading={triggerReorder.isLoading}
          >
            Trigger Reorder
          </Button>
        </div>
      </div>

      <Text type="secondary" className="block mb-6">
        Select the products you want to reorder.
      </Text>

      {/* Search and Table */}
      <div className="p-4 space-y-4 border rounded-lg min-h-40">
        <div className="flex flex-wrap items-center justify-between w-full gap-5">
          <div>
            <h3 className="font-medium md:text-lg">Search Product</h3>
          </div>
          <div className="justify-end w-full md:w-1/2">
            <ProductSearch
              onSelect={handleProductSelect}
              data={productData}
              isLoading={products?.isLoading}
            />
          </div>
        </div>
        {selectedProducts.length > 0 ? (
          <Table
            rowKey="id"
            rowSelection={rowSelection as any}
            dataSource={selectedProducts}
            columns={columns}
            pagination={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Empty description="Search for products to trigger reorder" />
          </div>
        )}
      </div>

      <Modal
        open={reorderModalOpen}
        onCancel={() => setReorderModalOpen(false)}
        onOk={handleConfirm}
        centered
        width={400}
        title={
          <span>
            <ExclamationCircleOutlined className="mr-2 text-yellow-500" />
            Trigger Reorder
          </span>
        }
        okText="Yes, trigger reorder"
        cancelText="Cancel"
        confirmLoading={triggerReorder.isLoading}
        okButtonProps={{ style: { borderRadius: 0 } }}
      >
        Are you sure you want to trigger reorder for selected products? Procurement will be notified.
      </Modal>
    </div>
  );
}
