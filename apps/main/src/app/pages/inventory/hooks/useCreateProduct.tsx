import { FormInstance } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

const useCreateProductHook = ({
  form,
  measuringUnitsData,
  handleFileUpload,
}: {
  form: FormInstance<any>;
  measuringUnitsData: any;
  handleFileUpload: (file: any) => Promise<any>;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [productTypes, setProductTypes] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>('');
  const [selectedProductTypeId, setSelectedProductTypeId] =
    useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);
  const [variants, setVariants] = useState<
    Array<{ values: Record<string, string>; labels: Record<string, string> }>
  >([]);
  const [measuringUnits, setMeasuringUnits] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [fieldsData, setFieldsData] = useState<any>([]);
  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const handleMeasuringUnitChange = (value: string) => {
    const selectedUnit = measuringUnitsData?.find(
      (unit) => unit.name === value
    );
    if (selectedUnit) {
      setMeasuringUnits([
        { value: selectedUnit.name, label: selectedUnit.name },
      ]);
    }
  };

  const handleEditVariant = (index: number) => {
    const variant = variants[index];
    form.setFieldsValue(variant.values);
    setEditingVariantIndex(index);
    setIsVariantModalVisible(true);
  };

  const handleDeleteVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleCancel = (): void => {
    navigate(-1);
  };

  const handleModalOk = (): void => {
    setIsModalVisible(false);
    navigate('/pos/inventory');
  };

  const handleNext = async (): Promise<void> => {
    const values = await form.validateFields();
    console.log('Form values', values);
    setFieldsData({ ...values });
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  const handlePrevious = (): void => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategoryId(value);
    setProductTypes([]); // Clear existing product types
    form.setFieldValue('productType', undefined); // Clear product type selection
  };

  const transformVariants = async (variants: any) => {
    const transformedVariants = await Promise.all(
      variants.map(async (variant: any, index: number) => {
        // Handle media uploads
        let mediaUrls: string[] = [];
        if (variant.images) {
          const uploadPromises = variant.images.map(async (file: any) => {
            if (file && !file?.url?.startsWith('https')) {
              const uploadRes = await handleFileUpload(file);
              return uploadRes[0].url;
            }
            return file?.url;
          });
          mediaUrls = await Promise.all(uploadPromises);
        }

        const transformedVariant = {
          [`variants[${index}][SKU]`]: variant.sku,
          [`variants[${index}][unit_retail_price]`]: variant.sellingPrice,
          [`variants[${index}][unit_cost_price]`]: variant.costPrice,
          [`variants[${index}][quantity]`]: variant.quantity,
          [`variants[${index}][reorder_value]`]: variant.reorderQty,
          [`variants[${index}][media]`]: mediaUrls.join('|'),
          [`variants[${index}][measurement_unit]`]: variant.measurement_unit,
        };

        // Add Product Attributes
        variant.attributes.forEach((attr: any) => {
          if (attr.value) {
            transformedVariant[
              `variants[${index}][metadata][attributes][${attr.attribute}][]`
            ] = attr.value;
          }
        });

        return transformedVariant;
      })
    );

    return transformedVariants;
  };

  return {
    currentStep,
    productTypes,
    selectedCategoryId,
    selectedSubcategoryId,
    selectedProductTypeId,
    isModalVisible,
    productCode,
    isVariantModalVisible,
    isColorModalVisible,
    variants,
    measuringUnits,
    fieldsData,
    editingVariantIndex,
    handleMeasuringUnitChange,
    handleEditVariant,
    handleDeleteVariant,
    handleCancel,
    handleModalOk,
    handleNext,
    handlePrevious,
    handleSubcategoryChange,
    transformVariants,
    setIsModalVisible,
    setProductCode,
    setVariants,
    setMeasuringUnits,
    setFieldsData,
    setEditingVariantIndex,
    setSelectedCategoryId,
    setSelectedSubcategoryId,
    setSelectedProductTypeId,
    setProductTypes,
    setIsVariantModalVisible,
    setIsColorModalVisible,

  };
};

export default useCreateProductHook
