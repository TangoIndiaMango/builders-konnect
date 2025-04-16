import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateData } from '../../../hooks/useApis';
import { App } from 'antd';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { notification } = App.useApp();
  const { mutateAsync } = useCreateData('auth/signup/verify-email');
  
  const [verificationStatus, setVerificationStatus] = useState<{
    success: boolean;
    message: string;
    isLoading: boolean;
  }>({
    success: false,
    message: 'Verifying your email...',
    isLoading: true
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const code = searchParams.get('code');
        const token = searchParams.get('token');
        const entity = "customer";

        if (!code || !token) {
          setVerificationStatus({
            success: false,
            message: 'Missing verification parameters. Please check your email link.',
            isLoading: false
          });
          return;
        }

        const payload = {
          entity,
          token,
          code,
        };

        const response = await mutateAsync(payload);
        
        if (response) {
          setVerificationStatus({
            success: true,
            message: 'Email verified successfully! Redirecting to login...',
            isLoading: false
          });
          notification.success({
            message: 'Success',
            description: 'Email verification successful. Please login.',
          });
          setTimeout(() => navigate('/auth/login'), 2000);
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || err.message || 'Email verification failed. Please try again.';
        
        // Handle already verified case
        if (errorMessage.includes('already verified')) {
          setVerificationStatus({
            success: true,
            message: 'Email already verified. You can proceed to login.',
            isLoading: false
          });
          setTimeout(() => navigate('/auth/login'), 2000);
          return;
        }

        setVerificationStatus({
          success: false,
          message: errorMessage,
          isLoading: false
        });
        notification.error({
          message: 'Verification Failed',
          description: errorMessage
        });
      }
    };

    verifyEmail();
  }, [mutateAsync, navigate, notification, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          <div className={`mt-4 text-lg ${verificationStatus.success ? 'text-green-600' : 'text-gray-600'}`}>
            {verificationStatus.message}
          </div>
          {verificationStatus.isLoading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003399] mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
