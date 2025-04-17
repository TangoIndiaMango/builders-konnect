import { MailOutlined } from '@ant-design/icons';

const CheckYourMail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="animate-bounce">
            <MailOutlined className="text-[80px] text-[#003399]" />
          </div>
          <div className="mt-4">
            <div className={`text-lg text-[#003399]`}>
              Please check your email for verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckYourMail;