import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { bannerLogo, welcomeBanner } from '../../lib/assets/background';
import { Button } from 'antd';

const Banner = () => {
  const { clearUser } = useSessionStorage();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/auth/login');
  };

  return (
    <div
      className="md:h-[200px] w-full relative"
      style={{
        background: `linear-gradient(to right, rgba(0, 51, 153, 1), rgba(11, 28, 64, 1))`,
      }}
    >
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${welcomeBanner})`,
          mixBlendMode: 'overlay',
          opacity: '1',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="relative h-full px-8">
        <div className="flex items-center justify-between h-full mx-auto max-w-7xl">
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                Welcome Onboard!
              </h1>
              <p className="text-sm text-white">
                Complete your business profile by uploading your business logo
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="default"
                className="bg-white hover:bg-gray-100"
                onClick={() => {
                  navigate('/pos/profile');
                }}
              >
                Upload Logo
              </Button>
              <Button
                type="default"
                className="bg-white hover:bg-gray-100"
                onClick={handleLogout}
              >
                logout
              </Button>
            </div>
          </div>

          <div className="relative h-[200px] w-[200px]">
            <img
              src={bannerLogo}
              alt="logo"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
