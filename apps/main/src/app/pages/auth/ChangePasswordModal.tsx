"use client";
import { Modal, Input, Button, Form, App } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useCreateData } from "../../../hooks/useApis"; 
import { useLocation, useNavigate } from "react-router-dom";

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

  const ChangePasswordRequest = useCreateData("auth/signup/add-password");

  const token = searchParams.get("token");
  const code = searchParams.get("code");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        token,
        code,
        current_password: values.currentPassword,
        password: values.newPassword,
        password_confirmation: values.confirmPassword,
        entity: "merchant",
      };

      await ChangePasswordRequest.mutateAsync({
        data: payload,
        config: { tenant_id: false },
      });

      notification.success({
        message: "Password Changed Successfully",
        description: "You can now login with your new password.",
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.destroy();
              onClose();
              navigate("/auth/login");
            }}
          >
            Go to Login
          </Button>
        ),
      });

      form.resetFields();
      onClose();
    } catch (error: any) {
      notification.error({
        message: "Password Change Failed",
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      console.error("Password change error:", error);
    }
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[{ required: true, message: "Please enter your current password" }]}
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
            { required: true, message: "Please enter your new password" },
            { min: 8, message: "Password must be at least 8 characters" },
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
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords do not match"));
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
            loading={ChangePasswordRequest.isLoading}
          >
            Change Password
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
