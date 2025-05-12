import { ArrowLeftOutlined } from '@ant-design/icons';
import { useFetchData } from '../../../hooks/useApis';
import { Form, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { SkeletonLoader } from '../common/SkeletonLoader';

interface CustomerDetailsProps {
  customerData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

export const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: customers, isLoading } = useFetchData(
    `merchants/customers/${id}`
  );
  const customerData = customers?.data;
 
//   console.log(customerData);
  return ( 
    <div className="">
      <div className="mb-4 bg-white p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div onClick={() => navigate(-1)} className="cursor-pointer">
            <ArrowLeftOutlined className="text-md mt-1 text-black font-medium" />
          </div>
          <h1 className="text-xl font-semibold">View Customer</h1>
        </div>
        <p className="text-gray-500 text-sm">
          View and manage customer details
        </p>
      </div>

      <div className="bg-white mx-6 space-y-2 py-8 px-8">
        <div className="bg-gray-100 p-3 rounded mb-8">
          <h2 className="text-lg text-center font-semibold">Personal Details</h2>
        </div>
        {isLoading ? (
          <SkeletonLoader active={true} type="table" columns={4} rows={1} />
        ) : (
          <Form layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Full Name">
              <Input
                value={customerData?.name}
                
                className="bg-gray-50"
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                value={customerData?.email}
                
                className="bg-gray-50"
              />
            </Form.Item>

            <Form.Item label="Phone Number">
              <Input
                value={customerData?.phone}
                
                className="bg-gray-50 text-black"
              />
            </Form.Item>

            <Form.Item label="Address">
              <Input
                value={customerData?.address}
                
                className="bg-gray-50 text-black"
                rows={3}
              />
            </Form.Item>
          </div>
        </Form>
        )}
      </div>
    </div>
  );
};
