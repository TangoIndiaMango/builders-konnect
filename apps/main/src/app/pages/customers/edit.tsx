import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateData } from '../../../hooks/useApis';

export default function EditCustomer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate, isPending: isLoading } = useCreateData(`merchants/customers`);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const formValues = await form.validateFields();
      await mutate(formValues, {
        onSuccess: () => {
          setIsModalVisible(false);
          form.resetFields();
          message.success('Customer updated successfully');
        },
        onError: (error: any) => {
          message.error(error.message);
          console.error('Error updating customer:', error);
        },
      });
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        className="rounded"
        variant="outlined"
        size="large"
        onClick={showModal}
      >
        Edit Customer
      </Button>
      <Modal
        title="Edit Customer"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            htmlType="submit"
            onClick={handleOk}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="editCustomer"
          initialValues={{ remember: true }}
          onFinish={handleOk}
          layout="vertical"
        >
          <Form.Item
            label="FullName"
            name="name"
            rules={[{ required: true, message: 'Please enter a full name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please enter an email address' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please enter a phone number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter an address' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
