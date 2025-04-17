import { Button, Input, Form, App } from "antd";
import { Link, useNavigate} from "react-router";
import { header_logo } from "../../lib/assets/logo";
import { useCreateData } from "../../../hooks/useApis";
import { ForgotPasswordValue } from "../../../utils/types";
import { frontendBaseUrl } from "../../layouts/Applayout";

const onFinish = (values: any) => {
  console.log('Success:', values);
  // Handle registration logic here
};

const ForgotPassword = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useCreateData('auth/forgot-password/reset');
  const [form] = Form.useForm();

  const onFinish = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields() as ForgotPasswordValue;
      const payload = {
        identifier: values.email,
        callback_url: frontendBaseUrl + '/auth/new-password'
      };

      const response = await mutateAsync(payload);
      if (response) {
        notification.success({
          message: 'Password Reset Request Successful',
          description: 'Please check your email for instructions.',
        });
        navigate('/auth/check-your-mail');
      }
    } catch (error: unknown) {
      console.error('Form validation error:', error);
      notification.error({
        message: 'Password Reset Request Failed',
        description: error instanceof Error ? error.message : 'An error occurred during password reset request. Please try again.',
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
              {isPending ? 'Loading...' : 'Reset Password'}
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
