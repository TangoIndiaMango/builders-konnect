import { Product } from '@/app/lib/mockData';
import { ArrowLeftOutlined, BarcodeOutlined } from '@ant-design/icons';
import { Button, Select, Table, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

const sampleProduct: Product = {
  id: '1',
  name: 'Dangote Cement',
  weight: '50kg',
  key: '',
  image: '',
  variant: '',
  unitPrice: 0,
  quantity: 0,
  totalPrice: 0,
};

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
];

const CreateProductBySearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([sampleProduct]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = useNavigate(); // ✅

  const handleCancel = () => {
    window.history.back();
  };

  const handleSelect = (value: string) => {
    if (value === 'add-new') {
    navigate('/pos/inventory/add-product');
    } else {
      const found = products.find((p) => p.id === value);
      setSelectedProduct(found || null);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      <div className="mb-4">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
          />
          <Title level={4} className="!m-0">
            Add Product
          </Title>
        </div>
      </div>

      <Text type="secondary" className="block mb-6">
        Search products to add a product or scan product barcode to add product
      </Text>

      <div className="border rounded-lg p-4 mb-6">
        <div className="flex flex-col items-center justify-center mb-4 w-full">
          <h1 className="font-medium text-base mb-5">Search here to add product</h1>
          <Select
            showSearch
            placeholder="Search product by name or sku"
            className="w-full max-w-sm"
            optionFilterProp="label"
            onSearch={(value) => setSearchTerm(value)}
            onSelect={handleSelect}
            filterOption={(input, option) =>
              (option?.label as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={[
              {
                value: 'add-new',
                label:
                  'Can’t find the product you want to add? Click here to add new product',
                style: { fontWeight: 'bold', color: 'blue' },
              },
              ...products.map((product) => ({
                value: product.id,
                label: `${product.name} – ${product.weight}`,
              })),
            ]}
          />
        </div>

        {selectedProduct && (
          <Table
            dataSource={[selectedProduct]}
            columns={columns}
            pagination={false}
            rowKey="id"
          />
        )}
      </div>

      <div className="flex gap-3 cursor-pointer w-fit mx-auto px-4 items-center text-sm text-[#000000] py-2 bg-[#D9D9D9] rounded-md">
        <BarcodeOutlined />
        <p onClick={() => navigate('/pos/inventory/scan-product')}>Click here to scan product barcode to add product</p>
      </div>
    </div>
  );
};

export default CreateProductBySearch;
