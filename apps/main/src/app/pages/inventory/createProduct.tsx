import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Upload,
  InputNumber,
  Modal,
  UploadFile,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  UploadOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetCategorizations,
  useGetMeasuringUnits,
  useGetInventoryAttributes,
} from '../../../service/inventory/inventoryFN';
import {
  createProduct,
  useCreateProduct,
} from '../../../service/inventory/inventory';
import VariantList from './createInventory/VariantList';
import { useUploadFileMedia } from '../../../hooks/useUpload';
import { beforeUpload, acceptedFileTypes } from '../../../utils/helper';
import CreateStepOne from './createInventory/CreateStepOne';
import CreateStepTwo from './createInventory/CreateStepTwo';
import ProductOptionModal from './createInventory/ProductOptionModal';

type CategoryResponse = {
  id: string;
  name: string;
  slug: string;
  is_active: number;
  table: string;
  level: string;
  parent_id: string | null;
};

type MeasuringUnit = {
  name: string;
  symbol: string;
};

type InventoryAttribute = {
  id: string;
  attribute: string;
  possible_values?: string[];
  category: string;
};

const { Title } = Typography;

interface Category {
  value: string;
  label: string;
}

interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  productType: string;
  brand: string;
  productImages: UploadFile[];
  size: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  description: string;
  tags: string[];
  measuringUnit: string;
  attributes: Record<string, string>;
}

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
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
  const { handleFileUpload, isUploading } = useUploadFileMedia();
  const { mutate: createProduct, isPending: isCreateProductLoading } =
    useCreateProduct();

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategorizations('category');
  const { data: subcategoriesData, isLoading: isSubcategoriesLoading } =
    useGetCategorizations('subcategory', selectedCategoryId);
  const { data: productTypesData, isLoading: isProductTypesLoading } =
    useGetCategorizations('type', selectedSubcategoryId);
  const { data: measuringUnitsData, isLoading: isMeasuringUnitsLoading } =
    useGetMeasuringUnits();
  const { data: attributesData, isLoading: isAttributesLoading } =
    useGetInventoryAttributes(selectedCategoryId);
  const { data: variantAttributesData, isLoading: isVariantAttributesLoading } =
    useGetInventoryAttributes(selectedCategoryId);

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value);
    setSelectedSubcategoryId(''); // Reset subcategory
    form.setFieldValue('subcategory', undefined); // Clear subcategory selection
    form.setFieldValue('productType', undefined); // Clear product type selection

    // Clear any existing attribute values
    if (attributesData) {
      attributesData.forEach((attr: InventoryAttribute) => {
        form.setFieldValue(attr.id, undefined);
      });
    }
  };

  useEffect(() => {
    if (categoriesData) {
      const mappedCategories = categoriesData.map(
        (category: CategoryResponse) => ({
          value: category.id,
          label: category.name,
        })
      );
      setCategories(mappedCategories);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (subcategoriesData) {
      const mappedSubcategories = subcategoriesData.map(
        (subcategory: CategoryResponse) => ({
          value: subcategory.id,
          label: subcategory.name,
        })
      );
      setSubcategories(mappedSubcategories);
    }
  }, [subcategoriesData]);

  useEffect(() => {
    if (productTypesData) {
      const mappedProductTypes = productTypesData.map(
        (productType: CategoryResponse) => ({
          value: productType.id,
          label: productType.name,
        })
      );
      setProductTypes(mappedProductTypes);
    }
  }, [productTypesData]);

  useEffect(() => {
    if (measuringUnitsData) {
      const mappedUnits = measuringUnitsData.map((unit: MeasuringUnit) => ({
        value: unit.name,
        label: `${unit.name} (${unit.symbol})`,
      }));
      setMeasuringUnits(mappedUnits);
    }
  }, [measuringUnitsData]);

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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const submittedData = { ...values, ...fieldsData };

      console.log('Fields', submittedData);
      // Handle variants as metadata attributes
      const metadata: Record<string, { [key: string]: string[] }> = {
        attributes: {},
      };

      // Process variants into metadata attributes
      variants.forEach((variant) => {
        Object.entries(variant.values)
          .filter(([_, value]) => value !== undefined && value !== '')
          .forEach(([attrId, value]) => {
            const attrName = variant.labels[attrId];
            if (!metadata.attributes[attrName]) {
              metadata.attributes[attrName] = [];
            }
            // Handle both single values and arrays
            if (Array.isArray(value)) {
              metadata.attributes[attrName].push(...value);
            } else {
              metadata.attributes[attrName].push(value as string);
            }
          });
      });

      // Handle media uploads
      let media: string[] = [];
      if (submittedData.productImages) {
        const uploadPromises = submittedData?.productImages?.map(
          async (file: string) => {
            if (file) {
              const uploadRes = await handleFileUpload(file);
              return uploadRes[0].url;
            }
          }
        );
        media = await Promise.all(uploadPromises);
      }

      // Construct the final payload
      const payload = {
        name: submittedData.name,
        SKU: submittedData.SKU,
        category_id: selectedCategoryId,
        subcategory_id: selectedSubcategoryId,
        product_type_id: selectedProductTypeId,
        brand: submittedData.brand,
        media: media,
        metadata: metadata,
        product_creation_format: 'single',
        measurement_unit: submittedData.measurement_unit,
        unit_retail_price: submittedData.unit_retail_price,
        unit_cost_price: submittedData.unit_cost_price,
        quantity: submittedData.quantity,
        reorder_value: submittedData.reorder_value,
        description: submittedData.description,
        tags: submittedData.tags,
      };

      console.log('Final payload:', payload);
      // return
      // Create FormData for the request
      const formData = new FormData();

      // Add all fields to FormData
      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'metadata') {
          // Handle metadata attributes
          Object.entries(value.attributes).forEach(([attrKey, attrValues]) => {
            (attrValues as string[]).forEach((val: string) => {
              formData.append(`metadata[attributes][${attrKey}][]`, val);
            });
          });
        } else if (key === 'media') {
          formData.append('media', media?.map((file: any) => file).join('|'));
        } else {
          formData.append(key, value as string);
        }
      });

      createProduct(formData as any, {
        onSuccess: (data) => {
          console.log(data?.data);
          setProductCode(data?.data?.id);
          setIsModalVisible(true);
        },
        onError: (error) => {
          console.error('Error creating product:', error);
          message.error(
            `Failed to create product: ${error?.message} Please try again.`
          );
        },
      });
    } catch (error: any) {
      console.error('Error creating product:', error);
      message.error(`Failed to create product Please try again.`);
    }
  };

  const isLoading =
    isCategoriesLoading ||
    isSubcategoriesLoading ||
    isProductTypesLoading ||
    isMeasuringUnitsLoading ||
    isAttributesLoading ||
    isVariantAttributesLoading;

  return (
    <>
      <div className="p-3 h-fit bg-gray-50">
        <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-sm">
          <div>
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleCancel}
                disabled={isCreateProductLoading || isUploading}
              >
                Back
              </Button>
              <Title level={4} className="!m-0">
                Request to Add Product
              </Title>
            </div>
            <p className="text-sm text-gray-500">
              Fill the form below to add a new product
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCancel} disabled={isCreateProductLoading || isUploading}>Cancel</Button>
            {currentStep === 1 ? (
              <Button type="primary" onClick={() => form.submit()} loading={isCreateProductLoading || isUploading}>
                Save
              </Button>
            ) : (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            {currentStep > 0 && (
              <Button onClick={handlePrevious}>Previous</Button>
            )}
            <span className="text-gray-500">Step {currentStep + 1} of 2</span>
          </div>

          <Form
            form={form}
            layout="horizontal"
            className="w-full max-w-3xl mx-auto"
            onFinish={handleSubmit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            {currentStep === 0 && (
              <CreateStepOne
                form={form}
                categories={categories}
                subcategories={subcategories}
                productTypes={productTypes}
                selectedCategoryId={selectedCategoryId}
                selectedSubcategoryId={selectedSubcategoryId}
                handleCategoryChange={handleCategoryChange}
                handleSubcategoryChange={handleSubcategoryChange}
                setSelectedProductTypeId={setSelectedProductTypeId}
                variants={variants}
                handleEditVariant={handleEditVariant}
                handleDeleteVariant={handleDeleteVariant}
                setIsVariantModalVisible={setIsVariantModalVisible}
                isLoading={isLoading}
              />
            )}

            {currentStep === 1 && (
              <CreateStepTwo
                measuringUnits={measuringUnits}
                handleMeasuringUnitChange={handleMeasuringUnitChange}
              />
            )}
          </Form>
        </div>
      </div>

      {/* Add Product Successfully Modal */}
      <Modal
        title="Product Successfully Added"
        open={isModalVisible}
        width={400}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        centered
      >
        <p className="text-sm text-[#000000D9]">
          Product has been created successfully!
        </p>
        <p className="font-bold text-sm mt-2 text-[#003399]">{productCode}</p>
      </Modal>

      {/* Add Product Option Modal */}
      <ProductOptionModal
        isVariantModalVisible={isVariantModalVisible}
        setIsVariantModalVisible={setIsVariantModalVisible}
        variantAttributesData={variantAttributesData}
        setVariants={setVariants}
        variants={variants}
        selectedCategoryId={selectedCategoryId}
        setIsColorModalVisible={setIsColorModalVisible}
        editingVariantIndex={editingVariantIndex}
        setEditingVariantIndex={setEditingVariantIndex}
      />

      {/* Add Colour Modal */}
      <Modal
        title="Add Colour"
        open={isColorModalVisible}
        onCancel={() => setIsColorModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={() => {
            setIsColorModalVisible(false);
          }}
          layout="vertical"
        >
          <Form.Item
            label="Name of Colour"
            name="colorName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input placeholder="Enter colour name" />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsColorModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProduct;
