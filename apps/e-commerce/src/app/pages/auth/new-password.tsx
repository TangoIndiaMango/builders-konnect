import { Button, Input, Form, App } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { header_logo } from "../../lib/assets/logo";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useCreateData } from "../../../hooks/useApis";
import { NewPasswordValue } from "../../../utils/types";

const NewPassword = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const { isPending, mutateAsync } = useCreateData('auth/forgot-password/recover');

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        password: values.password,
        password_confirmation: values.password,
        token: searchParams.get('token'),
        code: searchParams.get('code'),
        entity: "customer"
      };

      const response = await mutateAsync(payload);
      if (response) {
        notification.success({
          message: 'Password Reset Successful',
          description: 'Your password has been reset successfully. Please login with your new password.',
        });
        navigate('/auth/login');
      }
    } catch (error: unknown) {
      console.error('Password reset error:', error);
      notification.error({
        message: 'Password Reset Failed',
        description: error instanceof Error ? error.message : 'An error occurred during password reset. Please try again.',
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

        <h1 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h1>
      
        <Form
          form={form}
          name="reset-password"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              className="h-[42px]"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            label="Confirm New Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              className="h-[42px]"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              className="w-full h-[42px] bg-[#003399]"
            >
              {isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPassword;