import { Typography } from 'antd';

interface PageIntroProps {
  title?: string;
  description?: string;
  actionButton?: React.ReactNode;
  children?: React.ReactNode;
}
const PageIntroBanner = ({
  title = 'Dashboard',
  description = 'Track and measure store performance and analytics here',
  actionButton,
  children,
}: PageIntroProps) => {
  return (
    <div className="flex flex-wrap justify-between gap-5 p-6 bg-white border-b">
      <div className="flex flex-col space-y-2">
        <Typography.Title level={4} className="!mb-0">
          {title}
        </Typography.Title>
        <Typography.Text className="text-gray-500">
          {description}
        </Typography.Text>
        {/* <div className="flex items-center gap-8 mt-4">
          <span className="text-blue-800 border-b-2 border-blue-800 cursor-pointer">
            Profile Information
          </span>
          <span className="text-gray-600 cursor-pointer hover:text-blue-800">
            Stores
          </span>
          <span className="text-gray-600 cursor-pointer hover:text-blue-800">
            Subscription
          </span>
        </div> */}
      </div>
      {actionButton && <div className="justify-end">{actionButton}</div>}

      {children && children}
    </div>
  );
};

export default PageIntroBanner;
