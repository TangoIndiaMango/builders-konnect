import { Button } from 'antd';

const HeroBanner = ({
  title,
  description,
  buttonText,
  onButtonClick,
  backgroundColor,
}: {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  backgroundColor: string;
}) => {
  return (
    <div
      className="w-full bg-cover bg-center relative flex items-center px-14 py-10 md:py-20"
      style={{ backgroundColor }}
    >
      <div className="2xl:px-0">
        <div className="relative z-10 py-10 md:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFFFF] max-w-4xl  md:leading-[1.2] font-bold mb-6 md:mb-8">
            {title}
          </h1>
          <p className="text-sm md:text-base text-[#FFFFFF] max-w-3xl leading-[24px] md:leading-[28px] mb-6 md:mb-8">
            {description}
          </p>
          <Button
            type="default"
            size="large"
            onClick={onButtonClick}
            className="bg-white text-black rounded-md hover:bg-gray-100 border-none shadow-md"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
