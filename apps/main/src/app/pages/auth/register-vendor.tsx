import BankDetails from '../../components/auth/BankDetails';
import DocumentUpload from '../../components/auth/DocumentUpload';
import VendorDetails from '../../components/auth/VendorDetails';
import { Steps, Button, Form } from 'antd';
import React, { useState } from 'react';
import ConfirmModal from '../../components/common/ConfirmModal';
import SuccessModal from '../../components/common/SuccessModal';
import ErrorModal from '../../components/common/ErrorModal';

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
                <Button onClick={() => setCurrentStep(currentStep - 1)} size="large">
                  Previous
                </Button>
              )}
              {currentStep < 2 ? (
                <Button type="primary" onClick={handleNext} size="large" className="w-[114px]">
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
