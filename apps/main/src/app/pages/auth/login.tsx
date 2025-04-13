import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useCreateData } from '../../../hooks/useApis';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Password from 'antd/es/input/Password';

const Login = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { isLoading, mutateAsync } = useCreateData('auth/signin');

  // const getMerchantDetailState = useGetData('merchants/profile/all');

  const { updateUser } = useSessionStorage();
  const [form] = Form.useForm();

  const onFinish = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    console.log('submit');
    try {
      const values = await form.validateFields();
      const payload = {
        identifier: values.email,
        password: values.password,
        entity: 'merchant',
      };

      const res = await mutateAsync(payload);
      sessionStorage.setItem('access_token', res.data.accessToken || '');
      updateUser(res?.data?.user);
      navigate('/pos');
      notification.success({
        message: 'Login Successful',
      });

      // const merchantRes = await getMerchantDetailState.mutateAsync();
      // if (merchantRes?.data?.length <= 1) {
      //   sessionStorage.setItem(
      //     'tenant_id',
      //     String(merchantRes?.data?.[0]?.id) || ''
      //   );
      //   notification.success({
      //     message: 'Login Successful',
      //     description: 'Welcome back! You have been logged in successfully.',
      //   });
      //   navigate('/');
      // } else {
      //   notification.success({
      //     message: 'Login Successful',
      //     description: 'Please select an account to continue.',
      //   });
      //   navigate('/auth/multiple-accounts', {
      //     state: { data: merchantRes?.data },
      //   });
      // }
    } catch (error: any) {
      console.error('Form validation error:', error);
      notification.error({
        message: 'Login Failed',
        description:
          error?.response?.data?.message ||
          'An error occurred during login. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-sm min-h-[400px] space-y-5">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-bold">Account Login</h1>
        <Form
          form={form}
          className="flex flex-col w-full min-h-[400px]"
          layout="horizontal"
          onFinish={onFinish}
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

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter password' }]}
            >
              <Password placeholder="Enter password" />
            </Form.Item>
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4 items-center">
              <Button
                type="link"
                onClick={() => navigate('/auth/forgot-password')}
              >
                Forgot Password?
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                size="large"
                className="w-[114px]"
              >
                Log in
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
