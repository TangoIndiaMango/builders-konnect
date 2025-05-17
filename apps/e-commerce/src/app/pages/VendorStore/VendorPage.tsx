import type { CollapseProps } from 'antd';
import { Collapse, Select, Spin, Typography } from 'antd';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import {
  useGetCategorizations,
  useGetInventoryAttributes,
  useGetMerchant,
} from '../../../hooks/useApis';

import FilterPanel from './FilterPanel';
import ProductsGrid from './ProductsGrid';
import VendorStoreHeader from './VendorStoreHeader';

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
      <VendorStoreHeader
        merchant={merchant}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <FilterPanel
          categoryData={categoryData}
          attributesByCategory={attributesByCategory}
          tempFilters={tempFilters}
          handleCategoryChange={handleCategoryChange}
          handleAttributeChange={handleAttributeChange}
          handlePriceChange={handlePriceChange}
          handleReset={handleReset}
          handleApply={handleApply}
          activeKeys={activeKeys}
          setActiveKeys={setActiveKeys}
          customExpandIcon={customExpandIcon}
        />

        {/* Products Grid */}
        <ProductsGrid
          productsData={productsData}
          productsLoading={productsLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default VendorShop;
