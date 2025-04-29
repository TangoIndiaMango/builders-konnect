import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import NumericInput from '../common/NumericInput';

const acceptedFileTypes = '.pdf,.doc,.docx';
const maxFileSize = 10 * 1024 * 1024; // 10MB

const DocumentUpload = () => {
  const [fileList, setFileList] = useState<{
    cac?: UploadFile[];
    tin?: UploadFile[];
    address?: UploadFile[];
  }>({});

  const beforeUpload = (file: File) => {
    const isAccepted = acceptedFileTypes
      .split(',')
      .some((type) => file.name.toLowerCase().endsWith(type.toLowerCase()));

    if (!isAccepted) {
      message.error('You can only upload PDF or Word documents!');
    }

    const isLt5M = file.size < maxFileSize;
    if (!isLt5M) {
      message.error('File must be smaller than 5MB!');
    }

    return isAccepted && isLt5M ? false : Upload.LIST_IGNORE;
  };

  return (
    <div className="space-y-6">
      <Form.Item
        label="CAC Number"
        name="cacNumber"
        rules={[
          {
            required: true,
            message: 'Please enter CAC number',
            min: 8,
            max: 16,
          },
        ]}
      >
        <NumericInput placeholder="Enter registration number" />
      </Form.Item>

      <Form.Item
        label="Certificate"
        name="cacCertificate"
        required
        extra="Upload a copy of your Corporate Affairs Commission Certificate"
      >
        <Upload
          accept={acceptedFileTypes}
          maxCount={1}
          beforeUpload={beforeUpload}
          listType="text"
          onChange={({ fileList }) =>
            setFileList({ ...fileList, cac: fileList })
          }
        >
          <Button icon={<UploadOutlined />}>Click to upload certificate</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="TIN"
        name="tinNumber"
        rules={[
          { required: true, message: 'Please enter TIN', min: 8, max: 16 },
        ]}
      >
        <Input placeholder="Enter tax identification number" />
      </Form.Item>

      <Form.Item
        label="Certificate"
        name="tinCertificate"
        required
        extra="Upload a copy of your Tax Identification Certificate"
      >
        <Upload
          accept={acceptedFileTypes}
          maxCount={1}
          beforeUpload={beforeUpload}
          listType="text"
          onChange={({ fileList }) =>
            setFileList({ ...fileList, tin: fileList })
          }
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Proof of Address"
        name="proofOfAddress"
        required
        extra="Upload a copy of your utility bill for proof of address"
      >
        <Upload
          accept={acceptedFileTypes}
          maxCount={1}
          beforeUpload={beforeUpload}
          listType="text"
          onChange={({ fileList }) =>
            setFileList({ ...fileList, address: fileList })
          }
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <div className="flex items-center justify-center gap-2 py-5">
        <span className="text-lg text-blue-600">ⓘ</span>
        <span className="text-sm">
          Skip the document upload process if you do not have the documents
        </span>
      </div>
    </div>
  );
};

export default DocumentUpload;
