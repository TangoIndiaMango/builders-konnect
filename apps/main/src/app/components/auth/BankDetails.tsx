import { Input } from 'antd';
import { Form } from 'antd';
import React from 'react';

const BankDetails = () => {
  return <div>
    <Form.Item
          label="Bank Name"
          name="bankName"
          rules={[{ required: true, message: 'Please enter bank name' }]}
        >
          <Input placeholder="Enter bank name" />
        </Form.Item>

        <Form.Item
          label="Account Number"
          name="accountNumber"
          rules={[{ required: true, message: 'Please enter account number' }]}
        >
          <Input placeholder="Enter account number" />
        </Form.Item>

        <Form.Item
          label="Account Name"
          name="accountName"

          rules={[{ required: true, message: 'Please enter account name' }]}
        >
          <Input placeholder="Account name" disabled={true} />
        </Form.Item>

  </div>;
};

export default BankDetails;
