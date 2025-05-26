import React, { useState, useEffect } from 'react';
import { Button, Space, Typography, Checkbox, Radio, Slider } from 'antd';
import { useGetInventoryAttributes, useGetCategorizations } from '../../../hooks/useApis';

const { Title } = Typography;

const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000000];

interface InventoryAttribute {
  id: string;
  attribute: string;
  possible_values: string[];
}

interface InventoryAttributesResponse {
  data: InventoryAttribute[];
}

export interface FilterState {
  price: [number, number];
  attributes: {
    [key: string]: string[];
  };
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  categoryId?: string;
}

export default function FilterPanel({ onFilterChange, categoryId: initialCategoryId }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    attributes: {},
    price: DEFAULT_PRICE_RANGE
  });

  const [categoryId, setCategoryId] = useState<string | undefined>(initialCategoryId);
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);

  const { data: categorizations, isLoading: isCategoriesLoading } = useGetCategorizations('category');
  const { data: attributes, isLoading: isAttributesLoading } = useGetInventoryAttributes(categoryId) as { data: InventoryAttributesResponse | undefined; isLoading: boolean };

  useEffect(() => {
    console.log('CategoryId changed:', categoryId);
    console.log('Attributes:', attributes);
  }, [categoryId, attributes]);

  const handleReset = () => {
    setFilters({
      attributes: {},
      price: DEFAULT_PRICE_RANGE
    });
    setPriceRange(DEFAULT_PRICE_RANGE);
    onFilterChange({
      attributes: {},
      price: DEFAULT_PRICE_RANGE
    });
  };

  const handleApply = () => {
    onFilterChange({
      ...filters,
      price: priceRange
    });
  };

  const handleFilterChange = (key: string, value: unknown) => {
    console.log('Filter change:', { key, value });
    const newFilters = { ...filters };

    if (key === 'price') {
      if (Array.isArray(value) && value.length === 2) {
        newFilters.price = [Number(value[0]), Number(value[1])];
        console.log('Setting price range:', newFilters.price);
      }
    } else if (key === 'category') {
      const categoryValue = Array.isArray(value) && value.length > 0 ? value[0] : undefined;
      newFilters.attributes.category = categoryValue ? [categoryValue] : [];

      const selectedCategory = categorizations?.find(cat => cat.name === categoryValue);
      console.log('Selected category:', selectedCategory);

      if (selectedCategory) {
        setCategoryId(selectedCategory.id);
        console.log('Setting category ID to:', selectedCategory.id);
      } else {
        setCategoryId(undefined);
        console.log('Clearing category ID');
      }

      // Clear other attributes when category changes
      Object.keys(newFilters.attributes).forEach(attrKey => {
        if (attrKey !== 'category') {
          delete newFilters.attributes[attrKey];
        }
      });
    } else {
      if (Array.isArray(value)) {
        newFilters.attributes[key] = value.map(String);
        console.log('Setting attribute values:', { key, values: newFilters.attributes[key] });
      } else if (typeof value === 'string') {
        newFilters.attributes[key] = [value];
        console.log('Setting attribute value:', { key, value: newFilters.attributes[key] });
      }
    }

    console.log('Updated filters:', newFilters);
    setFilters(newFilters);
    onFilterChange(newFilters);


  };

  console.log('Debug info:', {
    categoryId,
    hasAttributes: !!attributes,
    attributesData: attributes?.data,
    filters
  });

  return (
    <div className="py-8 hidden md:flex">
      <div className="bg-[#fafafa] p-4 h-fit min-w-[250px] overflow-y-auto rounded-lg w-full max-w-[320px]">
        <div className="filter-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <Title level={5} style={{ margin: 0 }}>FILTERS</Title>
          <Button type="link" onClick={handleReset}>Reset</Button>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <Typography.Text strong style={{ fontSize: '16px', marginBottom: '16px', display: 'block' }}>
              Price Range
            </Typography.Text>
            <Slider
              range
              min={DEFAULT_PRICE_RANGE[0]}
              max={DEFAULT_PRICE_RANGE[1]}
              value={filters.price}
              onChange={(value) => handleFilterChange('price', value)}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <Typography.Text strong style={{ fontSize: '16px', marginBottom: '16px', display: 'block' }}>
              Categories
            </Typography.Text>
            <Radio.Group 
              value={filters.attributes.category?.[0]}
              onChange={(e) => {
                const value = e.target.value;
                console.log('Radio change:', value);
                handleFilterChange('category', [value]);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {isCategoriesLoading ? (
                <div>Loading categories...</div>
              ) : (
                categorizations?.map(cat => (
                  <Radio key={cat.id} value={cat.name}>
                    {cat.name}
                  </Radio>
                ))
              )}
            </Radio.Group>
          </div>

          {categoryId && (
            isAttributesLoading ? (
              <div style={{ marginTop: '20px' }}>Loading attributes...</div>
            ) : attributes?.data && attributes.data.length > 0 ? (
            <div>
              {attributes.data.map((attr) => {
                if (!Array.isArray(attr.possible_values)) return null;
                return (
                  <div key={attr.id} style={{ marginBottom: '20px' }}>
                    <Typography.Text strong style={{ display: 'block', marginBottom: '12px' }}>
                      {attr.attribute}
                    </Typography.Text>
                    <Checkbox.Group
                      options={attr.possible_values.map(val => ({
                        label: val,
                        value: val
                      }))}
                      value={filters.attributes[attr.attribute] || []}
                      onChange={(values) => handleFilterChange(attr.attribute, values)}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '8px'
                      }}
                    />
                  </div>
                );
              })}
            </div>
            ) : (
              <div style={{ marginTop: '20px' }}>No attributes available for this category</div>
            )
          )}
        </div>

        <Space className="mt-8 flex justify-between w-full">
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleApply}>Apply</Button>
        </Space>
      </div>
    </div>
  );
}