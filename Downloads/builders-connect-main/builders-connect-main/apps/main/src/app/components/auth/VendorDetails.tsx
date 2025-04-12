import { useState } from 'react';
import { useFetchData } from '../../../hooks/useApis';
import { Form, Input, Select, FormInstance } from 'antd';

const VendorDetails = ({ form }: { form: FormInstance<any> }) => {
  const [state, setState] = useState('');

  const BusinessCategoryState = useFetchData(
    'shared/categorizations?paginate=0&table=tenant_information&level=category'
  );

  const BusinessTypeState = useFetchData(
    'shared/categorizations?paginate=0&table=tenant_information&level=type'
  );

  const StatesState = useFetchData('shared/states?paginate=0&country_id=161');

  const CitiesState = useFetchData(
    state ? `shared/cities?paginate=0&country_id=161&state_id=${state}` : ''
  );

  const handleStateChange = (value: string) => {
    setState(value);
    form.setFieldsValue({
      state: value,
      cityRegion: undefined,
    });
  };

  return (
    <div className="">
      <Form.Item
        label="Business Name"
        name="businessName"
        rules={[{ required: true, message: 'Please enter business name' }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        label="Business Category"
        name="businessCategory"
        rules={[{ required: true, message: 'Please select business category' }]}
      >
        <Select
          placeholder="Select business category"
          loading={BusinessCategoryState.isPending}
          options={BusinessCategoryState?.data?.data?.map((b: any) => ({
            value: b?.id,
            label: b?.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Business Type"
        name="businessType"
        rules={[{ required: true, message: 'Please select business type' }]}
      >
        <Select
          placeholder="Select business type"
          loading={BusinessTypeState.isPending}
          options={BusinessTypeState?.data?.data?.map((b: any) => ({
            value: b?.id,
            label: b?.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Contact Name"
        name="contactName"
        rules={[{ required: true, message: 'Please enter contact name' }]}
      >
        <Input placeholder="Enter contact name" />
      </Form.Item>

      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: 'Please enter email address' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Please enter phone number' }]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item
        label="Business Address"
        name="businessAddress"
        rules={[{ required: true, message: 'Please enter business address' }]}
        extra="Use the business headquarters' address"
      >
        <Input placeholder="Enter business address" />
      </Form.Item>

      <Form.Item
        label="State"
        name="state"
        rules={[{ required: true, message: 'Please select state' }]}
      >
        <Select
          placeholder="Select state"
          loading={StatesState.isPending}
          options={StatesState?.data?.data?.map((b: any) => ({
            value: b?.id,
            label: b?.name,
          }))}
          onChange={handleStateChange}
        />
      </Form.Item>

      <Form.Item
        label="City/Region"
        name="cityRegion"
        rules={[{ required: true, message: 'Please select city/region' }]}
      >
        <Select
          placeholder="Select city/region"
          loading={CitiesState.isPending}
          options={CitiesState?.data?.data?.map((b: any) => ({
            value: b?.id,
            label: b?.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Street"
        name="street"
        rules={[{ required: true, message: 'Please enter street' }]}
      >
        <Input placeholder="Enter street address" />
      </Form.Item>
    </div>
  );
};

export default VendorDetails;
