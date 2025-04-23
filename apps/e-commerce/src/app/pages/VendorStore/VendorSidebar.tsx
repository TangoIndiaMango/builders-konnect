'use client';

import { useState } from 'react';
import { Collapse, Button, Space, Typography } from 'antd';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { CollapseProps } from 'antd';

const { Panel } = Collapse;
const { Title } = Typography;

const categories = [
  'Imported Tiles',
  'Nigerian Tiles',
  'Laminate Flooring (5)',
  '3D Flooring (5)',
  'Wood Plank Flooring (5)',
  'Vinyl Planks (5)',
  'Vinyl Tiles (5)',
  'Carpet Tiles (5)',
  'Epoxy Flooring (5)',
  'Terrazzo Flooring (5)',
  'Spanish Stamping (5)',
];

export default function VendorSidebar() {
  const [filters, setFilters] = useState({});
  const [activeKeys, setActiveKeys] = useState<string[]>(['Categories']);

  const handleReset = () => {
    setFilters({});
  };

  const handleApply = () => {
    console.log('Applying filters:', filters);
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
            header={`Categories (${categories.length})`}
            key="Categories"
            style={{ background: '#fafafa', borderBottom: 'none' }}
          >
            <ul className="space-y-2 text-sm text-gray-700">
              {categories.map((cat) => (
                <li key={cat} className="cursor-pointer hover:text-blue-600">
                  {cat}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            header="Brand"
            key="Brand"
            style={{ background: '#fafafa', borderBottom: 'none' }}
          >
            <span className="text-sm text-gray-500">Brand filters here...</span>
          </Panel>

          <Panel
            header="Color"
            key="Color"
            style={{ background: '#fafafa', borderBottom: 'none' }}
          >
            <span className="text-sm text-gray-500">Color filters here...</span>
          </Panel>

          <Panel
            header="Price"
            key="Price"
            style={{ background: '#fafafa', borderBottom: 'none' }}
          >
            <span className="text-sm text-gray-500">Price range inputs...</span>
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
