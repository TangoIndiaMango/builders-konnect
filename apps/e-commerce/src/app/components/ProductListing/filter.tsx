'use client';

import { useState } from 'react';
import { Collapse, Button, Space, Typography } from 'antd';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { CollapseProps } from 'antd';
import { filterTitles } from '../../lib/Constants';


const { Panel } = Collapse;
const { Title, Text } = Typography;

interface FilterState {
  [key: string]: string | number | boolean | undefined;
}

export default function FilterPanel() {
  const [filters, setFilters] = useState<FilterState>({});
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

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
      <div className="py-8 hidden md:flex">
        <div className="bg-[#fafafa] p-4 h-fit  min-w-[250px]  overflow-y-auto rounded-lg w-full max-w-[320px]">
          <Title level={5} className="mb-16 text-[#000000D9]">
            FILTER
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
            {filterTitles.map((title) => (
              <Panel
                header={title}
                key={title}
                style={{
                    background: '#fafafa',
                    color: "#000000D9",
                    fontSize: '14px',
                  borderBottom: 'none',
                }}
              >
                <Text type="secondary">Filter options for {title}</Text>
              </Panel>
            ))}
          </Collapse>

          <Space className="mt-8 flex">
                    <Button onClick={handleReset}>Reset
                        
            </Button>
            <Button type="primary" onClick={handleApply}>
              OK
            </Button>
          </Space>
        </div>
      </div>
    );
}
