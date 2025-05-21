import { Form, FormInstance, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useFetchData } from '../../../hooks/useApis';
import { getAuthUser } from '../../../utils/auth';
import { AddressI } from './types';
interface BillingOrShippingAddyFormProps {
  form: FormInstance<any>;
  type: 'billing' | 'shipping';
  showTitle?: boolean;
  isEdit?: boolean;
  data?: AddressI;
}

const BillingOrShippingAddyForm: React.FC<BillingOrShippingAddyFormProps> = ({
  form,
  type,
  showTitle = true,
  isEdit = false,
  data,
}) => {
  const user = getAuthUser();
  const [state, setState] = useState('');
  const [country, setCountry] = useState('161');

  const countries = useFetchData('shared/countries?&paginate=0', !!user);

  const StatesState = useFetchData(
    `shared/states?paginate=0&country_id=${country}`,
    !!user
  );
  const CitiesState = useFetchData(
    state
      ? `shared/cities?paginate=0&country_id=${country}&state_id=${state}`
      : '',
    !!user
  );

  useEffect(() => {
    if (isEdit && data) {
      const formValues = {
        [type]: {
          country_id: data?.country || '161',
          state_id: data?.state,
          city_id: data?.city,
          name: data?.name || user?.user?.name,
          company: data?.company,
          address: data?.address,
          phone: data?.phone,
        },
      };
      console.log(`Setting ${type} form values:`, formValues);
      form.setFieldsValue(formValues);
    } else {
      const defaultValues = {
        [type]: {
          country_id: '161',
          name: user?.user?.name,
        },
      };
      form.setFieldsValue(defaultValues);
    }
  }, [isEdit, data, form, type, user]);

  const handleStateChange = (value: string) => {
    setState(value);
    form.setFieldsValue({
      state_id: value,
      city_id: undefined,
    });
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    form.setFieldsValue({
      country_id: value,
    });
  };

  // Get the default country label
  const defaultCountryLabel =
    countries?.data?.data?.find((item: any) => item.id === '161')?.name ||
    'Nigeria';

  return (
    <div>
      {showTitle && (
        <h3 className="font-semibold text-base mb-3">
          {type === 'billing' ? 'Billing Address' : 'Shipping Address'}
        </h3>
      )}
      <div className="">
        <Form.Item
          name={[type, 'name']}
          label="Name"
          initialValue={user?.user?.name}
          rules={[{ required: true, message: 'Please enter name' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
      </div>

      <Form.Item name={[type, 'company']} label="Company">
        <Input placeholder="Enter company name (optional)" />
      </Form.Item>

      <Form.Item
        name={[type, 'phone']}
        label="Phone Number"
        rules={[
          { required: true, message: 'Please enter phone number' },
          {
            pattern: /^[0-9]{11}$/,
            message: 'Please enter a valid 11-digit phone number',
          },
        ]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item
        label="Country"
        name={[type, 'country_id']}
        initialValue="161"
        rules={[{ required: true, message: 'Please select country' }]}
      >
        <Select
          placeholder="Select country"
          loading={countries.isLoading}
          disabled={countries.isLoading}
          value="161"
          options={[{ value: '161', label: defaultCountryLabel }]}
        />
      </Form.Item>

      <Form.Item
        label="State"
        name={[type, 'state_id']}
        rules={[{ required: true, message: 'Please select state' }]}
      >
        <Select
          placeholder="Select state"
          loading={StatesState.isLoading}
          options={StatesState?.data?.data?.map((item: any) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={handleStateChange}
          filterOption={(input, option) =>
            (option?.label?.toString() ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          showSearch
        />
      </Form.Item>

      <Form.Item
        label="City"
        name={[type, 'city_id']}
        rules={[{ required: true, message: 'Please select city' }]}
      >
        <Select
          placeholder="Select city"
          loading={CitiesState.isLoading}
          options={CitiesState?.data?.data?.map((item: any) => ({
            value: item.id,
            label: item.name,
          }))}
          filterOption={(input, option) =>
            (option?.label?.toString() ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          showSearch
          disabled={!state}
        />
      </Form.Item>

      <Form.Item
        name={[type, 'address']}
        label="Address"
        rules={[{ required: true, message: 'Please enter address' }]}
      >
        <Input placeholder="Enter street address" />
      </Form.Item>
    </div>
  );
};

export default BillingOrShippingAddyForm;
