import { Typography } from 'antd';
import { SkeletonLoader } from '../common/SkeletonLoader';
import InfoField from './InfoField';
import { useState, useEffect } from 'react';
import { useCreateData, useFetchData } from '../../../hooks/useApis';
const { Text } = Typography;
interface FinanceSectionProps {
  financeInfo: {
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_id?: string;
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
  const [selectedBank, setSelectedBank] = useState(financeInfo?.bank_id || '');
  const [accountNumber, setAccountNumber] = useState(financeInfo?.account_number || '');
  const [accountName, setAccountName] = useState(financeInfo?.account_name || '');

  const BanksState = useFetchData('shared/banks?paginate=0');
  const VerifyAccountState = useCreateData('merchants/onboarding/verify-bank');

  useEffect(() => {
    const verify = async () => {
      if (
        isEditRequested &&
        selectedBank &&
        accountNumber &&
        accountNumber.length === 10
      ) {
        try {
          const payload = {
            account_number: accountNumber,
            bank_id: selectedBank,
          };
          const res = await VerifyAccountState.mutateAsync({
            data: payload,
            config: { tenant_id: false },
          });
          if (res?.data?.account_name) {
            setAccountName(res.data.account_name);
            handleChange('account_name', res.data.account_name);
          }
        } catch (error) {
          // Don't clear the account name on error, just keep the existing one
          console.error('Verification failed:', error);
        }
      }
    };
    verify();
  }, [selectedBank, accountNumber, isEditRequested]);

  const handleBankChange = (value: string) => {
    setSelectedBank(value);
    handleChange('bank_name', value);
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    handleChange('account_number', value);
  };

  return (
    <div className="grid grid-cols-1 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm lg:grid-cols-[0.3fr_0.7fr]">
      <div className="">
        <h3 className="mb-4 text-lg font-semibold">FINANCE</h3>
      </div>
      <SkeletonLoader active={isLoading} type="list">
        <div className="grid grid-cols-1 gap-x-24 gap-y-6 md:grid-cols-2">
          <InfoField
            field={{
              label: 'Bank name',
              value: financeInfo?.bank_name || selectedBank,
            }}
            isEdit={isEditRequested}
            type="select"
            options={BanksState?.data?.data?.map((b: any) => ({
              value: b?.id,
              label: b?.name,
            }))}
            handleChange={handleBankChange}
            placeholder="Select bank"
            value={selectedBank || financeInfo?.bank_name}
          />
          <InfoField
            field={{
              label: 'Account Number',
              value: financeInfo?.account_number || accountNumber,
            }}
            isEdit={isEditRequested}
            type="text"
            handleChange={handleAccountNumberChange}
            placeholder="Enter 10-digit account number"
          />
          <InfoField
            field={{
              label: 'Account name',
              value: VerifyAccountState.isPending
                ? 'Verifying...'
                : accountName || financeInfo?.account_name || '-',
            }}
            isEdit={false}
            type="text"
          />
        </div>
      </SkeletonLoader>
    </div>
  );
};

export default FinanceSection;
