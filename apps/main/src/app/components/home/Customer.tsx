import { Button } from 'antd';
import CardWithFilter from '../common/CardWithFilter';
import EmptyState from '../common/EmptyState';
import FilterGroup from '../common/filters/FilterGroup';
import CustomerTrafficChart from './charts/CustomerTrafficChart';
import { customerData } from './constant';
import CustomerListItem from './customer/CustomerListItem';


const customers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
  },
];


const Customer = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <CardWithFilter
          title="Customer Analytics"
          description="Create sales orders and track order sales and performance here"
          rightSection={<FilterGroup />}
        >
          {customerData?.length > 0 ? (
            <CustomerTrafficChart data={customerData} />
          ) : (
            <EmptyState description="You have no data here yet." />
          )}
        </CardWithFilter>
      </div>

      <div className="xl:col-span-1">
        <CardWithFilter title="Recent Customers">
          {customers?.length > 0 ? (
              <div className="flex flex-col gap-4">
              {customers.map((customer) => (
                <CustomerListItem
                  key={customer.id}
                  name={customer.name}
                  email={customer.email}
                  avatar={customer.avatar}
                  onClick={() => console.log(`Clicked on ${customer.name}`)}
                />
              ))}

              <Button type="link" className="w-full">View All</Button>
            </div>
          ) : (
            <EmptyState description="You have no data here yet." />
          )}
        </CardWithFilter>
      </div>
    </div>
  );
};

export default Customer;
