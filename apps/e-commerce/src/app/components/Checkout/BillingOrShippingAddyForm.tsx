import { AutoComplete, Form, FormInstance, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useFetchData } from '../../../hooks/useApis';
import { getAuthUser } from '../../../utils/auth';
import { AddressI } from './types';
import useDebounce from '../../../hooks/useDebounce';

interface BillingOrShippingAddyFormProps {
  form: FormInstance<any>;
  type: 'billing' | 'shipping';
  showTitle?: boolean;
  isEdit?: boolean;
  data?: AddressI;
}

const NIGERIA_ID = '161';

const BillingOrShippingAddyForm: React.FC<BillingOrShippingAddyFormProps> = ({
  form,
  type,
  showTitle = true,
  isEdit = false,
  data,
}) => {
  const user = getAuthUser();

  // Use form state as source of truth
  const country = Form.useWatch([type, 'country_id'], form) || NIGERIA_ID;
  const state = Form.useWatch([type, 'state_id'], form);

  // Fetch countries only once (on mount)
  const countries = useFetchData('shared/countries?&paginate=0', !!user);

  // Fetch states when country changes
  const StatesState = useFetchData(
    country ? `shared/states?paginate=0&country_id=${country}` : '',
    !!user && !!country
  );

  // Fetch cities when state changes
  const CitiesState = useFetchData(
    state
      ? `shared/cities?paginate=0&country_id=${country}&state_id=${state}`
      : '',
    !!user && !!country && !!state
  );

  // Address autocomplete
  const [addressInput, setAddressInput] = useState('');
  const debouncedAddressInput = useDebounce(addressInput, 400);
  const shouldFetchAddress = !!debouncedAddressInput;
  const addressSuggestions = useFetchData(
    shouldFetchAddress
      ? `shared/search-address?q=${encodeURIComponent(debouncedAddressInput)}`
      : '',
    shouldFetchAddress
  );

  const addressOptions = (addressSuggestions.data?.data || [])?.map(
    (item: any) => ({
      value: item.address,
      label: item.address,
      data: { lon: item.longitude, lat: item.latitude },
    })
  );

  // Set form values only on mount or when editing
  useEffect(() => {
    if (isEdit && data) {
      const formValues = {
        [type]: {
          country_id: data?.country || NIGERIA_ID,
          state_id: data?.state,
          city_id: data?.city,
          name: data?.name || user?.user?.name,
          company: data?.company,
          address: data?.address,
          phone: data?.phone,
        },
      };
      form.setFieldsValue(formValues);
    } else if (!isEdit) {
      const defaultValues = {
        [type]: {
          country_id: NIGERIA_ID,
          name: user?.user?.name,
        },
      };
      form.setFieldsValue(defaultValues);
    }
  }, [isEdit, data, form, type, user]);

  const handleStateChange = (value: string) => {
    form.setFieldsValue({
      [type]: {
        ...form.getFieldValue(type),
        state_id: value,
        city_id: undefined,
      },
    });
  };

  const handleCountryChange = (value: string) => {
    form.setFieldsValue({
      [type]: {
        ...form.getFieldValue(type),
        country_id: value,
        state_id: undefined,
        city_id: undefined,
      },
    });
  };

  const handleAddressSelect = (value: string, option: any) => {
    form.setFieldsValue({
      [type]: {
        ...form.getFieldValue(type),
        address: value,
      },
      longitude: option.data.lon,
      latitude: option.data.lat,
    });
  };

  // Get the default country label
  const defaultCountryLabel =
    countries?.data?.data?.find((item: any) => item.id === NIGERIA_ID)?.name ||
    'Nigeria';

  return (
    <div>
      {showTitle && (
        <h3 className="font-semibold text-base mb-3">
          {type === 'billing' ? 'Billing Address' : 'Shipping Address'}
        </h3>
      )}
      <Form.Item
        name={[type, 'name']}
        label="Name"
        initialValue={user?.user?.name}
        rules={[{ required: true, message: 'Please enter name' }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

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
        initialValue={NIGERIA_ID}
        rules={[{ required: true, message: 'Please select country' }]}
      >
        <Select
          placeholder="Select country"
          loading={countries.isLoading}
          disabled={countries.isLoading}
          value={country}
          options={[{ value: NIGERIA_ID, label: defaultCountryLabel }]}
          onChange={handleCountryChange}
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
        <AutoComplete
          placeholder="Enter address"
          size="large"
          className="rounded"
          options={addressOptions}
          onSelect={handleAddressSelect}
          onSearch={setAddressInput}
          filterOption={false}
        />
      </Form.Item>

      <Form.Item name="longitude" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="latitude" hidden>
        <Input />
      </Form.Item>
    </div>
  );
};

export default BillingOrShippingAddyForm;
