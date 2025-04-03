import { useCreateData } from '../../../hooks/useApis';
import { Button, Form, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const RecoverPasswordState = useCreateData('auth/forgot-password/recover');

  const token = searchParams.get('token');
  const code = searchParams.get('code');

  const [form] = Form.useForm();

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
      const res = await RecoverPasswordState.mutateAsync(payload);
      navigate('/vendor/auth/login');
      console.log(res);
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-sm min-h-[400px] space-y-5">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-bold">Change Password</h1>
        <Form
          form={form}
          className="flex flex-col w-full min-h-[400px]"
          layout="horizontal"
          labelCol={{ span: 6 }}
          size="middle"
        >
          <div className="flex-1">
            <Form.Item
              label="New Password"
              name="password"
              rules={[{ required: true, message: 'Please enter new password' }]}
            >
              <Input placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please enter new password' }]}
            >
              <Input placeholder="Confirm new password" />
            </Form.Item>
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4">
              <Button
                type="primary"
                onClick={handleSubmit}
                size="large"
                className="w-[114px]"
                loading={RecoverPasswordState.isPending}
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

export default ChangePassword;
