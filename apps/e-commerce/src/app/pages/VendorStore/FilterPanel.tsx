import { Button, Collapse, Checkbox, Slider, Space, Typography } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

interface FilterPanelProps {
  categoryData: any;
  attributesByCategory: any;
  tempFilters: any;
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
  customExpandIcon: (props: any) => React.ReactNode;
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
  );
};

export default FilterPanel;
