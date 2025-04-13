import { useCreateData } from '../../../hooks/useApis';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { frontendBaseUrl } from './auth-outlets';
import { useEmailProvider } from '../../../hooks/useEmailProvider';

const ForgotPassword = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { openEmailProvider } = useEmailProvider();

  const { mutateAsync, isLoading } = useCreateData(
    'auth/forgot-password/reset'
  );

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // API call to submit form
      const res = await mutateAsync({
        identifier: values.email,
        callback_url: frontendBaseUrl + '/vendor/auth/change-password',
      });

      console.log(res);

      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in to your account.',
        btn: (
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              notification.destroy();
              openEmailProvider(values.email);
              navigate('//auth/login');
            }}
          >
            Go to Email
          </Button>
        ),
      });
    } catch (error) {
      notification.error({
        message: 'An error occured, please try again',
      });
      console.error('Form validation error:', error);
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-sm min-h-[400px] space-y-5">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <Form
          form={form}
          className="flex flex-col w-full min-h-[400px]"
          layout="horizontal"
          labelCol={{ span: 6 }}
          size="middle"
        >
          <div className="flex-1">
            <Form.Item
              label="Email/Phone Number"
              name="email"
              rules={[
                { required: true, message: 'Please enter email/phone number' },
              ]}
            >
              <Input placeholder="Enter email or phone number" />
            </Form.Item>
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4">
              <Button
                type="default"
                onClick={() => navigate('//auth/login')}
                size="large"
                className="w-[114px]"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                loading={isLoading}
                onClick={handleSubmit}
                size="large"
                className="w-[114px]"
              >
                Send
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
