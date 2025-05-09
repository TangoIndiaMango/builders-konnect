import { acceptedFileTypes } from '../../../utils/helper';
import { Button, Input, Typography, Upload } from 'antd';
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
}: {
  field: InfoField;
  isEdit: boolean;
  type?: 'text' | 'file';
  handleUpload?: (info: any) => void;
  handleChange?: (value: string) => void;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{field.label}</p>
      {isEdit && type === 'text' ? (
        <Input.TextArea
          autoSize
          defaultValue={field.value as string}
          className="min-h-10"
          onChange={(e) => handleChange?.(e.target.value)}
        />
      ) : isEdit && type === 'file' ? (
        <Upload
          accept={acceptedFileTypes}
          maxCount={1}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
          multiple={false}
        >
          <Button icon={<UploadOutlined />} size="small">
            Click to Upload
          </Button>
        </Upload>
      ) : (
        <Text>{field.value || '-'}</Text>
      )}
    </div>
  );
};

export default InfoField;
