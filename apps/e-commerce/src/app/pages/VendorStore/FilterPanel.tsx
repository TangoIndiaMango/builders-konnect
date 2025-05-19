import { Button, Collapse, Checkbox, Slider, Space, Typography } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

interface Category {
  id: string;
  name: string;
}

interface Attribute {
  id: string;
  attribute: string;
  possible_values: string[];
  category: string;
}

interface FilterState {
  attributes: Record<string, string[]>;
  price?: [number, number];
  sort_by: string | undefined;
  categoryIds: string[];
}

interface FilterPanelProps {
  categoryData: Category[];
  attributesByCategory: Record<string, Attribute[]>;
  tempFilters: FilterState;
  handleCategoryChange: (categoryId: string, checked: boolean) => void;
  handleAttributeChange: (
    attributeKey: string,
    value: string,
    checked: boolean
  ) => void;
  handlePriceChange: (value: number[]) => void;
  handleReset: () => void;
  handleApply: () => void;
  activeKeys: string[];
  setActiveKeys: (keys: string[]) => void;
  customExpandIcon: (props: { isActive?: boolean }) => React.ReactNode;
}

const FilterPanel = ({
  categoryData,
  attributesByCategory,
  tempFilters,
  handleCategoryChange,
  handleAttributeChange,
  handlePriceChange,
  handleReset,
  handleApply,
  activeKeys,
  setActiveKeys,
  customExpandIcon,
}: FilterPanelProps) => {
  return (
    <aside className="py-8 hidden md:flex">
      <div className="bg-[#fafafa] rounded-lg w-full max-w-[320px] min-w-[250px] flex flex-col h-[calc(100vh-150px)]">
        <div className="p-4">
          <Title level={5} className="mb-4 text-[#000000D9]">
            FILTER
          </Title>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4">

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
                              tempFilters.attributes[attribute.attribute] || []
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
              value={tempFilters.price || [0, 1000000]}
              onChange={handlePriceChange}
              tipFormatter={(value) => `₦${value?.toLocaleString()}`}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>₦{(tempFilters.price?.[0] || 0).toLocaleString()}</span>
              <span>₦{(tempFilters.price?.[1] || 1000000).toLocaleString()}</span>
            </div>
          </Panel>
        </Collapse>
        </div>

        <div className="p-4 border-t border-gray-200 bg-[#fafafa] mt-auto">
          <Space className="flex justify-between w-full">
            <Button onClick={handleReset}>Reset</Button>
            <Button type="primary" onClick={handleApply}>
              OK
            </Button>
          </Space>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
