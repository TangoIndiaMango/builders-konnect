import { bannerLogo, bgPattern } from '../../utils/assets/background';
import { Button } from 'antd';

const Banner = () => {
  console.log('bgPattern:', bgPattern);

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
          backgroundImage: `url(${bgPattern})`,
          mixBlendMode: 'overlay',
          opacity: '1',
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat',
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
            <Button type="default" className="bg-white hover:bg-gray-100">
              Upload Logo
            </Button>
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
