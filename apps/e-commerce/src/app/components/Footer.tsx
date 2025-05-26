import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { appStore, paymentMethods, playStore, qrcode } from '../lib/assets/images';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Add a small delay before navigation to allow smooth scroll
    setTimeout(() => {
      navigate(path);
    }, 500);
  };
  return (
    <AntFooter className="!bg-[#1A1A1A] !text-white !p-0">
      <div className="container mx-auto px-4 py-8">
        {/* Email Subscription */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Exclusive</h3>
            <p className="" style={{color: '!rgba(250, 250, 250, 0.7)'}}>Get 10% off your first order</p>
          </div>
          <Space.Compact style={{ width: '86%' }}>
            <Input 
              placeholder="Enter your email address" 
              className="!bg-transparent h-[50px] border border-white placeholder:text-white" 
            />
            <Button type="primary" className="!bg-white !text-black hover:!bg-gray-100 !h-[50px]">
              Subscribe
            </Button>
          </Space.Compact>
        </div>  

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-2" style={{color: '!rgba(250, 250, 250, 0.7)', borderBottom: '1px solid !rgba(255, 255, 255, 0.46)'}}>
          <div>
            <h4 className="font-bold mb-4 !text-white">About</h4>
            <ul className="space-y-2">
              <li><a onClick={() => handleNavigation('/about')} style={{ cursor: 'pointer' }} className="!text-white">About</a></li>
              <li><a onClick={() => handleNavigation('/contact')} style={{ cursor: 'pointer' }} className="!text-white">Contact</a></li>
              <li><a onClick={() => handleNavigation('/terms')} style={{ cursor: 'pointer' }} className="!text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 !text-white">Make Money with Us</h4>
            <ul className="space-y-2">
              <li><a onClick={() => handleNavigation('/sell')} style={{ cursor: 'pointer' }} className="!text-white">Sell on Builder's Konnect</a></li>
              <li><a onClick={() => handleNavigation('/advertise')} style={{ cursor: 'pointer' }} className="!text-white">Advertise Your Products</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 !text-white">Customer Service</h4>
            <ul className="space-y-2">
              <li><a onClick={() => handleNavigation('/orders')} style={{ cursor: 'pointer' }} className="!text-white">Your Orders</a></li>
              <li><a onClick={() => handleNavigation('/returns')} style={{ cursor: 'pointer' }} className="!text-white">Return & Refund Policy</a></li>
              <li><a onClick={() => handleNavigation('/shipping')} style={{ cursor: 'pointer' }} className="!text-white">Shipping Rates & Policies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 !text-white">Our Subsidiaries</h4>
            <ul className="space-y-2">
              <li><a onClick={() => handleNavigation('/academy')} style={{ cursor: 'pointer' }} className="!text-white">Builder's Academy</a></li>
              <li><a onClick={() => handleNavigation('/workman')} style={{ cursor: 'pointer' }} className="!text-white">Builder's Workman</a></li>
              <li><a onClick={() => handleNavigation('/mart')} style={{ cursor: 'pointer' }} className="!text-white">B-Hub's Mart</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-2 !text-[rgba(250, 250, 250, 0.57)] text-sm">Save $3 with App New User Only</h4>
            <div className='flex flex-row gap-4 items-start'>
              <img src={qrcode} alt="QR Code" className='!w-24 !h-24' />
              <div className="flex flex-col gap-2">
                <a href="#" className="block">
                  <img src={playStore} alt="Get it on Google Play" className='!h-10 w-auto' />
                </a>
                <a href="#" className="block">
                  <img src={appStore} alt="Download on the App Store" className='!h-10 w-auto' />
                </a>
              </div>
            </div>
            <Space className="mt-8" size="large">
          <a href="https://www.facebook.com/share/1FbH5URBzD/?mibextid=wvvXIf" target="_blank" rel="noopener noreferrer">
            <Button type="text" icon={<FacebookOutlined />} className="!text-white" />
          </a>
          <a href="https://x.com/builderskonnect?s=11&t=4QkS0C5XHKLFtOsOYKTww" target="_blank" rel="noopener noreferrer">
            <Button type="text" icon={<TwitterOutlined />} className="!text-white" />
          </a>
          <a href="https://www.instagram.com/builderskonnectng?utm_source=qr&igsh=MTI3Z2htbnN5OGo4dA==" target="_blank" rel="noopener noreferrer">
            <Button type="text" icon={<InstagramOutlined />} className="!text-white" />
          </a>
          <a href="https://www.tiktok.com/@builderskonnect?_t=ZM-8wbEDdyuAG0&_r=1" target="_blank" rel="noopener noreferrer">
            <Button type="text" icon={<LinkedinOutlined />} className="!text-white" />
          </a>
        </Space>
          
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm md:ml-[300px]" style={{color: 'rgba(250, 250, 250, 0.29)'}}>Copyright Builder's Konnect {new Date().getFullYear()}. All right reserved</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <img src={paymentMethods} alt="Payment methods" width={400} height={200} />
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
