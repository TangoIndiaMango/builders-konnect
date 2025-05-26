import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import Hero from '../components/ProductDetails/Hero';
import { Input, Button, Form, Row, Col, message } from 'antd';
import { useState } from 'react';

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      // TODO: Implement actual form submission
      console.log('Form values:', values);
      message.success('Message sent successfully!');
      form.resetFields();
    } catch {
      message.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Hero title="Contact Us" />

      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[#000000D9] text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
              Hello!
            </h3>
            <p className="text-[#00000073] mb-8">
              At Builder’s Konnect, we value our vendors, buyers, and partners.
              Whether you have a question, need support, or want to explore
              business opportunities, our team is here to assist you.
            </p>

            <div className="space-y-8">
              <div>
                <div className="flex  items-center gap-2">
                  <MailOutlined className="text-[#000000D9] text-lg md:text-2xl" />
                  <span className="font-medium text-[#000000D9] text-base md:text-xl">
                    Email
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[#00000073]">
                    Support:{' '}
                    <a href="mailto:support@builderskonnect.com">
                      <span className="text-[#003399]">
                        support@builderskonnect.com
                      </span>{' '}
                    </a>
                  </p>
                  <p className="mt-1 text-[#00000073]">
                    Partnership & Advertising:{' '}
                    <span>
                      <a
                        href="mailto:advertise@builderskonnect.com"
                        className="text-[#003399]"
                      >
                        advertise@builderskonnect.com
                      </a>
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="md:text-xl text-base text-black" />
                  <span className="text-black md:text-xl text-base font-medium">
                    Phone
                  </span>
                </div>
                <p className="text-[#00000073]">
                  Customer Support:
                  <span className="text-[#000000D9] "> [+123 456 7890]</span>
                </p>
                <p className="text-[#00000073]">
                  Vendor Assistance:
                  <span className="text-[#000000D9]"> [+123 456 7891]</span>
                </p>
              </div>

              <div>
                <h4 className="font-medium flex gap-2 items-center text-[#000000D9] mb-1">
                  <MobileOutlined />
                  Connect With Us
                </h4>
                <div className="flex gap-4 text-2xl text-blackapp">
                  <a href="https://www.facebook.com/share/1FbH5URBzD/?mibextid=wvvXIf" target="_blank" rel="noopener noreferrer">
                    <FacebookFilled />
                  </a>
                  <a href="https://x.com/builderskonnect?s=11&t=4QkS0C5XHKLFtOsOYKTww" target="_blank" rel="noopener noreferrer">
                    <TwitterSquareFilled />
                  </a>
                  <a href="https://www.instagram.com/builderskonnectng?utm_source=qr&igsh=MTI3Z2htbnN5OGo4dA==" target="_blank" rel="noopener noreferrer">
                    <InstagramFilled />
                  </a>
                  <a href="https://www.tiktok.com/@builderskonnect?_t=ZM-8wbEDdyuAG0&_r=1" target="_blank" rel="noopener noreferrer">
                    <LinkedinFilled />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Form 
              form={form}
              layout="vertical" 
              className="space-y-4"
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item 
                    label="First Name" 
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                    label="Last Name" 
                    name="lastName"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item 
                label="Email Address" 
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email address' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input type="email" placeholder="Enter" />
              </Form.Item>

              <Form.Item 
                label="Phone Number" 
                name="phone"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input placeholder="Enter" />
              </Form.Item>

              <Form.Item 
                label="Message" 
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <Input.TextArea rows={4} placeholder="Enter" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="bg-[#003399] hover:bg-[#002766] text-white w-full h-[40px]"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
