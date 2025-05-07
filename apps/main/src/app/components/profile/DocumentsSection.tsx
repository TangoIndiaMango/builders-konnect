import { ArrowRightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useState } from 'react';
import { Documents } from '../../pages/profile/types';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { DocumentPreviewModal, getFileName } from './DocumentPreviewUrl';
import ActionIcon from '../common/ActionIcon';

const { Text } = Typography;

interface DocumentsSectionProps {
  documents: Documents;
  isLoading: boolean;
}

const DocumentsSection = ({ documents, isLoading }: DocumentsSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const handleOpen = (fileUrl: string | null) => {
    setCurrentFile(fileUrl);
    setModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm md:grid-cols-2">
      <h3 className="mb-4 text-lg font-semibold">DOCUMENTS</h3>

      <SkeletonLoader active={isLoading} type="list">
        <div className="grid grid-cols-1 gap-x-24 gap-y-6 md:grid-cols-2">
          <div>
            <Text className="block mb-1 text-gray-500">CAC no.</Text>
            <Text className="text-gray-900">
              {documents?.CAC?.identifier || 'N/A'}
            </Text>
          </div>
          <div>
            <Text className="block mb-1 text-gray-500">CAC document</Text>

            {documents?.CAC?.file ? (
              <div className="flex items-center gap-2">
                <Text className="text-blue-600">
                  {getFileName(documents?.CAC?.file || '')}
                </Text>
                <ActionIcon
                  variant="subtle"
                  icon={<ArrowRightOutlined />}
                  onClick={() => handleOpen(documents?.CAC?.file)}
                />
              </div>
            ) : (
              <span className="text-gray-400">N/A</span>
            )}
          </div>
          <div>
            <Text className="block mb-1 text-gray-500">TIN no.</Text>
            <Text className="text-gray-900">
              {documents?.TIN?.identifier || 'N/A'}
            </Text>
          </div>
          <div>
            <Text className="block mb-1 text-gray-500">TIN document</Text>
            {documents?.TIN?.file ? (
              <div className="flex items-center gap-2">
                <Text className="text-blue-600">
                  {getFileName(documents?.TIN?.file || '')}
                </Text>
                <ActionIcon
                  variant="subtle"
                  icon={<ArrowRightOutlined />}
                  onClick={() => handleOpen(documents?.TIN?.file)}
                />
              </div>
            ) : (
              <span className="text-gray-400">N/A</span>
            )}
          </div>
          <div className="md:col-span-2">
            <Text className="block mb-1 text-gray-500">Proof of address</Text>
            {documents?.proof_of_address?.file ? (
              <div className="flex items-center gap-2">
                <Text className="text-blue-600">
                  {getFileName(documents?.proof_of_address?.file || '')}
                </Text>
                <ActionIcon
                  variant="subtle"
                  icon={<ArrowRightOutlined />}
                  onClick={() => handleOpen(documents?.CAC?.file)}
                />
              </div>
            ) : (
              <span className="text-gray-400">N/A</span>
            )}
          </div>
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
