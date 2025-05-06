import { Typography } from 'antd';
import { SkeletonLoader } from '../common/SkeletonLoader';

const { Text } = Typography;
interface FinanceSectionProps {
  financeInfo: {
    bank_name: string;
    account_number: string;
    account_name: string;
  };
  isLoading: boolean;
}

const FinanceSection = ({ financeInfo, isLoading }: FinanceSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div className="">
        <h3 className="mb-4 text-lg font-semibold">FINANCE</h3>
      </div>
      <SkeletonLoader active={isLoading} type="list">
      <div className="grid grid-cols-2 gap-x-24 gap-y-6">
        <div>
          <Text className="block mb-1 text-gray-500">Bank name</Text>
          <Text className="text-gray-900">{financeInfo?.bank_name}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">Account Number</Text>
          <Text className="text-gray-900">{financeInfo?.account_number}</Text>
        </div>
        <div className="col-span-2">
          <Text className="block mb-1 text-gray-500">Account name</Text>
          <Text className="text-gray-900">{financeInfo?.account_name}</Text>
        </div>
      </div>
      </SkeletonLoader>
    </div>
  );
};

export default FinanceSection;
