import { Typography } from 'antd';

const ProfileBanner = () => {
  return (
    <div className="flex justify-between bg-white p-6 border-b">
      <div className="flex flex-col space-y-2">
        <Typography.Title level={4} className="!mb-0">My Profile</Typography.Title>
        <Typography.Text className="text-gray-500">
          Track and measure store performance and analytics here
        </Typography.Text>
        <div className="flex items-center gap-8 mt-4">
          <span className="text-blue-800 cursor-pointer border-b-2 border-blue-800">
            Profile Information
          </span>
          <span className="text-gray-600 cursor-pointer hover:text-blue-800">
            Stores
          </span>
          <span className="text-gray-600 cursor-pointer hover:text-blue-800">
            Subscription
          </span>
        </div>
      </div>
      <button className="h-fit px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
        View Storefront
      </button>
    </div>
  );
};

export default ProfileBanner;