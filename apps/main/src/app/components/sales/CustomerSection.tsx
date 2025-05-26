import { useState } from 'react';
import { Input, Button, Select, AutoComplete, Form } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomerType } from '../../lib./../pages/sales/types';

interface CustomerSectionProps {
  onCustomerSelect?: (customer: CustomerType) => void;
  onCustomerRemove?: () => void;
  customerData?: CustomerType[];
  showCustomer?: boolean;
  showAddNew?: boolean;
}

export const CustomerSection = ({
  onCustomerSelect,
  onCustomerRemove,
  customerData,
  showCustomer = true,
  showAddNew = true,
}: CustomerSectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(
    null
  );

  const [form] = Form.useForm();

  const sourceOptions = [
    { label: 'Website', value: 'Website' },
    { label: 'Referral', value: 'Referral' },
    { label: 'Social Media', value: 'Social Media' },
    { label: 'Walk-in', value: 'Walk-in' },
  ];

  const handleCustomerSearch = (value: string) => {
    return customerData
      ?.filter(
        (customer) =>
          customer?.name?.toLowerCase().includes(value.toLowerCase()) ||
          customer?.email?.toLowerCase().includes(value.toLowerCase()) ||
          customer?.phone?.includes(value)
      )
      .map((customer) => ({
        label: (
          <div className="flex flex-col py-1">
            <span className="font-medium">{customer?.name}</span>
            <span className="text-sm text-gray-500">{customer?.phone}</span>
          </div>
        ),
        value: customer?.name,
        customer: customer,
      }));
  };

  const handleCustomerSelect = (_: string, option: any) => {
    const customer = option.customer;
    setSelectedCustomer(customer);
    setIsAdding(false);
    setIsEditing(false);
    if (onCustomerSelect) {
      onCustomerSelect(customer);
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setSelectedCustomer(null);
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const newCustomer = {
        ...values,
      };
      setSelectedCustomer(newCustomer);
      setIsAdding(false);
      if (onCustomerSelect) {
        onCustomerSelect(newCustomer);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      form.resetFields();
      setIsAdding(false);
      setIsEditing(false);
    }
  };

  const handleRemoveCustomer = () => {
    setSelectedCustomer(null);
    setIsAdding(false);
    setIsEditing(false);
    form.resetFields();
    if (onCustomerRemove) {
      onCustomerRemove();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (selectedCustomer) {
      form.setFieldsValue(selectedCustomer);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between w-full gap-5">
        <h3 className="font-medium md:text-lg">Customer Information</h3>
        {!isAdding && !selectedCustomer && (
          <div className="flex flex-wrap items-center justify-end w-full gap-3">
            <AutoComplete
              className="w-full md:w-[300px]"
              placeholder="Search customer"
              options={handleCustomerSearch('')}
              onSearch={handleCustomerSearch}
              onSelect={handleCustomerSelect}
            />
            {showAddNew && (
              <Button icon={<PlusOutlined />} onClick={handleAddNew}>
                Add New
              </Button>
            )}
          </div>
        )}
        {selectedCustomer && !isEditing && !isAdding && (
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button
              type="text"
              className="text-red-500"
              onClick={handleRemoveCustomer}
            >
              Remove Customer
            </Button>
            {showCustomer && (
              <Button icon={<EditOutlined />} onClick={handleEdit}>
                Edit
              </Button>
            )}
          </div>
        )}
      </div>

      {(isAdding || isEditing) && (
        <Form form={form} layout="vertical" className="grid grid-cols-2 gap-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter phone number' },
              { 
                pattern: /^[0-9]{11}$/,
                message: 'Please enter a valid phone number'
              }
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { type: 'email', message: 'Please enter valid email' },
              { required: true, message: 'Please enter email' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="source"
            label="Source (How did they get to know about you?)"
            rules={[{ required: false }]}
          >
            <Select placeholder="Select source" options={sourceOptions} />
          </Form.Item>

          <div className="flex justify-end col-span-2 gap-3">
            <Button
              onClick={() => {
                setIsAdding(false);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      )}

      {showCustomer && selectedCustomer && !isEditing && !isAdding && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium truncate">{selectedCustomer?.name}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Phone Number</label>
            <p className="font-medium truncate">{selectedCustomer?.phone}</p>
          </div>
          <div className="space-y-1 sm:col-span-2 md:col-span-1">
            <label className="text-sm text-gray-500">Email Address</label>
            <p className="font-medium truncate" title={selectedCustomer?.email}>
              {selectedCustomer?.email}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Source</label>
            <p className="font-medium truncate">
              {selectedCustomer?.source || 'N/A'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
