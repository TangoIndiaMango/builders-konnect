import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateData } from '../../../hooks/useApis';

export default function CreateCustomer() {
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
            message.success('Customer created successfully');
          },
          onError: (error:any) => {
            message.error(error.message);
            console.error('Error creating customer:', error);
          }
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
      <Button type="primary"
        className="rounded"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Add New
      </Button>
      <Modal
        title="Add New Customer" 
        open={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit"   
            type="primary" 
            loading={isLoading}
            htmlType="submit" 
            onClick={handleOk}>
              Save
            </Button>,
          ]}
        >
  
      
        <Form
           form={form}  
           name="createCustomer"
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
            rules={[{ required: true, message: 'Please enter an email address' }]}
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

        <Form.Item
          label="Source  (How did they get to know about you?)"
          name="referral_source"
          rules={[{ required: true, message: 'Please select a source' }]}
        >
          <Select >
            <Select.Option value="facebook">Facebook</Select.Option>
            <Select.Option value="whatsApp">WhatsApp</Select.Option>
            <Select.Option value="a friend">A Friend</Select.Option>
            <Select.Option value="an organization">An Organization</Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
        </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
