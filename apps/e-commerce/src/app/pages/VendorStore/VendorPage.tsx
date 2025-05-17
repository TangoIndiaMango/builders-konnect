import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Spin,
  Select,
  Card,
  Collapse,
  Button,
  Space,
  Typography,
  Checkbox,
  Slider,
  Pagination,
} from 'antd';
import {
  StarFilled,
  StarTwoTone,
  ShoppingOutlined,
  ClockCircleOutlined,
  SmileOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { CollapseProps } from 'antd';
import {
  useGetMerchant,
  useGetCategorizations,
  useGetInventoryAttributes,
} from '../../../hooks/useApis';

import type { Product } from '../../types/product';
import ProductCard from '../../components/ProductListing/ProductListing';

const { Option } = Select;
const { Panel } = Collapse;
const { Title } = Typography;

const VendorShop = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeKeys, setActiveKeys] = useState<string[]>(['Categories']);
  const [filters, setFilters] = useState<{
    attributes: Record<string, string[]>;
    price: [number, number];
    sort_by: string | undefined;
    categoryIds: string[];
  }>({
    attributes: {},
    price: [0, 1000000],
    sort_by: undefined,
    categoryIds: [],
  });
  // Separate state for temporary filters
  const [tempFilters, setTempFilters] = useState(filters);
  console.log('tempFilters', tempFilters);
  // Fetch categories and attributes
  const { data: categoryData = [] } = useGetCategorizations('category');
  const { data: attributesData = [] } = useGetInventoryAttributes(
    tempFilters.categoryIds.length > 0
      ? tempFilters.categoryIds.join(',')
      : undefined
  );
  const attributes = attributesData || [];
  // console.log('Categories', categoryData);
  // console.log('attributesData', attributesData);

  // console.log('Merchant ID:', id);

  // First, let's organize the attributes by category
  const attributesByCategory = attributes.reduce(
    (acc: Record<string, typeof attributesData>, attr: any) => {
      if (!acc[attr.category]) {
        acc[attr.category] = [];
      }
      acc[attr.category].push(attr);
      return acc;
    },
    {} as Record<string, typeof attributesData>
  );

  // Fetch merchant and products with filters
  const { data, isLoading } = useGetMerchant(id || '', {
    sort_by: filters.sort_by,
    minPrice: filters.price[0],
    maxPrice: filters.price[1],
    page: currentPage,
    categoryId: filters.categoryIds.join(','),
    // Convert attributes to API format
    ...Object.entries(filters.attributes).reduce((acc, [key, values]) => {
      const filterKey = `filters[metadata][${key.toLowerCase()}]`;
      return {
        ...acc,
        [filterKey]: values,
      };
    }, {}),
  });

  // console.log('Merchant API Response:', {
  //   data,
  //   merchant: data?.data,
  //   isLoading,
  //   filters
  // });
  const merchant = data?.data;
  const productsData = data?.data?.products;
  const productsLoading = isLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Merchant not found</p>
      </div>
    );
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setTempFilters((prev) => ({
      ...prev,
      categoryIds: checked
        ? [...prev.categoryIds, categoryId]
        : prev.categoryIds.filter((id) => id !== categoryId),
    }));
  };

  const handleAttributeChange = (
    attributeKey: string,
    value: string,
    checked: boolean
  ) => {
    setTempFilters((prev) => {
      const newAttributes = { ...prev.attributes };
      const currentValues = newAttributes[attributeKey] || [];

      if (checked) {
        newAttributes[attributeKey] = [...currentValues, value];
      } else {
        newAttributes[attributeKey] = currentValues.filter((v) => v !== value);
        if (newAttributes[attributeKey].length === 0) {
          delete newAttributes[attributeKey];
        }
      }

      return {
        ...prev,
        attributes: newAttributes,
      };
    });
  };

  const handlePriceChange = (value: number[]) => {
    setTempFilters((prev) => ({
      ...prev,
      price: value as [number, number],
    }));
  };

  const handleApply = () => {
    setFilters(tempFilters);

    // To close the filter panel
    // setActiveKeys([]);
  };

  // Reset both temp and actual filters
  const handleReset = () => {
    const defaultFilters = {
      attributes: {},
      price: [0, 1000000],
      sort_by: undefined,
      categoryIds: [],
    };
    setTempFilters(defaultFilters as unknown as typeof tempFilters);
    setFilters(defaultFilters as unknown as typeof filters);
  };

  const customExpandIcon: CollapseProps['expandIcon'] = ({ isActive }) => (
    <span style={{ marginLeft: 'auto' }}>
      {isActive ? <FaChevronUp /> : <FaChevronDown />}
    </span>
  );

  return (
    <div className="min-h-screen p-6 bg-white">
      {/* Header Section */}
      <div className="bg-[#FAFAFA] shadow-md w-full">
        <h1 className="text-sm cursor-pointer text-[#00000073] py-8">
          Home / <span className="text-[#000000D9]">{merchant.name}</span>
        </h1>
        <div className="w-full rounded-md bg-[#003399] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-[#FFFFFF] font-medium text-base md:text-xl">
              {merchant.name}
            </h2>
            <div className="text-white hidden lg:flex items-center">
              <span className="text-3xl font-medium">
                {merchant.total_products}
              </span>
              <span className="text-xl ml-2">products found</span>
            </div>
          </div>

          <div>
            <Select
              value={filters.sort_by || 'latest'}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, sort_by: value }))
              }
              className="w-32"
            >
              <Option value="latest">Latest</Option>
              <Option value="oldest">Oldest</Option>
              <Option value="price_asc">Price Low-High</Option>
              <Option value="price_desc">Price High-Low</Option>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap py-5 border-b border-[#1018280F] gap-4 w-full items-start">
          <div className="flex flex-col gap-4 min-w-[200px] flex-1">
            <div className="flex text-orange-500 text-lg">
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarTwoTone twoToneColor="#f97316" />
            </div>
            <span className="text-sm text-gray-700">
              {merchant.ratings.toFixed(1)} from {merchant.total_reviews}{' '}
              reviews
            </span>
          </div>

          <Card
            className="bg-blue-50 border border-blue-200 rounded-md text-blue-900 flex-1 min-w-[200px] px-4 py-2 flex items-center gap-2"
            bodyStyle={{ padding: 0 }}
          >
            <div className="flex items-center gap-2 px-2 py-1 w-full">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-base">
                <ShoppingOutlined />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">
                  {merchant.successful_sales}
                </div>
                <div className="text-xs text-gray-600 leading-tight">
                  Successful Sales
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="bg-blue-50 border border-blue-200 rounded-md text-blue-900 flex-1 min-w-[200px] px-4 py-2 flex items-center gap-2"
            bodyStyle={{ padding: 0 }}
          >
            <div className="flex items-center gap-2 px-2 py-1 w-full">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-base">
                <ClockCircleOutlined />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">
                  {merchant.sales_duration}
                </div>
                <div className="text-xs text-gray-600 leading-tight">
                  Selling on Builder's Connect
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="border border-blue-700 text-blue-700 hover:bg-blue-50 cursor-pointer flex-1 min-w-[200px] px-4 py-3 flex items-center gap-2"
            bodyStyle={{ padding: 0 }}
          >
            <Link to="/review">
              <div className="flex items-center gap-2 text-sm font-medium px-2 py-1 w-full">
                <SmileOutlined />
                View Feedback ({merchant.total_reviews})
                <RightOutlined />
              </div>
            </Link>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="py-8 hidden md:flex">
          <div className="bg-[#fafafa] p-4 h-fit min-w-[250px] overflow-y-auto rounded-lg w-full max-w-[320px]">
            <Title level={5} className="mb-16 text-[#000000D9]">
              FILTER
            </Title>

            <Collapse
              bordered={false}
              expandIcon={customExpandIcon}
              expandIconPosition="end"
              activeKey={activeKeys}
              onChange={(keys) =>
                setActiveKeys(Array.isArray(keys) ? keys : [keys])
              }
            >
              {categoryData.map((category) => (
                <Panel
                  key={category.id}
                  header={category.name}
                  style={{ background: '#fafafa', borderBottom: 'none' }}
                >
                  <div className="space-y-4">
                    {/* Category checkbox */}
                    <div className="flex items-center">
                      <Checkbox
                        onChange={(e) =>
                          handleCategoryChange(category.id, e.target.checked)
                        }
                        checked={tempFilters.categoryIds.includes(category.id)}
                      >
                        {category.name}
                      </Checkbox>
                    </div>

                    {/* Attributes for this category */}
                    {attributesByCategory[category.name]?.map((attribute) => (
                      <div key={attribute.id} className="ml-4">
                        <div className="font-medium mb-2">
                          {attribute.attribute}
                        </div>
                        <div className="space-y-2">
                          {attribute.possible_values.map((value) => (
                            <div key={value} className="flex items-center">
                              <Checkbox
                                onChange={(e) =>
                                  handleAttributeChange(
                                    attribute.attribute,
                                    value,
                                    e.target.checked
                                  )
                                }
                                checked={(
                                  tempFilters.attributes[attribute.attribute] ||
                                  []
                                ).includes(value)}
                              >
                                {value}
                              </Checkbox>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              ))}

              <Panel
                header="Price Range"
                key="Price"
                style={{ background: '#fafafa', borderBottom: 'none' }}
              >
                <Slider
                  range
                  min={0}
                  max={1000000}
                  step={1000}
                  value={tempFilters.price}
                  onChange={handlePriceChange}
                  tipFormatter={(value) => `₦${value?.toLocaleString()}`}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>₦{tempFilters.price[0].toLocaleString()}</span>
                  <span>₦{tempFilters.price[1].toLocaleString()}</span>
                </div>
              </Panel>
            </Collapse>

            <Space className="mt-8 flex justify-between w-full">
              <Button onClick={handleReset}>Reset</Button>
              <Button type="primary" onClick={handleApply}>
                OK
              </Button>
            </Space>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1 mt-3">
          {productsLoading ? (
            <div className="flex justify-center items-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <div className="flex flex-col space-y-8">
              <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(productsData?.data || []).map((item: any) => {
                  const product: Product = {
                    id: item.id,
                    name: item.name,
                    price: parseFloat(item.retail_price),
                    images: [item.primary_media_url || ''],
                    discount: item.discount_information?.amount
                      ? parseFloat(item.discount_information.amount)
                      : 0,
                    rating: item.ratings || 0,
                    description: item.description,
                    category: item.category,
                  };

                  return <ProductCard item={product} />;
                })}
              </div>

              {productsData && productsData.last_page > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    current={currentPage}
                    total={productsData.total}
                    pageSize={productsData.per_page}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VendorShop;
