import { Form, Input } from 'antd';
import { SkeletonLoader } from '../common/SkeletonLoader';

export default function BasicInfomation({customerData, isLoading}: {customerData: any, isLoading: boolean}) {
  return (
    <div className="bg-white mx-6 space-y-2 py-8 px-8 mt-6">
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
              />
            </Form.Item>
          </div>
        </Form>
        )}
        <div className="bg-gray-100 p-3 rounded mb-8">
          <h2 className="text-lg text-center font-semibold">Shipping and Billing Infomation</h2>
        </div>
        <Form layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="Shipping Infomation">
                    <Input value={customerData?.shippingAddress} className="bg-gray-50 text-black" />
                </Form.Item>
                <Form.Item label="Billing Infomation"> 
                    <Input value={customerData?.billingAddress} className="bg-gray-50 text-black" />
                </Form.Item>
            </div>
        </Form>
      </div>
  );
}