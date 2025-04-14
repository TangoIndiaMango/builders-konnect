import { Button, Input, Form } from "antd";
import { Link } from "react-router";
import { header_logo } from "../../lib/assets/logo";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const onFinish = (values: any) => {
  console.log('Success:', values);
  // Handle registration logic here
};

const NewPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[580px] bg-white rounded-lg p-16 border border-[rgba(0, 0, 0, 0.45)]">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <img src={header_logo} alt="Builders Connect Logo" className="h-12 mx-auto" />
          </Link>
        </div>

      
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
   
   
          <Form.Item
            name="newPassword"
            label="New Password"
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

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: 'Please input your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                }
              })
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
              Reset Passwords
            </Button>
          </Form.Item>
        </Form>

       
      </div>
    </div>
  )
}

export default NewPassword