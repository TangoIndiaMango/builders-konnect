import { Upload, Button, Avatar } from 'antd';
import type { UploadProps } from 'antd';

const WelcomeSection = () => {
  const handleUpload: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done') {
      // Handle successful upload
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            alt="Business Logo"
            className="w-full h-full object-cover"
            style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-blue-900">Welcome Onboard!</h2>
          <p className="text-gray-600">
            Complete your business profile by uploading your business logo
          </p>
          <Upload
            onChange={handleUpload}
            showUploadList={false}
          >
            <Button type="primary" className="w-fit">Upload Logo</Button>
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;