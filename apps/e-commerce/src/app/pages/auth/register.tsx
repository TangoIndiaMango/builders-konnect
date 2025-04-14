import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { header_logo } from '../../lib/assets/logo';
import { googleLogo } from '../../lib/assets/images';

const Register = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    // Handle registration logic here
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

        {/* Google Sign Up Button */}
        <Button
          className="w-full h-[42px] flex items-center justify-center mb-6 border border-[rgba(0, 0, 0, 0.45)]"
          onClick={() => {
            console.log("Google sign up clicked");
          }}
        >
          <img src={googleLogo} alt="Google logo" className="w-5 h-5" />
          <span className="ml-2">Sign Up with Google</span>
        </Button>

        <div className="font-semibold text-[20px] text-center mb-6">
          OR
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              placeholder="Builder's Hub"
              className="h-[42px]"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              placeholder="johndoe@email.com"
              className="h-[42px]"
            />
          </Form.Item>

<Form.Item
            name="how"
            label="How did you hear about BKonnect"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              placeholder="Enter"
              className="h-[42px]"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              className="h-[42px]"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              className="w-full h-[42px] bg-[#003399]"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <Link to="/auth/login" className="text-[#003399] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
