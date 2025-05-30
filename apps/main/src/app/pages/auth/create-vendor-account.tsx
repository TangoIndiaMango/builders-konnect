import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/common/ErrorModal';
import SuccessModal from '../../components/common/SuccessModal';
import { useCreateData } from '../../../hooks/useApis';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { EyeTwoTone } from '@ant-design/icons';
import Password from 'antd/es/input/Password';

const CreatePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const PasswordState = useCreateData('merchants/onboarding/add-password');

  const token = searchParams.get('token');
  const code = searchParams.get('code');

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      const payload = {
        token: token,
        code: code,
        password: values?.password,
        password_confirmation: values?.confirmPassword,
        entity: 'merchant',
      };
      // API call to submit form
      await PasswordState.mutateAsync(payload);

      setSuccessModalOpen(true);
    } catch (error: any) {
      console.error('Form validation error:', error);
      console.log(error?.message);
      setErrorMessage(error?.message);
      setErrorModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate('/auth/login');
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
              <Password
                placeholder="Enter password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please enter confirm password' },
                {
                  validator: (_, value) => {
                    if (value !== form.getFieldValue('password')) {
                      return Promise.reject(new Error('Passwords do not match'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Password
                placeholder="Confirm password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4">
              <Button
                type="primary"
                onClick={handleSubmit}
                size="large"
                className="w-[114px]"
                loading={PasswordState.isLoading}
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
        message={errorMessage}
      />
    </div>
  );
};

export default CreatePassword;
