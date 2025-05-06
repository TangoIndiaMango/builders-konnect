import { Modal, Form, Input, Select, notification } from 'antd';
import { FC, useEffect } from 'react';
import { Stores, Roles, Staff } from '../../pages/staff/types';
import NumericInput from '../common/NumericInput';

interface StaffFormValues {
  name: string;
  email: string;
  phone: string;
  location_ids: string[] | null;
  role_id: number | null;
}

interface StaffFormModalProps {
  open: boolean;
  onClose: () => void;
  stores: Stores[];
  roles: Roles[];
  loading?: boolean;
  onSubmit: (values: StaffFormValues) => void;
  mode: 'add' | 'edit';
  initialValues: Staff | null;
}

const StaffFormModal: FC<StaffFormModalProps> = ({
  open,
  onClose,
  stores,
  roles,
  loading,
  onSubmit,
  mode,
  initialValues,
}) => {
  const [form] = Form.useForm<StaffFormValues>();

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (mode === 'edit' && initialValues) {
        form.setFieldsValue({
          ...initialValues,
          location_ids: initialValues.location_ids || [],
          role_id: initialValues.role_id || null,
        });
      }
    }
  }, [open, mode, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Form validation failed:', error);
      notification.error({
        message: 'Form validation failed',
        description: error as string,
      });
    }
  };

  const modalTitle = mode === 'add' ? 'Add Staff' : 'Edit Staff';

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={onClose}
      okText="Save"
      cancelText="Cancel"
      onOk={handleSubmit}
      confirmLoading={loading}
      maskClosable={false}
      width={520}
      centered
    >
      <Form form={form} layout="vertical" requiredMark={false} className="mt-4">
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <Input
            placeholder="Enter full name"
            size="large"
            className="rounded"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email address' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input
            type="email"
            placeholder="Enter email address"
            size="large"
            className="rounded"
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <NumericInput
            placeholder="Enter phone number"
            size="large"
            className="rounded"
          />
        </Form.Item>

        <Form.Item
          label="Assign Store"
          name="location_ids"
          rules={[{ required: true, message: 'Please select store' }]}
        >
          <Select
            placeholder="Select store"
            mode="multiple"
            allowClear
            size="large"
            className="rounded"
            showSearch
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={stores?.map((store) => ({
              value: store.id,
              label: store.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role_id"
          rules={[{ required: true, message: 'Please select role' }]}
        >
          <Select
            placeholder="Select role"
            size="large"
            className="rounded"
            showSearch
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={roles?.map((role) => ({
              value: role.id,
              label: role.name,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StaffFormModal;
