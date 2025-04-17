import { Card, Select } from "antd";
import EmptyState from "../common/EmptyState";


const { Option } = Select;

const Product = () => {
  return (
    <div className="p-4 bg-white">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Left (Customer Traffic) - 75% width */}
        <div className="w-full md:w-3/4">
          <Card
            title={
              <div className="flex items-center justify-between">
                <span className="text-base font-medium">Products Overview</span>
                <div className="flex gap-2">
                  <Select defaultValue="all" size="small" style={{ width: 100 }}>
                    <Option value="all">All Sales</Option>
                    <Option value="online">Online</Option>
                    <Option value="store">In Store</Option>
                  </Select>
                  <Select defaultValue="month" size="small" style={{ width: 100 }}>
                    <Option value="month">This month</Option>
                    <Option value="week">This week</Option>
                    <Option value="year">This year</Option>
                  </Select>
                </div>
              </div>
            }
            bodyStyle={{ padding: 0 }}
          >
            <EmptyState

            />
          </Card>
        </div>

        {/* Right (Recent Customers) - 25% width */}
        <div className="w-full md:w-1/4">
          <Card
            title={<span className="text-base font-medium">New Products Added</span>}
            bodyStyle={{ padding: 0 }}
          >
            <EmptyState
            
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Product;
