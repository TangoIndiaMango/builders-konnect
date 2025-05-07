import { MailOutlined } from '@ant-design/icons';

const customer = {
  name: 'Kingsley Elon',
  phone: '(405) 555-0128',
  email: 'nathan.roberts@example.com',
  orders: '1,032',
};

const CustomerInformation = () => (
  <div className="p-5 space-y-5 bg-white">
    <div className="flex flex-wrap items-center justify-between mb-2">
      <div className="text-lg font-semibold">Customer Information</div>
      <a
        href={`mailto:${customer.email}`}
        className="flex items-center gap-1 text-blue-600 hover:underline"
      >
        <MailOutlined /> Email Customer
      </a>
    </div>
    <div className="flex flex-col gap-4 p-4 rounded bg-[#F8F9FC] md:flex-row md:gap-0 md:items-center">
      <div className="flex-1">
        <div className="text-xs text-gray-500">Name</div>
        <div className="font-medium">{customer.name}</div>
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">Phone</div>
        <div className="font-medium">{customer.phone}</div>
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">Email</div>
        <div className="font-medium">{customer.email}</div>
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">No of Orders</div>
        <div className="font-medium">{customer.orders}</div>
      </div>
    </div>
  </div>
);

export default CustomerInformation;