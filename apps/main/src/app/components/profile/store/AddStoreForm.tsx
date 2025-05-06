import {
  AutoComplete,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  notification,
} from 'antd';
import { FC, useEffect, useState } from 'react';
import { useFetchSingleData } from '../../../../hooks/useApis';
import { Stores } from '../../../pages/staff/types';
import { AddressSuggestionRes } from './types';
import useDebounce from '../../../../hooks/useDebounce';
interface StoreFormValues {
  name: string;
  state_id: number;
  city_id: number;
  address: string;
  longitude: number;
  latitude: number;
}

interface StoreFormModalProps {
  form: FormInstance<StoreFormValues>;
  open: boolean;
  onClose: () => void;
  state: any[];
  city: any[];
  loading?: boolean;
  onSubmit: (values: StoreFormValues) => void;
  mode: 'add' | 'edit';
  initialValues: Stores | null;
  isLoading: boolean;
  handleStateChange: (value: string) => void;
}

const StoreFormModal: FC<StoreFormModalProps> = ({
  form,
  open,
  onClose,
  state,
  city,
  loading,
  onSubmit,
  mode,
  initialValues,
  isLoading,
  handleStateChange,
}) => {
  const [addressInput, setAddressInput] = useState('');
  const debouncedAddressInput = useDebounce(addressInput, 400);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Only fetch if state, city, and debounced input are set
  const shouldFetch = !!selectedState && !!selectedCity && !!debouncedAddressInput;
// https://nominatim.openstreetmap.org/search?polygon_geojson=1&format=jsonv2&q=ladipo&limit=5
  const addressSuggestions = useFetchSingleData(
    `https://nominatim.openstreetmap.org/search?polygon_geojson=1&format=jsonv2&q=${encodeURIComponent(
      debouncedAddressInput
    )}&limit=5`,
    shouldFetch,
    false
  );

  const addressOptions = (addressSuggestions.data || [])?.map((item: any) => ({
    value: item.display_name,
    label: item.display_name,
    data: { lon: item.lon, lat: item.lat },
  }));

  const handleStateChangeInternal = (value: string) => {
    setSelectedState(state.find((s: any) => s.id === value)?.name || '');
    handleStateChange(value);
    form.setFieldsValue({ city_id: undefined });
    setSelectedCity('');
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(city.find((c: any) => c.id === value)?.name || '');
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (mode === 'edit' && initialValues) {
        form.setFieldsValue({
          ...initialValues,
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

  const handleAddressSelect = (value: string, option: any) => {
    form.setFieldsValue({
      address: value,
      longitude: option.data.lon,
      latitude: option.data.lat,
    });
  };

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
          label="Store Name"
          name="name"
          rules={[{ required: true, message: 'Please enter store name' }]}
        >
          <Input
            placeholder="Enter store name"
            size="large"
            className="rounded"
          />
        </Form.Item>

        <Form.Item
          label="State"
          name="state_id"
          rules={[{ required: true, message: 'Please select state' }]}
        >
          <Select
            placeholder="Select state"
            loading={isLoading}
            options={state?.map((b: any) => ({
              value: b?.id,
              label: b?.name,
            }))}
            onChange={handleStateChangeInternal}
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            showSearch
          />
        </Form.Item>

        <Form.Item
          label="City/Region"
          name="city_id"
          rules={[{ required: true, message: 'Please select city/region' }]}
        >
          <Select
            placeholder="Select city/region"
            loading={isLoading}
            options={city?.map((b: any) => ({
              value: b?.id,
              label: b?.name,
            }))}
            onChange={handleCityChange}
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            showSearch
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
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

        {/* Hidden fields for longitude and latitude */}
        <Form.Item name="longitude" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="latitude" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StoreFormModal;
