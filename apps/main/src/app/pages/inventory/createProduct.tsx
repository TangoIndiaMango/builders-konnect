
import {
  Form,  Input, Select, Button, Typography, Upload, InputNumber, Modal, UploadFile,
} from 'antd';
import { ArrowLeftOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategorizations, useGetMeasuringUnits, useGetInventoryAttributes } from '../../../service/inventory/inventoryFN';

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
  finishType: string;
  shapeType: string;
  color: string; 
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  description: string;
  tags: string[];
  measuringUnit: string;
}


const CreateProduct = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [productTypes, setProductTypes] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');

  const [formData, setFormData] = useState<ProductFormData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);
  const [variants, setVariants] = useState<Array<{ values: Record<string, string>, labels: Record<string, string> }>>([]);
  const [measuringUnits, setMeasuringUnits] = useState<Array<{ value: string; label: string }>>([]);
  const [attributeValues, setAttributeValues] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const { data: categoriesData } = useGetCategorizations('category');
  const { data: subcategoriesData } = useGetCategorizations('subcategory', selectedCategoryId);
  const { data: productTypesData } = useGetCategorizations('type', selectedSubcategoryId);
  const { data: measuringUnitsData } = useGetMeasuringUnits();
  const { data: attributesData } = useGetInventoryAttributes(selectedCategoryId);
  const { data: variantAttributesData } = useGetInventoryAttributes(selectedCategoryId);

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
      setAttributeValues({});
    }
  };

  const handleAttributeChange = (attrId: string, value: string) => {
    setAttributeValues(prev => ({ ...prev, [attrId]: value }));
    form.setFieldValue(attrId, value);
  };

  useEffect(() => {
    if (categoriesData) {
      const mappedCategories = categoriesData.map((category: CategoryResponse) => ({
        value: category.id,
        label: category.name
      }));
      setCategories(mappedCategories);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (subcategoriesData) {
      const mappedSubcategories = subcategoriesData.map((subcategory: CategoryResponse) => ({
        value: subcategory.id,
        label: subcategory.name
      }));
      setSubcategories(mappedSubcategories);
    }
  }, [subcategoriesData]);

  useEffect(() => {
    if (productTypesData) {
      const mappedProductTypes = productTypesData.map((productType: CategoryResponse) => ({
        value: productType.id,
        label: productType.name
      }));
      setProductTypes(mappedProductTypes);
    }
  }, [productTypesData]);

  useEffect(() => {
    if (measuringUnitsData) {
      const mappedUnits = measuringUnitsData.map((unit: MeasuringUnit) => ({
        value: unit.symbol,
        label: `${unit.name} (${unit.symbol})`
      }));
      setMeasuringUnits(mappedUnits);
    }
  }, [measuringUnitsData]);

  const handleMeasuringUnitChange = (value: string) => {
    const selectedUnit = measuringUnitsData?.find(unit => unit.symbol === value);
    if (selectedUnit) {
      setMeasuringUnits([{ value: selectedUnit.symbol, label: selectedUnit.name }]);
    }
  };

  const handleEditVariant = (index: number) => {
    const variant = variants[index];
    form.setFieldsValue(variant.values);
    setIsVariantModalVisible(true);
  };

  const handleDeleteVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleCancel = (): void => {
    window.history.back();
  };

  const handleFinish = (values: ProductFormData): void => {
    const generatedCode = Math.random().toString(36).substr(2, 9).toUpperCase();
    setProductCode(generatedCode);
    setFormData(values);
    setIsModalVisible(true);
  };

  const handleOk = (): void => {
    setIsModalVisible(false);

    if (formData) {
      navigate('/pos/inventory/product-preview', {
        state: {
          ...formData,
          productCode,
          imageUrl: formData?.productImages?.[0]?.thumbUrl || '',
        },
      });
    }
  };



  const handleNext = (): void => {
    setCurrentStep(prev => Math.min(prev + 1, 1));
  };

  const handlePrevious = (): void => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };



  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategoryId(value);
    setProductTypes([]); // Clear existing product types
    form.setFieldValue('productType', undefined); // Clear product type selection
  };

  return (
    <>
      <div className="p-3 h-fit bg-gray-50">
        <div className="mb-4 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div>
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleCancel}
              >
                Back
              </Button>
              <Title level={4} className="!m-0">
                Request to Add Product
              </Title>
            </div>
          <p className="text-sm text-gray-500">Fill the form below to add a new product</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCancel}>Cancel</Button>
          {currentStep === 1 ? (
            <Button type="primary" onClick={() => form.submit()}>
              Save
            </Button>
          ) : (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          {currentStep > 0 && (
            <Button onClick={handlePrevious}>
              Previous
            </Button>
          )}
          <span className="text-gray-500">
            Step {currentStep + 1} of 2
          </span>
        </div>

        <Form
          form={form}
          layout="horizontal"
          onFinish={handleFinish}
          className="max-w-3xl mx-auto"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          {currentStep === 0 && (
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
                name="sku"
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
                />
              </Form.Item>

              <Form.Item
                label="Sub Category"
                name="subcategory"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select
                  placeholder={!selectedCategoryId ? "Select a category first" : "Select sub category"}
                  options={subcategories}
                  onChange={handleSubcategoryChange}
                  disabled={!selectedCategoryId}
                />
              </Form.Item>

              <Form.Item
                label="Product Type"
                name="productType"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select
                  placeholder={!selectedSubcategoryId ? "Select a sub category first" : "Select product type"}
                  options={productTypes}
                  disabled={!selectedSubcategoryId}
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
                  beforeUpload={() => false}
                  maxCount={4}
                >
                  <div className="text-center">
                    <UploadOutlined className="text-lg" />
                    <div className="mt-2">Upload</div>
                  </div>
                </Upload>
              </Form.Item>


              <Form.Item
                label="Product Variant"
                name="variants"
                required
                className="mb-2"
              >
                <div className="flex items-center gap-2 text-[#3B43FF] cursor-pointer"      onClick={() => setIsVariantModalVisible(true)}>
                  
                    <PlusOutlined /> Add product variant
    
                </div>
                <span className="text-gray-400 text-sm">
                    Select the product variations of the product you want to add.
                  </span>
              </Form.Item>

              {variants.length > 0 && (
                <div className="mt-4">
                  {variants.map((variant, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    {variant.values && Object.entries(variant.values).map(([key, value]) => (
                      <div key={key} className="flex gap-2">
                        <span className="font-medium">{variant.labels?.[key] || key}:</span>
                        <span className="px-2 py-1 bg-blue-50 rounded text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-3">
                    <Button 
                      type="link" 
                      className="text-blue-600 flex items-center gap-1"
                      onClick={() => handleEditVariant(index)}
                    >
                      <span className="text-sm">Edit product variant</span>
                    </Button>
                    <Button 
                      type="link" 
                      danger 
                      className="flex items-center gap-1"
                      onClick={() => handleDeleteVariant(index)}
                    >
                      <span className="text-sm">Delete product variant</span>
                    </Button>
                  </div>
                </div>
              ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <Form.Item
                label="Unit Type"
                name="measuringUnit"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select
                  placeholder="Select measuring unit"
                  options={measuringUnits}
                  onChange={handleMeasuringUnitChange}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              {attributesData && attributesData.map((attr: InventoryAttribute) => (
                <Form.Item
                  key={attr.id}
                  label={attr.attribute}
                  name={attr.id}
                  rules={[{ required: true, message: 'Required' }]}
                >
                  {attr.possible_values ? (
                    <Select
                      placeholder={`Select ${attr.attribute}`}
                      options={attr.possible_values.map(value => ({ value, label: value }))}
                      style={{ width: '100%' }}
                      value={attributeValues[attr.id]}
                      onChange={(value) => handleAttributeChange(attr.id, value)}
                    />
                  ) : (
                    <Input 
                      placeholder={`Enter ${attr.attribute}`}
                      value={attributeValues[attr.id]}
                      onChange={(e) => handleAttributeChange(attr.id, e.target.value)}
                    />
                  )}
                </Form.Item>
              ))}

              <Form.Item
                label="Cost Price"
                name="costPrice"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="₦ Enter cost price" />
              </Form.Item>

              <Form.Item
                label="Selling Price"
                name="sellingPrice"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="₦ Enter selling price" />
              </Form.Item>

              <Form.Item
                label="Stock Quantity"
                name="quantity"
                rules={[
                  { required: true, message: 'Please enter the stock quantity' },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Reorder Level"
                name="reorderLevel"
                rules={[
                  { required: true, message: 'Please enter the reorder level' },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter a description' }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item
                label="Product Tags"
                name="tags"
                rules={[{ required: true, message: 'Please enter tags' }]}
              >
                <Input placeholder="e.g cement, building, bag" />
              </Form.Item>
            </div>
          )}

        </Form>
        </div>
      </div>
      <Modal
        title="Product Successfully Added"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <p className="text-sm text-[#000000D9]">
          A Product Code has been generated for this product.
        </p>
        <p className="font-bold text-sm mt-2 text-[#003399]">{productCode}</p>
      </Modal>

      <Modal
        title="Add Product Option"
        open={isVariantModalVisible}
        onCancel={() => setIsVariantModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={(values) => {
            // Create a mapping of IDs to attribute names
            const labels = variantAttributesData?.reduce((acc, attr) => ({
              ...acc,
              [attr.id]: attr.attribute
            }), {}) || {};
            
            setVariants([...variants, { 
              values: values || {},
              labels: labels
            }]);
            setIsVariantModalVisible(false);
          }}
          layout="vertical"
        >
          {!selectedCategoryId ? (
            <div className="text-center p-4">
              <p className="text-red-500 mb-2">Please select a product category in the main form first.</p>
              <Button onClick={() => setIsVariantModalVisible(false)}>Close</Button>
            </div>
          ) : (
            variantAttributesData && variantAttributesData.map((attr: InventoryAttribute) => (
              <Form.Item
                key={attr.id}
                label={attr.attribute}
                name={attr.id}
                rules={[{ required: true, message: 'Required' }]}
              >
              {attr.possible_values ? (
                <Select
                  placeholder={`Select ${attr.attribute}`}
                  options={attr.possible_values.map(value => ({ value, label: value }))}
                  style={{ width: '100%' }}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      {attr.attribute.toLowerCase() === 'color' && (
                        <div className="p-2 border-t">
                          <Button 
                            type="link" 
                            className="w-full text-left p-0"
                            onClick={() => setIsColorModalVisible(true)}
                          >
                            + Add Color
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                />
              ) : (
                <Input placeholder={`Enter ${attr.attribute}`} />
              )}
              </Form.Item>
            ))
          )}

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsVariantModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Save</Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Add Colour"
        open={isColorModalVisible}
        onCancel={() => setIsColorModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={(values) => {
            // TODO: Add new color to options
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
            <Button onClick={() => setIsColorModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Save</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProduct;
