import { Button, Form, Input, Steps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/common/ErrorModal';
import SuccessModal from '../../components/common/SuccessModal';

const CreateVendorAccount = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  // const onFinish = (values: any) => {
  //   console.log('Form values:', values);
  //   // Handle form submission
  // };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      // API call to submit form

      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Form validation error:', error);

      setErrorModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="max-w-4xl p-8 mx-auto space-y-5 bg-white rounded-sm">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-bold">Create Vendor Account </h1>
        <Form
          form={form}
          className="flex flex-col w-full min-h-[400px]"
          layout="horizontal"
          // onFinish={onFinish}
          labelCol={{ span: 5 }}
          size="middle"
        >
          <div className="flex-1">
            <Form.Item
              label="Create password"
              name="password"
              rules={[{ required: true, message: 'Please enter password' }]}
            >
              <Input placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please enter confirm password' },
              ]}
            >
              <Input placeholder="Confirm password" />
            </Form.Item>
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4">
              <Button
                type="primary"
                onClick={handleSubmit}
                size="large"
                className="w-[114px]"
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      </div>

      <SuccessModal
        open={successModalOpen}
        title="Account Password Created "
        message="You can now log in to your portal to start using Builders Konnect."
        buttonText="Log in"
        onClose={handleCloseSuccessModal}
      />

      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      />
    </div>
  );
};

export default CreateVendorAccount;
