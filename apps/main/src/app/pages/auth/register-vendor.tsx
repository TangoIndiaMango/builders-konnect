import BankDetails from '../../components/auth/BankDetails';
import DocumentUpload from '../../components/auth/DocumentUpload';
import VendorDetails from '../../components/auth/VendorDetails';
import { Steps, Button, Form, notification } from 'antd';
import { useState } from 'react';
import ConfirmModal from '../../components/common/ConfirmModal';
import SuccessModal from '../../components/common/SuccessModal';
import ErrorModal from '../../components/common/ErrorModal';
import { useCreateData, useUploadData } from '../../../hooks/useApis';
import { frontendBaseUrl } from './auth-outlets';
import { useEmailProvider } from '../../../hooks/useEmailProvider';

interface MediaMetadata {
  identification_number: string;
}

interface MediaItem {
  name: string;
  url: string;
  metadata: MediaMetadata;
}

interface CreateTenantPayload {
  business_name: string;
  category_id: string;
  business_type: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  state_id: number;
  city_id: number;
  street: string;
  account_number: string;
  bank_id: number;
  account_name: string;
  callback_url: string;
  create_password_url: string;
  media: MediaItem[];
}

const steps = [
  { title: 'Vendor Details' },
  { title: 'Bank Details' },
  { title: 'Document Upload' },
];

const RegisterVendor = () => {
  const { openEmailProvider } = useEmailProvider();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [mediaUrl, setMediaUrl] = useState<any>(null);

  const MediaState = useUploadData('shared/media/upload');
  const createVendorState = useCreateData('merchants/onboarding/complete');
  const validateBusinessState = useCreateData(
    'merchants/onboarding/validate-merchant-details'
  );
  const validateBankState = useCreateData('merchants/onboarding/validate-bank');

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        const value = await form.validateFields();
        const payload = {
          business_name: value?.businessName,
          category_id: value?.businessCategory,
          business_type: value?.businessType,
          contact_name: value?.contactName,
          email: value?.email,
          phone: value?.phoneNumber,
          address: value?.businessAddress,
          country_id: 161,
          state_id: value?.state,
          city_id: value?.cityRegion,
          street: value?.street,
        };

        setData({ ...payload });
        const res = await validateBusinessState.mutateAsync(payload);
        setCurrentStep(currentStep + 1);
        notification.success({
          message: 'Business Details Saved',
          description: 'Business details have been validated successfully.',
        });
      }

      if (currentStep === 1) {
        const value = await form.validateFields();
        const payload = {
          account_number: value?.accountNumber,
          bank_id: value?.bankName,
          account_name: value?.accountName,
          // bank_name: value?.contactName,
        };

        setData((prev: any) => ({ ...prev, ...payload }));
        const res = await validateBankState.mutateAsync(payload);
        setCurrentStep(currentStep + 1);
        notification.success({
          message: 'Bank Details Saved',
          description: 'Bank details have been validated successfully.',
        });
      }
    } catch (error: any) {
      notification.error({
        message: 'Validation Failed',
        description: error?.message || 'Please check your input and try again.',
      });
    }
  };

  const documentUpload = async () => {
    try {
      const values = await form.validateFields();
      if (
        values?.cacCertificate?.fileList?.length ||
        values?.proofOfAddress?.fileList?.length ||
        values?.tinCertificate?.fileList?.length
      ) {
        const formData = new FormData();
        values?.cacCertificate?.fileList?.forEach((file: any) => {
          formData.append('files', file.originFileObj);
        });
        values?.proofOfAddress?.fileList?.forEach((file: any) => {
          formData.append('files', file.originFileObj);
        });
        values?.tinCertificate?.fileList?.forEach((file: any) => {
          formData.append('files', file.originFileObj);
        });

        const uploadRes = await MediaState.mutateAsync(formData);
        setMediaUrl(uploadRes?.data || []);
        setConfirmModalOpen(true);
        notification.success({
          message: 'Documents Uploaded',
          description: 'Your documents have been uploaded successfully.',
        });
      }
    } catch (error: any) {
      notification.error({
        message: 'Upload Failed',
        description:
          error?.message || 'Failed to upload documents. Please try again.',
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload: CreateTenantPayload = {
        business_name: data?.business_name,
        category_id: data?.category_id,
        business_type: data?.business_type,
        contact_name: data?.contact_name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
        state_id: data?.state_id,
        city_id: data?.city_id,
        street: data?.street,
        account_number: data?.account_number,
        bank_id: data?.bank_id,
        account_name: data?.account_name,
        callback_url: frontendBaseUrl + '/vendor/auth/create-password',
        create_password_url: frontendBaseUrl + '/vendor/auth/create-password',
        media: mediaUrl?.length
          ? mediaUrl.map((url: string, index: number) => ({
              name: ['cac', 'address', 'tin'][index],
              url,
              metadata: {
                identification_number:
                  values?.[['cacNumber', 'address', 'tinNumber'][index]] || '',
              },
            }))
          : [],
      };

      const res = await createVendorState.mutateAsync(payload);
      setConfirmModalOpen(false);
      setSuccessModalOpen(true);
      notification.success({
        message: 'Registration Successful',
        description:
          'Your vendor account creating is in progress, please, check your mail',
        btn: (
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              notification.destroy();
              openEmailProvider(data?.email);
            }}
          >
            Go to Email
          </Button>
        ),
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      setConfirmModalOpen(false);
      setErrorModalOpen(true);
      notification.error({
        message: 'Registration Failed',
        description:
          error?.message ||
          'Failed to create vendor account. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-sm min-h-[800px] space-y-5">
      <Steps current={currentStep} items={steps} className="mb-8" />
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <Form
          form={form}
          className="flex flex-col w-full min-h-[600px]"
          layout="horizontal"
          // onFinish={onFinish}
          labelCol={{ span: 6 }}
          size="middle"
        >
          <div className="flex-1">
            {currentStep === 0 && <VendorDetails form={form} />}
            {currentStep === 1 && <BankDetails form={form} />}
            {currentStep === 2 && <DocumentUpload />}
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4 items-center">
              {currentStep == 2 && (
                <Button type="text" onClick={() => setConfirmModalOpen(true)}>
                  Skip
                </Button>
              )}
              {currentStep !== 0 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  size="large"
                >
                  Previous
                </Button>
              )}
              {currentStep < 2 ? (
                <Button
                  type="primary"
                  onClick={handleNext}
                  size="large"
                  className="w-[114px]"
                  loading={
                    validateBusinessState.isPending ||
                    validateBankState.isPending
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={documentUpload}
                  size="large"
                  className="w-[114px]"
                  loading={MediaState.isPending}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>

      <ConfirmModal
        open={confirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={handleSubmit}
        pending={createVendorState.isPending}
      />

      <SuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />

      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      />
    </div>
  );
};

export default RegisterVendor;
