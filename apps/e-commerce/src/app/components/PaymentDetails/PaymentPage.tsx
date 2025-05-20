import { Input, Button, Typography, Modal } from 'antd';
import { CreditCardOutlined, BankOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
interface TransferDetails {
  amount: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const PaymentPage = () => {
  const [activeMethod, setActiveMethod] = useState('card');
   const [isModalOpen, setIsModalOpen] = useState(false)

  function handleClick() {
    setActiveMethod('transfer');
    setIsModalOpen(true);
  }

  const transferDetails: TransferDetails = {
    amount: 'NGN 5000',
    bankName: 'Sterling Bank',
    accountNumber: '1234567890',
    accountName: "Builder's Konnect",
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTransfer = () => {
    setIsModalOpen(false);
  };

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
            onClick={handleClick}
          >
            <BankOutlined />
            <span>Transfer</span>

          </div>
        </div>
        {
          isModalOpen && (
             <Modal
        title={null}
        open={isModalOpen}
        footer={null}
        closable={false}
        width={500}
        className="p-0"
        style={{ padding: 0 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-2xl font-semibold m-0">Confirm Transfer</h4>
            <div className="bg-green-500 text-white px-4 py-2 rounded-md">
              <div className="flex justify-between min-w-[150px]">
                <span className="font-medium">Amount</span>
                <span className="font-medium">{transferDetails.amount}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-md mb-6">
            <div className="flex justify-between mb-4">
              <span className="text-base">Bank Name</span>
              <span className="text-base text-gray-500">{transferDetails.bankName}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-base">Account Number</span>
              <span className="text-base text-gray-500">{transferDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base">Account Name</span>
              <span className="text-base text-gray-500">{transferDetails.accountName}</span>
            </div>
          </div>

          <p className="text-center text-gray-500 mb-6">Click the Transfer button once payment is successful</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleCancel}
              className="py-3 px-4 border border-gray-300 rounded-md text-base hover:bg-gray-50 transition-colors"
            >
              Cancel
                  </button>
                  <Link to="/success">

            <button
              onClick={handleTransfer}
              className="py-3 px-4 bg-blue-800 text-white rounded-md text-base hover:bg-blue-900 transition-colors"
            >
              Transfer Successful
            </button>
                  </Link>
          </div>
        </div>
      </Modal>
       ) }

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
