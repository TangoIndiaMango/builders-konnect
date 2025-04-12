import { useCreateData, useFetchData } from '../../../hooks/useApis';
import { Input, Form, FormInstance, Select } from 'antd';
import { useState } from 'react';

const BankDetails = ({ form }: { form: FormInstance<any> }) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const BanksState = useFetchData('shared/banks?paginate=0');
  const VerifyAccountState = useCreateData('merchants/onboarding/verify-bank');

  const handleAccountNumberBlur = async () => {
    const accountNumber = form.getFieldValue('accountNumber');
    const bankId = form.getFieldValue('bankName');

    if (accountNumber && bankId) {
      const payload = {
        account_number: accountNumber,
        bank_id: bankId,
      };
      const res = await VerifyAccountState.mutateAsync(payload);

      form.setFieldsValue({
        accountName: res?.data?.account_name,
      });
    }
  };

  const handleBankChange = (value: string) => {
    setSelectedBank(value);
    form.setFieldsValue({
      accountNumber: '',
      accountName: '',
    });
  };

  return (
    <div>
      <Form.Item
        label="Bank Name"
        name="bankName"
        rules={[{ required: true, message: 'Please enter bank name' }]}
      >
        <Select
          placeholder="Enter bank name"
          loading={BanksState.isPending}
          options={BanksState?.data?.data?.map((b: any) => ({
            value: b?.id,
            label: b?.name,
          }))}
          onChange={handleBankChange}
        />
      </Form.Item>

      <Form.Item
        label="Account Number"
        name="accountNumber"
        rules={[{ required: true, message: 'Please enter account number' }]}
      >
        <Input
          placeholder="Enter account number"
          onBlur={handleAccountNumberBlur}
          disabled={!selectedBank}
        />
      </Form.Item>

      <Form.Item
        label="Account Name"
        name="accountName"
        rules={[{ required: true, message: 'Please enter account name' }]}
      >
        <Input placeholder="Account name" disabled={true} />
      </Form.Item>
    </div>
  );
};

export default BankDetails;
