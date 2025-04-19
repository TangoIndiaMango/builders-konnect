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
import { Input, Button, Form, Row, Col } from 'antd';

const ContactPage = () => {
  return (
    <div>
      <Hero title="Contact Us" />

      <div className="py-16 px-4 md:px-12">
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
                <div className="flex gap-4 text-2xl text-[#000000D9]">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FacebookFilled />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <TwitterSquareFilled />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <InstagramFilled />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <LinkedinFilled />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Form layout="vertical" className="space-y-4">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Email Address" name="email">
                <Input type="email" placeholder="Enter" />
              </Form.Item>

              <Form.Item label="Phone Number" name="phone">
                <Input placeholder="Enter" />
              </Form.Item>

              <Form.Item label="Message" name="message">
                <Input.TextArea rows={4} placeholder="Enter" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#1d3b87] hover:bg-[#152b6c] text-white w-full"
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
