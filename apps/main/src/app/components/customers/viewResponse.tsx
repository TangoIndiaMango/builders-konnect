import React, { useState } from 'react';
import { Modal, Button, Input, Avatar } from 'antd';
import { StarFilled, UserOutlined } from '@ant-design/icons';

interface ViewResponseProps {
  customerName: string;
  customerId: string;
  rating: number | string;
  feedback: string;
  response: string;
}

const ViewResponse = ({ customerName, customerId, rating, feedback, response }: ViewResponseProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal} className='border-none shadow-none'>View Response</Button>
      <Modal
        title="View Response"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="space-y-8">
          <section className='bg-gray-100 p-6 mt-8'>
          <div className="flex justify-between items-start space-x-2">
            <div className="flex items-center space-x-3">
            <Avatar size="large" style={{ backgroundColor: '#E6F7FF',color: '#1890ff' }} icon={<UserOutlined />} />
              <div>
                <p className="text-md text-gray-800">{customerName}</p>
                <p className="text-sm text-blue-600"><span className='font-semibold text-gray-500'>ID:</span>{customerId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
            {Array.from({ length: 5 }, (_, index) => (
              <StarFilled key={index} style={{ color: index < rating ? '#FFD700' : '#D3D3D3' }} />
            ))}
          </div>
          </div>
          
          <div className='text-sm py-3'>
            {feedback}
          </div>
          </section>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Response</label>
            <Input.TextArea
              value={response}
              readOnly
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewResponse;
