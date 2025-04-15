import { useCreateData } from '../../../hooks/useApis';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";  
import Password from 'antd/es/input/Password';
import { RegisterFormValues } from '../../../utils/types';
import { googleLogo } from "../../lib/assets/images";
import { header_logo } from "../../lib/assets/logo";


const Register = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useCreateData('auth/signup');
  const [form] = Form.useForm();

  const onFinish = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields() as RegisterFormValues;
      const payload = {
        name: values.username,
        email: values.email,
        password: values.password,
        referral_source: values.how,
        opened_via: 'web',
        callback_url: 'http://localhost:4200/auth/verify-email'
      };

      const response = await mutateAsync(payload);
      if (response.data === 200) {
        notification.success({
          message: 'Registration Successful',
          description: 'Please check your email for verification.',
        });
        navigate('/auth/check-your-mail');
      }
    } catch (error: unknown) {
      console.error('Form validation error:', error);
      notification.error({
        message: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An error occurred during registration. Please try again.',
      });
    }
  };

  return (
 







    <div className="flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-[580px] bg-white rounded-lg p-16 border border-[rgba(0, 0, 0, 0.45)]">
      {/* Logo */}
      <div className="text-center mb-6">
        <Link to="/">
          <img src={header_logo} alt="Builders Connect Logo" className="h-12 mx-auto" />
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>

      {/* Google login Button */}
      <Button
        className="w-full h-[42px] flex items-center justify-center mb-6 border border-[rgba(0, 0, 0, 0.45)]"
        onClick={() => {
          console.log("Google login clicked");
        }}
      >
        <img src={googleLogo} alt="Google logo" className="w-5 h-5" />
        <span className="ml-2">Sign up with Google</span>
      </Button>

      <div className="font-semibold text-[20px] text-center mb-6">
        OR
      </div>

      <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              label="How did you hear about us?"
              name="how"
              rules={[{ required: true, message: 'Please tell us how you heard about us' }]}
            >
              <Input placeholder="Enter source" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter password' },
                { min: 8, message: 'Password must be at least 8 characters' }
              ]}
            >
              <Password placeholder="Enter password" />
            </Form.Item>

            
            <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              className="w-full h-[42px] bg-[#003399]"
            >
              {isPending ? 'Loading...' : 'Sign up'}
            </Button>
          </Form.Item>
        </Form>
     
        <div className='text-center mt-6'>
        <span className="text-gray-600">Already have an account?</span>{' '}
        <Link to="/auth/login" className="text-[#003399] hover:underline font-bold">
          Sign in
        </Link>
        </div>
    </div>
  </div>
  );
};

export default Register;
