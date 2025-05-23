import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useFetchSingleData } from '../../../hooks/useApis';
import { useUploadFileMedia } from '../../../hooks/useUpload';
import { useCreateProduct } from '../../../service/inventory/inventory';
import {
  useGetCategorizations,
  useGetInventoryAttributes,
  useGetMeasuringUnits,
} from '../../../service/inventory/inventoryFN';
import CreateStepOne from './createInventory/CreateStepOne';
import CreateStepTwo from './createInventory/CreateStepTwo';
import ProductOptionModal from './createInventory/ProductOptionModal';
import useCreateProductHook from './hooks/useCreateProduct';
import { SingleProductResponse } from './types';
import NavigationBack from '../../components/common/NavigationBack';

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
/**
 *
 * @returns
 *   const [productTypes, setProductTypes] = useState<Category[]>([]);
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
 */

const CreateProduct = () => {
  const [form] = Form.useForm();

  const { id } = useParams();
  const isEdit = id ? true : false;
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);

  const navigate = useNavigate();
  const { handleFileUpload, isUploading } = useUploadFileMedia();
  const { mutate: createProduct, isPending: isCreateProductLoading } =
    useCreateProduct();
  const [searchParams] = useSearchParams();
  const additionType = searchParams.get('type') ?? 'single'; //multiple or single
  const { data: measuringUnitsData, isLoading: isMeasuringUnitsLoading } =
    useGetMeasuringUnits();

  // Refactor hook
  const {
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
    setEditingVariantIndex,
    setSelectedCategoryId,
    setSelectedSubcategoryId,
    setSelectedProductTypeId,
    setProductTypes,
    setIsVariantModalVisible,
    setIsColorModalVisible,
  } = useCreateProductHook({ form, measuringUnitsData, handleFileUpload });

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategorizations('category');
  const { data: subcategoriesData, isLoading: isSubcategoriesLoading } =
    useGetCategorizations('subcategory', selectedCategoryId);
  const { data: productTypesData, isLoading: isProductTypesLoading } =
    useGetCategorizations('type', selectedSubcategoryId);

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

  const { data: singleProduct } = useFetchSingleData(
    `merchants/inventory-products/${id}`,
    !!id
  );

  const singleProductData = singleProduct?.data as SingleProductResponse;

  useEffect(() => {
    if (id && singleProductData) {
      form.setFieldsValue({
        name: singleProductData?.name,
        SKU: singleProductData?.SKU,
        category: singleProductData?.category_id,
        subcategory: singleProductData?.subcategory_id,
        productType: singleProductData?.product_type_id,
        brand: singleProductData?.brand,
        productImages: singleProductData?.media
          ? singleProductData?.media.map((url: string, idx: number) => ({
              uid: String(idx),
              name: `image-${idx + 1}.jpg`,
              status: 'done',
              url,
            }))
          : [],
        size: singleProductData?.metadata?.size,
        unit_cost_price: singleProductData?.cost_price,
        unit_retail_price: singleProductData?.retail_price,
        quantity: singleProductData?.quantity,
        reorder_value: singleProductData?.reorder_value,
        description: singleProductData?.description,
        tags: singleProductData?.tags,
        measurement_unit: singleProductData?.measurement_unit,
        variants: singleProductData?.metadata?.attributes,
      });
    }
  }, [id, singleProductData]);

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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const submittedData = { ...values, ...fieldsData };
      const extendedVaraint = variants.map((variant) => ({
        ...variant,
        measurement_unit: submittedData.measurement_unit,
      }));

      console.log('Fields', submittedData);
      // Handle variants as metadata attributes
      const metadata: Record<string, { [key: string]: string[] }> = {
        attributes: {},
      };

      // Process variants into metadata attributes
      if (additionType === 'multiple') {
        const variantAttributes = variants;
        console.log(variantAttributes);
      } else {
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
      }

      // Handle media uploads
      let media: string[] = [];
      if (submittedData.productImages) {
        console.log(submittedData.productImages);
        const uploadPromises = submittedData?.productImages?.map(
          async (file: any) => {
            if (file && !file?.url?.startsWith('https')) {
              const uploadRes = await handleFileUpload(file?.thumbUrl);
              return uploadRes[0].url;
            }
            return file?.url;
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
        product_creation_format:
          additionType === 'single' ? 'single' : 'multiple',
        measurement_unit: submittedData.measurement_unit,
        unit_retail_price: submittedData.unit_retail_price,
        unit_cost_price: submittedData.unit_cost_price,
        quantity: submittedData.quantity,
        reorder_value: submittedData.reorder_value,
        description: submittedData.description,
        dimension: submittedData.dimension,
        weight: submittedData.weight,
        tags: submittedData.tags,
        ...(additionType === 'multiple' && {
          variants: extendedVaraint,
        }),
      };

      console.log('Final payload:', payload);

      const formData = new FormData();

      // Handle metadata
      if (payload.metadata) {
        Object.entries(payload.metadata.attributes).forEach(
          ([attrKey, attrValues]) => {
            (attrValues as string[]).forEach((val: string) => {
              formData.append(`metadata[attributes][${attrKey}][]`, val);
            });
          }
        );
      }

      // Handle media
      if (payload.media?.length > 0) {
        formData.append('media', media?.map((file: any) => file).join('|'));
      }

      // Handle variants separately since it's async
      if (additionType === 'multiple') {
        const transformedVariants = await transformVariants(payload.variants);
        transformedVariants.forEach((variant) => {
          Object.entries(variant).forEach(([key, value]) => {
            formData.append(key, value as string);
          });
        });
      }

      Object.entries(payload)
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== ''
        )
        .forEach(([key, value]) => {
          if (key !== 'metadata' && key !== 'media' && key !== 'variants') {
            formData.append(key, value as string);
          }
        });

      createProduct(formData as any, {
        onSuccess: (data) => {
          console.log(data?.data);
          setProductCode(data?.data?.id ?? data?.data?.[0]?.id);
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

  // console.log(variants);
  return (
    <div className="space-y-3">
      <NavigationBack
        title="Request to Add Product"
        description="Fill the form below to add a new product"
        actionButton={
          <div className="flex gap-2">
            <Button
              onClick={handleCancel}
              disabled={isCreateProductLoading || isUploading}
            >
              Cancel
            </Button>
            {currentStep === 1 ? (
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={isCreateProductLoading || isUploading}
              >
                Save
              </Button>
            ) : (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        }
      />
      <div className='p-5'>
      <div className="p-6 bg-white shadow-sm">
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
              additionType={additionType}
              measuringUnits={additionType === 'multiple' ? measuringUnits : []}
              handleMeasuringUnitChange={handleMeasuringUnitChange}
              isEdit={isEdit}
            />
          )}

          {currentStep === 1 && (
            <CreateStepTwo
              additionType={additionType}
              measuringUnits={measuringUnits}
              handleMeasuringUnitChange={handleMeasuringUnitChange}
              isEdit={isEdit}
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
        <p className="">
          Your product ID is:{' '}
          <span className="font-bold text-sm mt-2 text-[#003399]">
            {productCode}
          </span>
        </p>
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
    </div>
  );
};

export default CreateProduct;
