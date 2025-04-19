import { Input, Button, Typography } from 'antd';
import { CreditCardOutlined, BankOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const PaymentPage = () => {
  const [activeMethod, setActiveMethod] = useState('card');

  return (
    <div className="min-h-screen  flex items-center justify-center bg-[#F9F9F9] px-4">
      <div className="w-full h-[500px] max-w-3xl flex rounded-md overflow-hidden shadow-[#0000001A] shadow-md">
        <div className="w-1/3 bg-[#F4F4F4] p-14 space-y-10">
          <Text className="text-[#1E1E1E]" strong>
            PAY WITH
          </Text>
          <div
            className={`flex items-center gap-2 cursor-pointer ${
              activeMethod === 'card' ? 'text-[#254AA5]' : 'text-[#4E4E4E]'
            }`}
            onClick={() => setActiveMethod('card')}
          >
            <CreditCardOutlined />
            <span>Card</span>
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer ${
              activeMethod === 'transfer' ? 'text-[#3B43FF]' : 'text-[#1E1E1E]'
            }`}
            onClick={() => setActiveMethod('transfer')}
          >
            <BankOutlined />
            <span>Transfer</span>
          </div>
        </div>
        <div className="w-2/3 bg-white p-8">
          <div className="flex justify-between items-center mb-6">
            <Title
              level={4}
              className="mb-0 font-medium text-base md:text-xl text-[#1E1E1E]"
            >
              Builder's Konnect
            </Title>
            <div className="text-right">
              <Text className="block text-base text-[#4E4E4E]">
                Customer@email.com
              </Text>
              <Text className="text-[#1E1E1E] tet-base font-medium">
                PAY{' '}
                <span className="text-[#254AA5] text-base font-medium">
                  NGN 17,100
                </span>
              </Text>
            </div>
          </div>

          <Text className=" mb-4 flex items-center justify-center text-base font-medium text-[#1E1E1E]">
            Enter Your Card Details to Pay
          </Text>
          <div className="space-y-4">
            <Input placeholder="Card Number: 0000 0000 0000 0000" />
            <div className="flex gap-4">
              <Input placeholder=" Card Expiry: MM/YY" />
              <Input placeholder="CVV: 123" />
                      </div>
                      <div className='mt-4'>   
                      <Link to="/success">     
            <Button type="primary" block>
              Pay ₦3,900
            </Button>
                      </Link>
                      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
