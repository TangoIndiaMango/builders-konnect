'use client';

import { useState, useMemo } from 'react';
import { Collapse, Button, Space, Typography, Checkbox, Slider, Input } from 'antd';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { CollapseProps } from 'antd';
import { useGetInventoryAttributes } from '../../../hooks/useApis';


const { Panel } = Collapse;
const { Title } = Typography;

export interface FilterState {
  attributes: { [key: string]: string[] };
  price: [number, number];
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000000];

interface FilterSection {
  key: string;
  title: string;
  type: 'range' | 'checkbox' | 'text';
  min?: number;
  max?: number;
  options?: string[];
  placeholder?: string;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  categoryId?: string;
}

export default function FilterPanel({ onFilterChange, categoryId }: FilterPanelProps) {
  console.log('FilterPanel rendered with categoryId:', categoryId);
  const { data: attributesData, isLoading } = useGetInventoryAttributes(categoryId);

  const filterSections = useMemo(() => {
    const sections: FilterSection[] = [
      {
        key: 'price',
        title: 'Price Range',
        type: 'range',
        min: 0,
        max: 1000000
      }
    ];

    if (attributesData) {
      // Add dynamic attributes as filters
      attributesData.forEach((attr) => {
        // Skip certain attributes that might need special handling
        if (attr.attribute === 'Coverage' || attr.attribute === 'VOC Content') {
          return;
        }

        sections.push({
          key: attr.attribute,
          title: attr.attribute,
          type: attr.possible_values.length <= 1 ? 'text' : 'checkbox',
          options: attr.possible_values.length > 1 ? attr.possible_values : undefined,
          placeholder: attr.possible_values[0] || `Enter ${attr.attribute}`
        });
      });
    }

    return sections;
  }, [attributesData]);
  
  const [filters, setFilters] = useState<FilterState>({
    attributes: {},
    price: DEFAULT_PRICE_RANGE
  });
  const [activeKeys, setActiveKeys] = useState<string[]>(['price']);
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);

  const handleReset = () => {
    setFilters({
      attributes: {},
      price: DEFAULT_PRICE_RANGE
    });
    setPriceRange(DEFAULT_PRICE_RANGE);
  };

  const handleApply = () => {
    onFilterChange({
      ...filters,
      price: priceRange
    });
  };

  const handleFilterChange = (key: string, value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: value
      }
    }));
  };

  const customExpandIcon: CollapseProps['expandIcon'] = ({ isActive }) => (
    <span style={{ marginLeft: 'auto' }}>
      {isActive ? <FaChevronUp /> : <FaChevronDown />}
    </span>
  );

  const renderFilterContent = (section: FilterSection) => {
    switch (section.type) {
      case 'range':
        return (
          <Slider
            range
            min={section.min}
            max={section.max}
            value={priceRange}
            onChange={(value: number[]) => {
              if (Array.isArray(value) && value.length === 2) {
                setPriceRange([value[0], value[1]]);
              }
            }}
          />
        );
      case 'checkbox':
        return (
          <Checkbox.Group
            options={section.options?.map(opt => ({ label: opt, value: opt }))}
            value={filters.attributes[section.key] || []}
            onChange={(values) => handleFilterChange(section.key, values)}
          />
        );
      case 'text':
        return (
          <Input
            placeholder={section.placeholder}
            value={(filters.attributes[section.key] || [])[0] || ''}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                handleFilterChange(section.key, [value]);
              } else {
                handleFilterChange(section.key, []);
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 hidden md:flex">
        <div className="bg-[#fafafa] p-4 h-fit min-w-[250px] overflow-y-auto rounded-lg w-full max-w-[320px]">
          <div className="text-center py-4">Loading filters...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 hidden md:flex">
      <div className="bg-[#fafafa] p-4 h-fit min-w-[250px] overflow-y-auto rounded-lg w-full max-w-[320px]">
        <Title level={5} className="mb-4 text-[#000000D9]">
          FILTERS
        </Title>

        <Collapse
          bordered={false}
          expandIcon={customExpandIcon}
          expandIconPosition="end"
          accordion={false}
          activeKey={activeKeys}
          onChange={(keys) =>
            setActiveKeys(Array.isArray(keys) ? keys : [keys])
          }
        >
          {filterSections.map((section) => (
            <Panel
              header={section.title}
              key={section.key}
              style={{
                background: '#fafafa',
                color: "#000000D9",
                fontSize: '14px',
                borderBottom: 'none',
              }}
            >
              {renderFilterContent(section)}
            </Panel>
          ))}
        </Collapse>

        <Space className="mt-8 flex justify-between w-full">
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleApply}>Apply</Button>
        </Space>
      </div>
    </div>
  );
}
