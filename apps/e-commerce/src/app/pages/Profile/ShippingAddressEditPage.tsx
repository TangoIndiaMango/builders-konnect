import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Select } from 'antd';
import { useCreateData, useFetchData, usePutData } from '../../../hooks/useApis';

interface AddressFormValues {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  country_id: string;
  state_id: string;
  city_id: string;
  phone: string;
}

interface LocationData {
  id: number;
  name: string;
}

function ShippingAddressEditPage() {
  const [form] = Form.useForm<AddressFormValues>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState('');
  const isEditing = !!id;

  const CountriesState = useFetchData('shared/countries?paginate=0');
  const StatesState = useFetchData('shared/states?paginate=0&country_id=161');
  const CitiesState = useFetchData(
    state ? `shared/cities?paginate=0&country_id=161&state_id=${state}` : ''
  );
  const createAddressState = useCreateData('customers/addresses');
  const updateAddressState = usePutData(`customers/addresses/${id}`);
  const { data: addressData } = useFetchData(id ? `customers/addresses/${id}` : '');
  const { refetch: refetchAddresses } = useFetchData('customers/addresses');

  const handleStateChange = (value: string) => {
    setState(value);
    form.setFieldsValue({
      state_id: value,
      city_id: undefined,
    });
  };

  useEffect(() => {
    if (addressData?.data) {
      const address = addressData.data;
      const [firstName, lastName] = address.name.split(' ');
      setState(String(address.state_id));
      form.setFieldsValue({
        firstName,
        lastName,
        company: address.company,
        address: address.address,
        country_id: '161',
        state_id: String(address.state_id),
        city_id: String(address.city_id),
        phone: address.phone
      });
    }
  }, [addressData, form]);

  const onFinish = async (values: AddressFormValues) => {
    try {
      const payload = {
  
          name: `${values.firstName} ${values.lastName}`,
          company: values.company || null,
          address: values.address,
          country_id: 161, // Nigeria
          state_id: String(values.state_id),
          city_id: String(values.city_id),
          phone: values.phone,
          type: 'shipping',
          is_default: true
      };

      if (isEditing) {
        await updateAddressState.mutateAsync(payload);
        message.success('Address updated successfully!');
      } else {
        await createAddressState.mutateAsync(payload);
        message.success('Address created successfully!');
      }

      await refetchAddresses();
      navigate('/profile/addresses');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update address';
      message.error(errorMessage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit' : 'Add'} Shipping Address</h1>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>
        <Form.Item name="company" label="Company">
          <Input placeholder="Enter company name (optional)" />
        </Form.Item>
        <Form.Item 
          name="address" 
          label="Address" 
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input placeholder="Enter street address" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country_id"
          initialValue={161}
          rules={[{ required: true, message: 'Please select country' }]}
        >
          <Select
            placeholder="Select country"
            loading={CountriesState.isLoading}
            options={CountriesState?.data?.data?.map((item: LocationData) => ({
              value: item.id,
              label: item.name,
            }))}
            defaultValue={161}
            disabled
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
            }
            showSearch
          />
        </Form.Item>
        <Form.Item
          label="State"
          name="state_id"
          rules={[{ required: true, message: 'Please select state' }]}
        >
          <Select
            placeholder="Select state"
            loading={StatesState.isLoading}
            options={StatesState?.data?.data?.map((item: LocationData) => ({
              value: item.id,
              label: item.name,
            }))}
            onChange={handleStateChange}
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
            }
            showSearch
          />
        </Form.Item>
        <Form.Item
          label="City"
          name="city_id"
          rules={[{ required: true, message: 'Please select city' }]}
        >
          <Select
            placeholder="Select city"
            loading={CitiesState.isLoading}
            options={CitiesState?.data?.data?.map((item: LocationData) => ({
              value: item.id,
              label: item.name,
            }))}
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
            }
            showSearch
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between">
            <Button type="primary" htmlType="submit" loading={isEditing ? updateAddressState.isPending : createAddressState.isPending}>
              {isEditing ? 'Update Address' : 'Create Address'}
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShippingAddressEditPage;
