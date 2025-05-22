import { ArrowLeftOutlined } from '@ant-design/icons';
import { useFetchData } from '../../../hooks/useApis';
import { Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import BasicInfomation from './BasicInfomation';
import CustomerReturns from './CustomerReturns';
import CustomerOrder from './CustomerOrder';
import CustomerReviews from './CustomerReviews';
// import PaymentMethod from './PaymentMethod';
import EditCustomer from '../../pages/customers/edit';

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
      <div className="bg-white p-4 space-y-2">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div onClick={() => navigate(-1)} className="cursor-pointer">
              <ArrowLeftOutlined className="text-md mt-1 text-black font-medium" />
            </div>
            <h1 className="text-lg font-semibold">Customer Information</h1>
          </div>
          <div className="flex justify-end px-4">
            <EditCustomer />
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          View and manage customer details and all customer related issues
        </p>
      </div>

      <div className="bg-white px-4 mx-6 my-6">
        <Tabs
          defaultActiveKey="basic"
          items={[
            {
              key: 'basic',
              label: 'Basic Information',
              children: (
                <BasicInfomation
                  customerData={customerData}
                  isLoading={isLoading}
                />
              ),
            },
            {
              key: 'orders',
              label: 'Orders',
              children: <CustomerOrder customerId={id ?? ''} />,
            },
            {
              key: 'returns',
              label: 'Returns',
              children: <CustomerReturns customerId={id ?? ''} />,
            },
            {
              key: 'reviews',
              label: 'Reviews',
              children: <CustomerReviews customerId={id ?? ''} />,
            },
            // {
            //   key: 'payment',
            //   label: 'Payment Method',
            //   children: <PaymentMethod 
            //     filterValue={''}
            //     onExport={() => {}}
            //     updateLimitSize={() => {}}
            //     filterOptions={[]}
            //     searchValue={''}
            //     setSearchValue={() => {}}
            //     reset={() => {}}
            //     data={customerData} 
            //     isLoading={isLoading} 
            //     currentPage={1}
            //     setPage={() => {}}
            //     setCustomDateRange={() => {}}
            //     handleFilterChange={() => {}}
            //   />,
            // },
          ]}
        />
      </div>
    </div>
  );
};
