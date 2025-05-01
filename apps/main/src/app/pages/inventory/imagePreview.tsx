import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Image, Typography, Upload, Modal } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl: initialImageUrl } = location.state || {};

  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    window.history.back();
  };

  const handleImageChange = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result); // Update image preview
    };
    reader.readAsDataURL(file);
  };

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setImageUrl(null);
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="preview-page px-10 pb-20 bg-white min-h-screen">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
          />
          <Title level={4} className="!m-0">
            View Image:{' '}
            <span className="text-xs text-gray-300">cement10kg.jpg</span>
          </Title>
        </div>
        <div className="flex justify-end gap-2 mt-4 sm:mt-6">
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            customRequest={() => {}}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Change Upload</Button>
          </Upload>
          <Button type="primary" danger onClick={showDeleteConfirm}>
            Delete
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        {imageUrl ? (
          <Image src={imageUrl} alt="Product Image" width={400} />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleModalCancel}
        okText="Yes, Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this image?</p>
      </Modal>
    </div>
  );
};

export default PreviewPage;
