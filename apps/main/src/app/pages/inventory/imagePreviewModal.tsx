import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Image, Typography, Upload, Modal } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { beforeUpload } from '../../../utils/helper';

const { Title } = Typography;

interface ImagePreviewModalProps {
  image: any;
  isOpen: boolean;
  onClose: () => void;
  onChange: (file: File, uid: string) => void;
  onDelete: (uid: string) => void;
  imageUid: string;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
}

const ImagePreviewModal = ({
  image,
  isOpen,
  onClose,
  onChange,
  onDelete,
  imageUid,
  isDeleteOpen,
  setIsDeleteOpen,
}: ImagePreviewModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const customUpload = async ({ file, onSuccess, onError }) => {
    try {
      // Your upload logic here (e.g., call your API)
      // await uploadToBackend(file);
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      maskClosable={false}
      width="100vw"
      style={{ top: 0, left: 0, padding: 0 }}
      styles={{
        body: {
          height: '100vh',
          width: '100vw',
          padding: 0,
          background: '#fff',
          overflowX: 'hidden',
        },
      }}
    >
      <div className="fixed inset-0 flex flex-col justify-between bg-white overflow-x-hidden">
        <div className="flex items-center justify-between px-10 pt-8">
          <div className="flex items-center">
            {/* <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleCancel}
              /> */}
            <Title level={4} className="!m-0">
              View Image
              {/* <span className="text-xs text-gray-300">cement10kg.jpg</span> */}
            </Title>
          </div>
        </div>

        {/* Centered Image */}
        <div className="flex-1 flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt="Product Image"

              preview={false}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>

        {/* Footer with Close Button */}
        <div className="flex justify-center pb-8">
          <Button type="primary" onClick={onClose} size="large">
            Close
          </Button>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Confirm Deletion"
          open={isDeleteOpen}
          onOk={() => {
            onDelete(imageUid);
            setIsDeleteOpen(false);
          }}
          onCancel={() => setIsDeleteOpen(false)}
          okText="Yes, Delete"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this image?</p>
        </Modal>
      </div>
    </Modal>
  );
};

export default ImagePreviewModal;
