import { ArrowRightOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Typography, Upload } from 'antd';
import { useState } from 'react';
import { acceptedFileTypes, beforeUpload } from '../../../utils/helper';
import { Documents } from '../../pages/profile/types';
import ActionIcon from '../common/ActionIcon';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { DocumentPreviewModal, getFileName } from './DocumentPreviewUrl';
import InfoField from './InfoField';

const { Text } = Typography;

interface DocumentsSectionProps {
  documents: Documents;
  isLoading: boolean;
  isEditRequested: boolean;
  setSelectedFiles: (files: any) => void;
  handleChange: (field: string, value: string) => void;
}

const DocumentsSection = ({
  documents,
  isLoading,
  isEditRequested,
  setSelectedFiles,
  handleChange,
}: DocumentsSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const handleOpen = (fileUrl: string | null) => {
    setCurrentFile(fileUrl);
    setModalOpen(true);
  };

  const handleFileSelect =
    (docType: 'CAC' | 'TIN' | 'proof_of_address') => (info: any) => {
      if (info) {
        setSelectedFiles((prev) => ({
          ...prev,
          [docType]: info,
        }));
      }
    };

  return (
    <div className="grid grid-cols-1 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm lg:grid-cols-[0.3fr_0.7fr]">
      <h3 className="mb-4 text-lg font-semibold">DOCUMENTS</h3>

      <SkeletonLoader active={isLoading} type="list">
        <div className="grid grid-cols-1 gap-x-24 gap-y-6 md:grid-cols-2">
          <InfoField
            field={{ label: 'CAC no.', value: documents?.CAC?.identifier }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('CAC', value)}
          />
          <InfoField
            type="file"
            field={{
              label: 'CAC document',
              value: (
                <div>
                  {documents?.CAC?.file ? (
                    <div className="flex items-center gap-2">
                      <Text className="!text-blue-600">
                        {getFileName(documents.CAC.file)}
                      </Text>
                      <ActionIcon
                        variant="subtle"
                        icon={<ArrowRightOutlined />}
                        onClick={() => handleOpen(documents.CAC.file)}
                      />
                    </div>
                  ) : (
                    <Upload
                      accept={acceptedFileTypes}
                      maxCount={1}
                      beforeUpload={beforeUpload}
                      onChange={handleFileSelect('CAC')}
                      multiple={false}
                    >
                      <Button icon={<UploadOutlined />} size="small">
                        Click to Upload
                      </Button>
                    </Upload>
                  )}
                </div>
              ),
            }}
            handleUpload={handleFileSelect('CAC')}
            isEdit={isEditRequested}
          />
          <InfoField
            field={{ label: 'TIN no.', value: documents?.TIN?.identifier }}
            isEdit={isEditRequested}
            handleChange={(value) => handleChange('TIN', value)}
          />
          <InfoField
            type="file"
            field={{
              label: 'TIN document',
              value: (
                <div>
                  {documents?.TIN?.file ? (
                    <div className="flex items-center gap-2">
                      <Text className="!text-blue-600">
                        {getFileName(documents.TIN.file)}
                      </Text>
                      <ActionIcon
                        variant="subtle"
                        icon={<ArrowRightOutlined />}
                        onClick={() => handleOpen(documents.TIN.file)}
                      />
                    </div>
                  ) : (
                    <Upload
                      accept={acceptedFileTypes}
                      maxCount={1}
                      beforeUpload={beforeUpload}
                      onChange={handleFileSelect('TIN')}
                    >
                      <Button icon={<UploadOutlined />} size="small">
                        Click to Upload
                      </Button>
                    </Upload>
                  )}
                </div>
              ),
            }}
            handleUpload={handleFileSelect('TIN')}
            isEdit={isEditRequested}
          />
          <InfoField
            type="file"
            field={{
              label: 'Proof of address document',
              value: (
                <div>
                  {documents?.proof_of_address?.file ? (
                    <div className="flex items-center gap-2">
                      <Text className="!text-blue-600">
                        {getFileName(documents.proof_of_address.file)}
                      </Text>
                      <ActionIcon
                        variant="subtle"
                        icon={<ArrowRightOutlined />}
                        onClick={() =>
                          handleOpen(documents.proof_of_address?.file || null)
                        }
                      />
                    </div>
                  ) : (
                    <Upload
                      accept={acceptedFileTypes}
                      maxCount={1}
                      beforeUpload={beforeUpload}
                      onChange={handleFileSelect('proof_of_address')}
                    >
                      <Button icon={<UploadOutlined />} size="small">
                        Click to Upload
                      </Button>
                    </Upload>
                  )}
                </div>
              ),
            }}
            handleUpload={handleFileSelect('proof_of_address')}
            isEdit={isEditRequested}
          />
        </div>
      </SkeletonLoader>
      <DocumentPreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fileUrl={currentFile}
      />
    </div>
  );
};

export default DocumentsSection;
