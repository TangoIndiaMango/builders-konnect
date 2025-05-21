import { App, Form, Button, Input } from 'antd';
import { Link } from 'react-router';
import { googleLogo } from '../../lib/assets/images';
import { header_logo } from '../../lib/assets/logo';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCreateData } from '../../../hooks/useApis';
import { SignInFormValues } from '../../../utils/types';
import { setAuthUser } from '../../../utils/auth';

const Login = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useCreateData('auth/signin');
  const [form] = Form.useForm();
  const location = useLocation();
  const { from, message } = location.state || {};

  const onFinish = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const values = (await form.validateFields()) as SignInFormValues;
      const payload = {
        identifier: values.email,
        password: values.password,
        entity: 'customer',
      };

      const response = await mutateAsync(payload);
      sessionStorage.setItem('access_token', response.data.accessToken || '');

      // Check if response exists and has data
      if (response?.data) {
        // Save auth data
        setAuthUser({
          token: response.data.token,
          user: {
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
          },
        });

        notification.success({
          message: 'Login Successful',
          description: 'You have successfully logged in.',
          duration: 2,
        });
        // Add a small delay before navigation to ensure notification is seen
        setTimeout(() => {
          if (from) {
            navigate(from);
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'An error occurred during login. Please try again.';

      notification.error({
        message: 'Login Failed',
        description: errorMessage,
        duration: 4,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Show login to continue message if it exists */}
      {message && (
        <div className="bg-blue-50 p-4 mb-4 rounded-md">
          <p className="text-blue-700">{message}</p>
        </div>
      )}
      <div className="w-full max-w-[580px] bg-white rounded-lg p-16 border border-[rgba(0, 0, 0, 0.45)]">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <img
              src={header_logo}
              alt="Builders Connect Logo"
              className="h-12 mx-auto"
            />
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>

        {/* Google login Button */}
        <Button
          className="w-full h-[42px] flex items-center justify-center mb-6 border border-[rgba(0, 0, 0, 0.45)]"
          onClick={() => {
            console.log('Google login clicked');
          }}
        >
          <img src={googleLogo} alt="Google logo" className="w-5 h-5" />
          <span className="ml-2">Login with Google</span>
        </Button>

        <div className="font-semibold text-[20px] text-center mb-6">OR</div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="johndoe@email.com" className="h-[42px]" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              className="h-[42px]"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              className="w-full h-[42px] bg-[#003399]"
            >
              {isPending ? 'Loading...' : 'Sign in'}
            </Button>
          </Form.Item>
        </Form>

        <div className="flex md:flex-row flex-col justify-between items-center">
          <div>
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <Link
              to="/auth/register"
              className="text-[#003399] hover:underline font-bold"
            >
              Sign Up
            </Link>
          </div>
          <Link
            to="/auth/forgot-password"
            className="text-[#D92D20] hover:underline font-semibold"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
