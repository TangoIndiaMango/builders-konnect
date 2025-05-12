import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance, GetProp, UploadFile, UploadProps } from 'antd';
import { Button, Form, Image, Input, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { beforeUpload, getBase64 } from '../../../../utils/helper';
import VariantList from './VariantList';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface CreateStepOneProps {
  categories: any[];
  subcategories: any[];
  productTypes: any[];
  form: FormInstance;
  selectedCategoryId: string;
  selectedSubcategoryId: string;
  handleCategoryChange: (value: string) => void;
  handleSubcategoryChange: (value: string) => void;
  setSelectedProductTypeId: (value: string) => void;
  variants: any[];
  handleEditVariant: (index: number) => void;
  handleDeleteVariant: (index: number) => void;
  setIsVariantModalVisible: (value: boolean) => void;
  isLoading: boolean;
  additionType: string;
  measuringUnits: any[];
  handleMeasuringUnitChange: (value: string) => void;
  isEdit: boolean;
}

const CreateStepOne = ({
  categories,
  subcategories,
  productTypes,
  selectedCategoryId,
  selectedSubcategoryId,
  handleCategoryChange,
  handleSubcategoryChange,
  setSelectedProductTypeId,
  variants,
  handleEditVariant,
  handleDeleteVariant,
  setIsVariantModalVisible,
  isLoading,
  form,
  additionType,
  measuringUnits,
  handleMeasuringUnitChange,
  isEdit,
}: CreateStepOneProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [media, setMedia] = useState<string[]>([]);
  const [formImages, setFormImages] = useState<any[]>([]);

  // Update this effect to properly sync with form
  useEffect(() => {
    const images = form.getFieldValue('productImages');
    setFormImages(images || []);
  }, [form]);

  // Update this effect to handle fileList
  useEffect(() => {
    if (isEdit && formImages && Array.isArray(formImages) && formImages.length > 0) {
      setFileList(formImages);
    }
  }, [formImages, isEdit]);

  // Handle file changes
  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const mediaArr = await Promise.all(
      newFileList.map(async (file) => {
        if (file.url && file.url.startsWith('http')) {
          return file.url;
        }
        if (file.originFileObj) {
          return await getBase64(file.originFileObj);
        }
        return null;
      })
    );
    setMedia(mediaArr.filter(Boolean));

    // Update form value
    form.setFieldsValue({
      productImages: newFileList,
    });
  };

  console.log(form.getFieldValue("productImages"))

  // Keep form in sync with fileList (for submit)
  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        productImages: fileList,
      });
    }
  }, [fileList, form, isEdit]);

  // console.log('fileList', fileList);
  // console.log('form.getFieldValue(productImages)', form.getFieldValue('productImages'));

  // For preview modal
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );


  return (
    <div>
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        label="Store Keeping Unit (SKU)"
        name="SKU"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="PC-202502-MG" />
      </Form.Item>

      <Form.Item
        label="Product Category"
        name="category"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Select
          placeholder="Select category"
          options={categories}
          onChange={handleCategoryChange}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="Sub Category"
        name="subcategory"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Select
          placeholder={
            !selectedCategoryId
              ? 'Select a category first'
              : 'Select sub category'
          }
          options={subcategories}
          onChange={handleSubcategoryChange}
          disabled={!selectedCategoryId || isLoading}
        />
      </Form.Item>

      <Form.Item
        label="Product Type"
        name="productType"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Select
          placeholder={
            !selectedSubcategoryId
              ? 'Select a sub category first'
              : 'Select product type'
          }
          options={productTypes}
          disabled={!selectedSubcategoryId || !selectedCategoryId || isLoading}
          onChange={(value) => {
            setSelectedProductTypeId(value);
          }}
        />
      </Form.Item>

      <Form.Item
        label="Brand"
        name="brand"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="Enter brand name" />
      </Form.Item>

      <Form.Item
        label="Product Images"
        name="productImages"
        rules={[{ required: true, message: 'Required' }]}
        extra="Recommended file size: 500x500 px. Max file size: 2MB"
      >
        <Upload
          listType="picture-card"
          beforeUpload={beforeUpload}
          maxCount={4}
          accept={'.jpg,.png,.jpeg,.gif,.webp'}
          onPreview={handlePreview}
          onChange={handleChange}
          fileList={fileList}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>

        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>

      {additionType === 'single' ? (
        <Form.Item
          label="Product Variant"
          name="variants"
          required
          className="mb-2"
        >
          {variants.length > 0 ? (
            <VariantList
              variants={variants}
              handleEditVariant={handleEditVariant}
              handleDeleteVariant={handleDeleteVariant}
            />
          ) : (
            <div>
              <Button
                type="link"
                className=" text-[#3B43FF] "
                onClick={() => setIsVariantModalVisible(true)}
                icon={<PlusOutlined />}
              >
                Add product variant
              </Button>
              <p className="text-sm text-gray-400">
                Select the product variations of the product you want to add.
              </p>
            </div>
          )}
        </Form.Item>
      ): (
        <Form.Item
        label="Unit Type"
        name="measurement_unit"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Select
          placeholder="Select measuring unit"
          options={measuringUnits}
          onChange={handleMeasuringUnitChange}
          style={{ width: '100%' }}
        />
      </Form.Item>
      )}
    </div>
  );
};

export default CreateStepOne;
