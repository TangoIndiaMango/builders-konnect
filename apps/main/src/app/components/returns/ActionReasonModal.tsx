import { Modal, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
interface ActionReasonModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (reason: string) => void;
  type: 'approve' | 'reject';
}

const ActionReasonModal = ({ open, onCancel, onSubmit, type }: ActionReasonModalProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = (values: { reason: string }) => {
    onSubmit(values.reason);
    form.resetFields();
    navigate(-1);
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
      centered
      width={500}
      title={type === 'reject' ? 'Reject Request' : 'Approve Request'}
    >
      <div className="mb-2 text-gray-600">
        Kindly enter a reason for {type === 'reject' ? 'rejection' : 'approval'} below
      </div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label={`Reason for ${type === 'reject' ? 'reject' : 'approval'}`}
          name="reason"
          rules={[{ required: true, message: `Enter reason for ${type === 'reject' ? 'rejection' : 'approval'}` }]}
        >
          <Input placeholder={`Enter reason for ${type === 'reject' ? 'rejection' : 'approval'}`} />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ActionReasonModal;