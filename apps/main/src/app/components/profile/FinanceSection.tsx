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
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">FINANCE</h3>
      <div className="grid grid-cols-2 gap-x-24 gap-y-6">
        <div>
          <Text className="text-gray-500 block mb-1">Bank name</Text>
          <Text className="text-gray-900">{financeInfo.bankName}</Text>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">Account Number</Text>
          <Text className="text-gray-900">{financeInfo.accountNumber}</Text>
        </div>
        <div className="col-span-2">
          <Text className="text-gray-500 block mb-1">Account name</Text>
          <Text className="text-gray-900">{financeInfo.accountName}</Text>
        </div>
      </div>
    </div>
  );
};

export default FinanceSection;