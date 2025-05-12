import { acceptedFileTypes } from '../../../utils/helper';
import { Button, Input, Typography, Upload, Select, UploadFile } from 'antd';
import React from 'react';
import { beforeUpload } from '../../../utils/helper';
import { UploadOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface InfoField {
  label: string;
  value: React.ReactNode;
}

const InfoField = ({
  field,
  isEdit,
  handleUpload,
  type = 'text',
  handleChange,
  options,
  placeholder,
  value,
  fileList,
}: {
  field: InfoField;
  isEdit: boolean;
  type?: 'text' | 'file' | 'select';
  handleUpload?: (info: any) => void;
  handleChange?: (value: string) => void;
  options?: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  fileList?: UploadFile[];
}) => {
  // Renderers for each type
  const renderText = () => (
    <Input.TextArea
      autoSize
      value={value}
      className="min-h-10"
      onChange={(e) => handleChange?.(e.target.value)}
      placeholder={placeholder}
    />
  );

  const renderFile = () => (
    <Upload
      accept={acceptedFileTypes}
      maxCount={1}
      beforeUpload={beforeUpload}
      onChange={handleUpload}
      multiple={false}
      fileList={fileList}
    >
      <Button icon={<UploadOutlined />} size="small">
        Click to Upload
      </Button>
    </Upload>
  );

  const renderSelect = () => (
    <Select
      className="w-full"
      placeholder={placeholder ?? 'Select'}
      options={options}
      onChange={handleChange}
      showSearch
      value={value}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  );

  let inputNode: React.ReactNode;
  switch (type) {
    case 'file':
      inputNode = renderFile();
      break;
    case 'select':
      inputNode = renderSelect();
      break;
    case 'text':
    default:
      inputNode = renderText();
      break;
  }

  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{field.label}</p>
      {isEdit ? inputNode : <Text>{value || field.value || '-'}</Text>}
    </div>
  );
};

export default InfoField;
