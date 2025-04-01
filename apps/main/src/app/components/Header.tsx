import { useNavigate } from 'react-router-dom';
import { header_logo } from '../utils/assets/logo';
import { Button, Layout } from 'antd';

const Header = () => {
  const { Header: AntHeader } = Layout;
  const navigate = useNavigate();
  return (
    <AntHeader className="bg-white px-8 h-[80px] flex items-center shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div>
          <img
            src={header_logo}
            alt="Builders Konnect Logo"
            className="object-contain h-8"
          />
        </div>

        <Button onClick={() => navigate('/auth/login')}>Log in</Button>
      </div>
    </AntHeader>
  );
};

export default Header;
