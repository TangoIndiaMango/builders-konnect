import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useCreateData, useFetchDataSeperateLoading, useGetData } from '../../../hooks/useApis';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Password from 'antd/es/input/Password';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { EyeTwoTone } from '@ant-design/icons';
import { VendorProfile } from '../profile/types';

const Login = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateData('auth/signin');

  const getMerchantDetailState = useGetData('merchants/profile/all');
  const profileData = useGetData(`merchants/profile/view`);
  // const profile = profileData?.data?.data as VendorProfile;
  const { updateUser, updateBusinessProfile } = useSessionStorage();
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

      // navigate('/');
      // notification.success({
      //   message: 'Login Successful',
      // });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const merchantRes = await getMerchantDetailState.mutateAsync();
      if (merchantRes?.data?.length <= 1) {
        sessionStorage.setItem(
          'tenant_id',
          String(merchantRes?.data?.[0]?.id) || ''
        );
        const profileRes = await profileData.mutateAsync();
        updateBusinessProfile(profileRes?.data);
        notification.success({
          message: 'Login Successful',
          description: 'Welcome back! You have been logged in successfully.',
        });
        navigate('/');
      } else {
        notification.success({
          message: 'Login Successful',
          description: 'Please select an account to continue.',
        });
        navigate('/auth/multiple-accounts', {
          state: { data: merchantRes?.data },
        });
      }
    } catch (error: any) {
      console.error('Form validation error:', error);
      notification.error({
        message: 'Login Failed',
        description:
          error?.message ||
          'An error occurred during login. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-sm min-h-[350px] space-y-5">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-bold">Account Login</h1>
        <Form
          form={form}
          className="flex flex-col w-full min-h-[300px]"
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
              <Password
                placeholder="Enter password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex items-center justify-end gap-4">
              <Button
                type="link"
                onClick={() => navigate('/auth/forgot-password')}
              >
                Forgot Password?
              </Button>
              <Button
                loading={isPending}
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
