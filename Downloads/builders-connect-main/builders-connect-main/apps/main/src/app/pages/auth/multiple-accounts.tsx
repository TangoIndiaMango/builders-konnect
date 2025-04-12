import { useState } from 'react';
import AccountCard from '../../components/common/AccountCard';
import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const MultipleAccounts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  const accountData = location?.state?.data;

  const onFinish = () => {
    if (!selectedAccount) {
      return;
    }
    sessionStorage.setItem('tenant_id', String(selectedAccount) || '');
    navigate('/');
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-sm min-h-[400px] space-y-5">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-semibold">
          Email Associated with Multiple Accounts
        </h1>
        <p className="max-w-xl text-center text-gray-500">
          Your email is associated with multiple accounts. Kindly select one
          account you intend to log into, to continue on Builders Konnect.
        </p>
        <div className="flex flex-col w-full  md:max-w-xl min-h-[400px]">
          <div className="flex-1 space-y-5">
            {/* Account List */}
            {accountData?.map((account: any) => (
              <AccountCard
                key={account?.id}
                id={account?.id}
                name={account?.name}
                role={account?.roles[0]}
                stores={account.stores_count}
                selected={selectedAccount === account?.id}
                onSelect={setSelectedAccount}
              />
            ))}
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4">
              <Button
                type="primary"
                onClick={onFinish}
                size="large"
                className="w-[114px]"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleAccounts;
