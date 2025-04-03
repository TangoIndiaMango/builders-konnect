import BankDetails from '../../components/auth/BankDetails';
import DocumentUpload from '../../components/auth/DocumentUpload';
import VendorDetails from '../../components/auth/VendorDetails';
import { Steps, Button, Form } from 'antd';
import React, { useState } from 'react';
import ConfirmModal from '../../components/common/ConfirmModal';
import SuccessModal from '../../components/common/SuccessModal';
import ErrorModal from '../../components/common/ErrorModal';
import { useCreateData } from '../../../hooks/useApis';

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

const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const RegisterVendor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const createVendorState = useCreateData('merchants/onboarding/complete');

  // const onFinish = (values: any) => {
  //   console.log('Form values:', values);
  //   // Handle form submission
  // };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && currentStep !== 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      const payload = {
        callback_url: 'http://localhost:4200/vendor/auth/create-password',
        business_name: values?.businessName,
        email: values?.email,
      };
      const res = await createVendorState.mutateAsync(payload);

      console.log(res);
      // const payload: CreateTenantPayload = {
      //   business_name: 'Schulist Group',
      //   category_id: 'cat_3PfF01QmZwV7eijBQzwDe',
      //   business_type: 'cat_iFtyywEWpKFdDrFR7uTvw',
      //   contact_name: 'Brendan Williamson',
      //   email: 'bunyanman@yopmail.com',
      //   phone: '07018199523',
      //   address: '0034 Gusikowski Meadow',
      //   state_id: 2996,
      //   city_id: 79259,
      //   street: '3706 Stark Crest',
      //   account_number: '0179278277',
      //   bank_id: 48,
      //   account_name: 'Warren Lehner',
      //   callback_url: 'https://builderkonnect.netlify.app',
      //   create_password_url: '', // assuming this is supposed to be a string, even if empty.
      //   media: [
      //     {
      //       name: 'tin',
      //       url: 'https://res.cloudinary.com/sbsc/raw/upload/v1743530163/Invoice%2010911.pdf',
      //       metadata: {
      //         identification_number: '01902009',
      //       },
      //     },
      //   ],
      // };
      // API call to submit form
      setConfirmModalOpen(false);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Form validation error:', error);
      setConfirmModalOpen(false);
      setErrorModalOpen(true);
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
            {currentStep === 0 && <VendorDetails />}
            {currentStep === 1 && <BankDetails />}
            {currentStep === 2 && <DocumentUpload />}
          </div>

          <div className="pt-6 mt-auto space-y-4">
            <div className="flex justify-end gap-4">
              {currentStep == 2 && (
                <Button
                  type="text"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
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
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => setConfirmModalOpen(true)}
                  size="large"
                  className="w-[114px]"
                >
                  Submit
                </Button>
              )}
            </div>

            {currentStep == 2 && (
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <span className="text-lg">ⓘ</span>
                <span className="text-sm">
                  Skip the document upload process if you do not have the
                  documents
                </span>
              </div>
            )}
          </div>
        </Form>
      </div>

      <ConfirmModal
        open={confirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={handleSubmit}
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
