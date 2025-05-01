import {
  Button,
  Input,
  Table,
  Form,
  Typography,
  Space,
  message,
  Modal,
  Checkbox,
} from 'antd';
import {
  ArrowLeftOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Product {
  key: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  reorderLevel: number;
}

const sampleProducts: Product[] = [
  {
    key: '1',
    name: 'Premium Cement',
    description: '10kg Smooth',
    unitPrice: 25000,
    quantity: 11,
    reorderLevel: 10,
  },
  {
    key: '2',
    name: 'Premium Cement',
    description: '10kg Coarse',
    unitPrice: 25000,
    quantity: 15,
    reorderLevel: 10,
  },
];

export default function TriggerReorder() {
  const [form] = Form.useForm();
  const [products] = useState<Product[]>(sampleProducts);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    window.history.back();
  };

  const handleTriggerReorder = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select at least one product to reorder.');
      return;
    }

    confirm({
      title: 'Trigger Reorder',
      icon: <ExclamationCircleOutlined />,
      content:
        'Are you sure you want to trigger reorder for selected products? Procurement will be notified.',
      okText: 'Yes, trigger reorder',
      okButtonProps: {
        style: { backgroundColor: '#1890ff', borderColor: '#1890ff' },
      },
      cancelText: 'Cancel',
      onOk() {
        setLoading(true);
        setTimeout(() => {
          message.success('Reorder triggered successfully!');
          setLoading(false);
        }, 1000);
      },
    });
  };

  const columns = [
    {
      title: 'Product Name & Number',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: Product) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded" />
          <div>
            <Text strong>{record.name}</Text>
            <div className="text-gray-400 text-xs">{record.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number) => `₦ ${price.toLocaleString()}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty: number) => (
        <Text type={qty <= 10 ? 'danger' : undefined}>{qty} left</Text>
      ),
    },
    {
      title: 'Reorder Level',
      dataIndex: 'reorderLevel',
      key: 'reorderLevel',
    },
  ];

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
          />
          <Title level={4} className="!m-0 ml-2">
            Trigger Reorder
          </Title>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <Button onClick={handleCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            className="!bg-[#CF1322] w-full sm:w-auto"
            type="primary"
            htmlType="button"
            onClick={handleTriggerReorder}
            loading={loading}
          >
            Trigger Reorder
          </Button>
        </div>
      </div>

      <Text type="secondary" className="block mb-6">
        Select the products you want to reorder.
      </Text>

      {/* Search and Table */}
      <div className="border rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="font-medium text-base">Search Product(s)</h1>
          <Input
            placeholder="Input search text"
            prefix={<SearchOutlined />}
            className="w-full md:max-w-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>

        <Table
          rowSelection={rowSelection}
          dataSource={filteredProducts}
          columns={columns}
          pagination={false}
          rowKey="key"
          scroll={{ x: 'max-content' }} // makes table scrollable on small devices
        />
      </div>
    </div>
  );
}
