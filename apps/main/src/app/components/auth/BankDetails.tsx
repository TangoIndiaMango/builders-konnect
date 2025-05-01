import { useCreateData, useFetchData } from '../../../hooks/useApis';
import { Input, Form, FormInstance, Select, InputNumber } from 'antd';
import { useState } from 'react';
import NumericInput from '../common/NumericInput';

const BankDetails = ({ form }: { form: FormInstance<any> }) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const BanksState = useFetchData('shared/banks?paginate=0');
  const VerifyAccountState = useCreateData('merchants/onboarding/verify-bank');

  const handleAccountNumberBlur = async () => {
    const accountNumber = form.getFieldValue('accountNumber');
    const bankId = form.getFieldValue('bankName');

    if (accountNumber?.toString().length === 10 && bankId) {
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

  const handleAccountNumberChange = async (value: string) => {
    form.setFieldsValue({ accountNumber: value });

    const bankId = form.getFieldValue('bankName');
    if (value.length === 10 && bankId) {
      const payload = {
        account_number: value,
        bank_id: bankId,
      };
      const res = await VerifyAccountState.mutateAsync(payload);

      form.setFieldsValue({
        accountName: res?.data?.account_name,
      });
    } else {
      // Clear accountName if account number is not 10 digits
      form.setFieldsValue({
        accountName: '',
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
          loading={BanksState.isLoading}
          options={BanksState?.data?.data?.map((b: any) => ({
            value: b?.id,
            label: b?.name,
          }))}
          showSearch
          filterOption={(input, option) =>
            (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
          }
          onChange={handleBankChange}
        />
      </Form.Item>

      <Form.Item
        label="Account Number"
        name="accountNumber"
        rules={[{ required: true, message: 'Please enter account number' }]}
      >
        <NumericInput
          placeholder="Enter account number"
          onBlur={handleAccountNumberBlur}
          onChange={handleAccountNumberChange}
          disabled={!selectedBank}
          maxLength={10}
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
