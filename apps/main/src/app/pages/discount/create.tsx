import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, notification, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateData,
  useFetchSingleData,
  usePutData,
} from '../../../hooks/useApis';
import SuccessModal from '../../components/common/SuccessModal';
import DiscountForm from '../../components/discount/DiscountForm';
import ErrorModal from '../../components/common/ErrorModal';

const DiscountCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const createDiscount = useCreateData('merchants/discounts');
  const getDiscount = useFetchSingleData(`merchants/discounts/${id}`, !!id);
  const updateDiscount = usePutData(`merchants/discounts/${id}`);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form] = Form.useForm();
  const allProductsValue = Form.useWatch('all_products', form);
  const categoryValue = Form.useWatch('category', form);

  // console.log(allProductsValue);
  const handleSubmit = async () => {
    const values = await form.validateFields();

    const payload: any = {
      name: values.name,
      code: values.code,
      category: Array.isArray(values.category)
        ? values.category.join(',')
        : values.category,
      start_date: values.start_date.format('YYYY-MM-DD'),
      end_date: values.end_date.format('YYYY-MM-DD'),
      type: values.type, // "percentage" or "amount"
      value: Number(values.value),
      all_products: values.all_products || false,
    };

    if (!values.all_products && values.discounted_products?.length) {
      payload.discounted_products = values.discounted_products;
    }

    const apiCall = id
      ? updateDiscount.mutateAsync({ id, ...payload })
      : createDiscount.mutateAsync(payload);

    apiCall
      .then(() => {
        notification.success({ message: 'Discount saved!' });
        setIsSuccessModalOpen(true);
      })
      .catch((err: any) => {
        notification.error({ message: 'Error', description: err.message });
        setIsErrorModalOpen(true);
        setErrorMessage(err?.response?.data?.message || 'An error occurred');
      });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <Typography.Title level={4} className="!mb-0">
            {id ? 'Edit Discount' : 'Add New Discount'}
          </Typography.Title>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={id ? updateDiscount.isPending : createDiscount.isPending}
          >
            {id ? 'Update Discount' : 'Add Discount'}
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="p-6 bg-white rounded-md">
          <DiscountForm
            initialValues={getDiscount?.data?.data}
            form={form}
            onFinish={handleSubmit}
            loading={id ? getDiscount.isPending : false}
            allProductsValue={allProductsValue}
            categoryValue={categoryValue}
          />
        </div>
      </div>

      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate(-1);
        }}
        onOk={() => {
          setIsSuccessModalOpen(false);
          navigate(-1);
        }}
        title="Discount Added Successfully"
        message="The discount has been added successfully."
      />

      <ErrorModal
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Error"
        message={errorMessage}
      />
    </div>
  );
};

export default DiscountCreate;
