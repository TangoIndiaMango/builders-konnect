import { Typography } from 'antd';

const { Text } = Typography;
interface FinanceSectionProps {
  financeInfo: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

const FinanceSection = ({ financeInfo }: FinanceSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div className="">
        <h3 className="mb-4 text-lg font-semibold">FINANCE</h3>
      </div>
      <div className="grid grid-cols-2 gap-x-24 gap-y-6">
        <div>
          <Text className="block mb-1 text-gray-500">Bank name</Text>
          <Text className="text-gray-900">{financeInfo.bankName}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">Account Number</Text>
          <Text className="text-gray-900">{financeInfo.accountNumber}</Text>
        </div>
        <div className="col-span-2">
          <Text className="block mb-1 text-gray-500">Account name</Text>
          <Text className="text-gray-900">{financeInfo.accountName}</Text>
        </div>
      </div>
    </div>
  );
};

export default FinanceSection;
