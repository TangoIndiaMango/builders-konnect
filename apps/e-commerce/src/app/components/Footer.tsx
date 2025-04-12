import { Link } from 'react-router-dom';
import { Layout, Input, Button, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { appStore, paymentMethods, playStore, qrcode } from '../lib/assets/images';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="bg-[#1A1A1A] text-white p-0">
      <div className="container mx-auto px-4 py-8">
        {/* Email Subscription */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Exclusive</h3>
            <p className="" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Get 10% off your first order</p>
          </div>
          <Space.Compact style={{ width: '86%' }}>
            <Input 
              placeholder="Enter your email address" 
              className="bg-transparent h-[50px] border border-white placeholder:text-white" 
            />
            <Button type="primary" className="bg-white text-black hover:bg-gray-100 h-[50px]">
              Subscribe
            </Button>
          </Space.Compact>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-2" style={{color: 'rgba(250, 250, 250, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.46)'}}>
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Make Money with Us</h4>
            <ul className="space-y-2">
              <li><Link to="/sell">Sell on Builder's Konnect</Link></li>
              <li><Link to="/advertise">Advertise Your Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/orders">Your Orders</Link></li>
              <li><Link to="/returns">Return & Refund Policy</Link></li>
              <li><Link to="/shipping">Shipping Rates & Policies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Our Subsidiaries</h4>
            <ul className="space-y-2">
              <li><Link to="/academy">Builder's Academy</Link></li>
              <li><Link to="/workman">Builder's Workman</Link></li>
              <li><Link to="/mart">B-Hub's Mart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Download App</h4>
            <p className="text-sm mb-4">(For Android & iOS Users Only)</p>
            <div className='flex flex-row gap-3'>
              <img src={qrcode} alt="QR Code" className='w-32 h-32'  />
              <div className="flex flex-col space-y-7">
                <img src={playStore} alt="Play Store" className='w-30 h-30' />
                <img src={appStore} alt="App Store" className='w-30 h-30' />
              </div>
            </div>
            <Space className="mt-8" size="large">
          <Button type="text" icon={<FacebookOutlined />} className="text-white" />
          <Button type="text" icon={<TwitterOutlined />} className="text-white" />
          <Button type="text" icon={<InstagramOutlined />} className="text-white" />
          <Button type="text" icon={<LinkedinOutlined />} className="text-white" />
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
