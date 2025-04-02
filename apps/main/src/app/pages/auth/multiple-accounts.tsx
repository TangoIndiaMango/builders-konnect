import { useState } from 'react';
import AccountCard from '../../components/common/AccountCard';
import { Button } from 'antd';

const multipleAccounts = [
  {
    id: 1,
    name: 'Building Construction',
    email: 'buildingconstruction@gmail.com',
    phone: '1234567890',
    role: 'Staff Manager',
    password: 'password1',
    stores: [
      {
        id: 1,
        name: 'Store 1',
        email: 'store1@gmail.com',
      },
      {
        id: 1,
        name: 'Store 2',
        email: 'store2@gmail.com',
      },
    ],
  },
  {
    id: 2,
    name: 'Builders Tool',
    email: 'builderstool@gmail.com',
    phone: '1234567890',
    role: 'Sales Rep',
    password: 'password2',
    stores: [
      {
        id: 1,
        name: 'Store 1',
        email: 'store1@gmail.com',
      },
      {
        id: 2,
        name: 'Store 2',
        email: 'store2@gmail.com',
      },
      {
        id: 3,
        name: 'Store 3',
        email: 'store3@gmail.com',
      },
    ],
  },
];

const MultipleAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  // const onFinish = (values: any) => {
  //   console.log('Form values:', values);
  //   // Handle form submission
  // };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-sm min-h-[400px] space-y-5">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-semibold">Email Associated with Multiple Accounts</h1>
        <p className="max-w-xl text-center text-gray-500">Your email is associated with multiple accounts. Kindly select one account you intend to log into, to continue on Builders Konnect.</p>
        <div className="flex flex-col w-full  md:max-w-xl min-h-[400px]">
          <div className="flex-1 space-y-5">
            {/* Account List */}
            {multipleAccounts.map((account) => (
               <AccountCard
               key={account.id}
               id={account.id}
               name={account.name}
               role={account.role}
               stores={account.stores}
               selected={selectedAccount === account.id}
               onSelect={setSelectedAccount}
             />
            ))}
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4">
              <Button
                type="primary"
                onClick={() => {
                  console.log('Selected account:', selectedAccount);
                }}
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
