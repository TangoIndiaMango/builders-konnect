import { Typography } from 'antd';
import { SkeletonLoader } from '../common/SkeletonLoader';
import InfoField from './InfoField';

const { Text } = Typography;
interface FinanceSectionProps {
  financeInfo: {
    bank_name: string;
    account_number: string;
    account_name: string;
  };
  isLoading: boolean;
  isEditRequested: boolean;
  handleChange: (field: string, value: string) => void;
}

const FinanceSection = ({
  financeInfo,
  isLoading,
  isEditRequested,
  handleChange,
}: FinanceSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm lg:grid-cols-[0.3fr_0.7fr]">
      <div className="">
        <h3 className="mb-4 text-lg font-semibold">FINANCE</h3>
      </div>
      <SkeletonLoader active={isLoading} type="list">
        <div className="grid grid-cols-1 gap-x-24 gap-y-6 md:grid-cols-2">
          <InfoField
            field={{ label: 'Bank name', value: financeInfo?.bank_name }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('bank_name', value)}
          />
          <InfoField
            field={{
              label: 'Account Number',
              value: financeInfo?.account_number,
            }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('account_number', value)}
          />
          <InfoField
            field={{ label: 'Account name', value: financeInfo?.account_name }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('account_name', value)}
          />
        </div>
      </SkeletonLoader>
    </div>
  );
};

export default FinanceSection;
