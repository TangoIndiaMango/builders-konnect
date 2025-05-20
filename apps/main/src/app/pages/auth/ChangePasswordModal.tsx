'use client';
import { Modal, Input, Button, Form, App } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useCreateData, usePutData } from '../../../hooks/useApis';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { notification } = App.useApp();

  const ChangePasswordRequest = usePutData('merchants/staff/update/profile');

  // const token = searchParams.get("token");
  // const code = searchParams.get("code");

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const payload = {
      current_password: values.currentPassword,
      password: values.newPassword,
      password_confirmation: values.confirmPassword,
      // entity: "merchant",
    };

    ChangePasswordRequest.mutate(payload, {
      onSuccess: () => {
        notification.success({
          message: 'Password Changed Successfully',
          description: 'You can now login with your new password.',
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.destroy();
                onClose();
                navigate('/auth/login');
              }}
            >
              Go to Login
            </Button>
          ),
        });

        form.resetFields();
        onClose();
      },
      onError: (error: any) => {
        notification.error({
          message: 'Password Change Failed',
          description:
            error?.response?.data?.message ||
            'Something went wrong. Please try again.',
        });
      },
    });
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
      destroyOnClose
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            { required: true, message: 'Please enter your current password' },
          ]}
        >
          <Input.Password
            placeholder="Enter current password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Please enter your new password' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password
            placeholder="Enter new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match')
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={ChangePasswordRequest.isPending}
          >
            Change Password
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
