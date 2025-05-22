import { EyeInvisibleOutlined } from '@ant-design/icons';
import { EyeTwoTone } from '@ant-design/icons';
import { useCreateData } from '../../../hooks/useApis';
import { Button, Form, Input, App } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const RecoverPasswordState = useCreateData('auth/signup/add-password');
  const { notification } = App.useApp();

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
      const res = await RecoverPasswordState.mutateAsync({
        data: payload,
        config: { tenant_id: false },
      });

      notification.success({
        message: 'Password Added Successfully',
        description:
          'Your password has been added. You can now login with your new password.',
        btn: (
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              notification.destroy();

              navigate('/auth/login');
            }}
          >
            Go to Login
          </Button>
        ),
      });

      console.log(res);
    } catch (error: any) {
      console.error('Form validation error:', error);
      notification.error({
        message: 'Password Change Failed',
        description:
          error?.response?.data?.message ||
          'Failed to change password. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-sm min-h-[400px] space-y-5">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-bold">Add Password</h1>
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
              <Input.Password
                placeholder="Enter new password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please enter new password' }]}
            >
              <Input.Password
                placeholder="Confirm new password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
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
