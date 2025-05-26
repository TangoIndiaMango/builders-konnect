import { Modal, Form, Select, Button } from 'antd';
import { useEffect, useState } from 'react';

const EditVariantModal = ({
  open,
  onCancel,
  onSave,
  initialValues,
  options,
}) => {
  const [form] = Form.useForm();

  // Set initial values when modal opens
  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      onSave(values);
    });
  };

  return (
    <Modal
      open={open}
      title="Edit Product Variant"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancel</Button>,
        <Button key="save" type="primary" onClick={handleOk}>Save</Button>,
      ]}
      width={600}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: 'Please select at least one size' }]}
        >
          <Select mode="multiple" options={options.sizes} />
        </Form.Item>
        <Form.Item label="Finish Type" name="finishType">
          <Select mode="multiple" options={options.finishTypes} />
        </Form.Item>
        <Form.Item label="Shape Type" name="shapeType">
          <Select mode="multiple" options={options.shapeTypes} />
        </Form.Item>
        <Form.Item label="Colour" name="color">
          <Select mode="multiple" options={options.colors} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditVariantModal;