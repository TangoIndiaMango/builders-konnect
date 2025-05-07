import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { usePutData } from '../../../hooks/useApis';

interface AddResponseProps {
    reviewId: string | number;
  }

const AddResponse = ({ reviewId }: AddResponseProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseText, setResponseText] = useState('');
  const {mutate,isLoading}= usePutData(`merchants/reviews/${reviewId}`)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSend = () => {
    mutate(responseText)
    setIsModalVisible(false);
    setResponseText('');
  };

  const handleTextChange = (e) => {
    setResponseText(e.target.value);
  };

  return (
    <>
      <Button onClick={showModal} className=' border-none shadow-none'>Respond</Button>
      <Modal
        title="Response to Feedback"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="send" type="primary" loading={isLoading} onClick={handleSend}>
            Send
          </Button>,
        ]}
      >
        <Input.TextArea
          value={responseText}
          onChange={handleTextChange}
          placeholder="Enter your response here"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Modal>
    </>
  );
};

export default AddResponse;
