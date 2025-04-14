import { Button, Input, Form } from "antd";
import { Link} from "react-router";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { googleLogo } from "../../lib/assets/images";
import { header_logo } from "../../lib/assets/logo";

const onFinish = (values: any) => {
  console.log('Success:', values);
  // Handle registration logic here
};

const ForgotPassword = () => {
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

       
        <Form
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
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              placeholder="johndoe@email.com"
              className="h-[42px]"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              className="w-full h-[42px] bg-[#003399]"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Link to="/" className="text-[#003399] hover:underline">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
