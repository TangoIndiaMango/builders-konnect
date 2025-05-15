'use client';

import { useState } from 'react';
import { Collapse, Button, Space, Typography, Checkbox, Slider } from 'antd';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { CollapseProps } from 'antd';
import { useGetCategorizations, useGetInventoryAttributes } from '../../../hooks/useApis';

const { Panel } = Collapse;
const { Title } = Typography;

interface VendorSidebarProps {
  onFiltersChange: (filters: Record<string, unknown>) => void;
}

export default function VendorSidebar({ onFiltersChange }: VendorSidebarProps) {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [activeKeys, setActiveKeys] = useState<string[]>(['Categories']);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  // Fetch categories
  const { data: categoryData = [] } = useGetCategorizations('category');

  // Fetch attributes
  const { data: attributesData = [] } = useGetInventoryAttributes();

  const handleReset = () => {
    setFilters({});
    setPriceRange([0, 1000000]);
    onFiltersChange({});
  };

  const handleApply = () => {
    const appliedFilters = {
      ...filters,
      'filters[price][min]': priceRange[0],
      'filters[price][max]': priceRange[1]
    };
    onFiltersChange(appliedFilters);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters['filters[categorization][category_id]'] = categoryId;
      } else {
        delete newFilters['filters[categorization][category_id]'];
      }
      return newFilters;
    });
  };

  const handleAttributeChange = (attributeKey: string, value: string, checked: boolean) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      const filterKey = `filters[metadata][${attributeKey.toLowerCase()}]`;
      const currentValues = (newFilters[filterKey] as string[] || []);
      
      if (checked) {
        newFilters[filterKey] = [...currentValues, value];
      } else {
        newFilters[filterKey] = currentValues.filter(v => v !== value);
        if (newFilters[filterKey].length === 0) {
          delete newFilters[filterKey];
        }
      }
      
      return newFilters;
    });
  };

  const customExpandIcon: CollapseProps['expandIcon'] = ({ isActive }) => (
    <span style={{ marginLeft: 'auto' }}>
      {isActive ? <FaChevronUp /> : <FaChevronDown />}
    </span>
  );

  return (
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
          <Panel
            header={`Categories (${categoryData.length})`}
            key="Categories"
            style={{ background: '#fafafa', borderBottom: 'none' }}
          >
            <div className="space-y-2 text-sm text-gray-700">
              {categoryData.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                    checked={filters['filters[categorization][category_id]'] === category.id}
                  >
                    {category.name}
                  </Checkbox>
                </div>
              ))}
            </div>
          </Panel>

          {attributesData.map((attribute) => (
            <Panel
              key={attribute.name}
              header={attribute.name}
              style={{ background: '#fafafa', borderBottom: 'none' }}
            >
              <div className="space-y-2">
                {attribute.values.map((value) => (
                  <div key={value} className="flex items-center">
                    <Checkbox
                      onChange={(e) => handleAttributeChange(attribute.name, value, e.target.checked)}
                      checked={(
                        filters[`filters[metadata][${attribute.name.toLowerCase()}]`] as string[] || []
                      ).includes(value)}
                    >
                      {value}
                    </Checkbox>
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
              value={priceRange}
              onChange={(value: [number, number]) => setPriceRange(value)}
              tipFormatter={(value) => `₦${value?.toLocaleString()}`}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>₦{priceRange[0].toLocaleString()}</span>
              <span>₦{priceRange[1].toLocaleString()}</span>
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
  );
}
