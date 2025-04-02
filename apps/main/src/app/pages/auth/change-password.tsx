import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  //   console.log('Form values:', values);
  //   // Handle form submission
  // };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      // API call to submit form
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
          // onFinish={onFinish}
          labelCol={{ span: 6 }}
          size="middle"
        >
          <div className="flex-1">
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter new password' },
              ]}
            >
              <Input placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please enter new password' },
              ]}
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
