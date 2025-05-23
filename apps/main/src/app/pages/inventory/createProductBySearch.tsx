import {
  ArrowLeftOutlined,
  BarcodeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  MenuProps,
  Modal,
  Select,
  Typography,
  Upload,
  UploadFile,
  message,
  Tooltip,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { useUploadFileMedia } from '../../../hooks/useUpload';
import { Product } from '../../../service/inventory/inventory.types';
import {
  useCreateProduct,
  useSearchProducts,
} from '../../../service/inventory/inventoryFN';
import { beforeUpload, getBase64 } from '../../../utils/helper';
import { ProductType } from '../sales/types';
const { Title, Text } = Typography;

interface ProductFormData {
  name: string;
  SKU: string;
  measurement_unit: string;
  images: { thumbUrl?: string; url?: string }[];
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  reorderLevel: number;
  description: string;
  tags: string;
  catalogue_id: string;
  dimension: number;
  weight: number;
}

const CreateProductBySearch = () => {
  const [form] = Form.useForm<ProductFormData>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const [productCode, setProductCode] = useState('');
  const [formData, setFormData] = useState<ProductFormData | null>(null);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { data: searchResults, isLoading: isSearching } = useSearchProducts({
    q: debouncedSearchQuery,
  });
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { handleFileUpload, isUploading } = useUploadFileMedia();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleCancel = () => {
    navigate(-1);
    setSelectedProduct(null);
  };

  // Update this effect to properly sync with form

  const menu: MenuProps = {
    items: [
      {
        key: '1',
        label: 'Single Variation',
        onClick: () => {
          navigate('/pos/inventory/add-product');
        },
      },
      {
        key: '2',
        label: 'Multiple Variation',
        onClick: () => {
          navigate('/pos/inventory/add-product');
        },
      },
    ],
  };

  const handleSelect = (value: string) => {
    if (value === 'add-new') {
      navigate('/pos/inventory/add-product');
    } else {
      const found = searchResults?.data?.find((p) => p.id.toString() === value);
      if (found) {
        const images = Array.isArray(found?.media)
          ? found.media
              .filter(
                (url: string) => typeof url === 'string' && url.trim() !== ''
              )
              .map((url: string, idx: number) => ({
                uid: String(idx),
                name: `image-${idx + 1}.jpg`,
                status: 'done',
                url,
              }))
          : [];
        setSelectedProduct(found);
        setFileList(images);
        form.setFieldsValue({
          name: found.name,
          SKU: found.SKU || '',
          catalogue_id: found.identifier_no,
          images,
        });
      }
    }
  };
  // Handle file changes
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    form.setFieldValue('images', newFileList);
  };

  // For preview modal
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleFinish = async () => {
    const values = await form.validateFields();
    let imagesRes: string[] = [];

    if (values?.images?.length > 0) {
      const alreadyUploaded = values.images.filter(
        (img) => img.url && img.url.startsWith('http')
      );
      const toUpload = values.images.filter(
        (img) => !img.url || !img.url.startsWith('http')
      );
      imagesRes = alreadyUploaded.map((img) => img.url || '').filter(Boolean);

      if (toUpload.length > 0) {
        const uploadedImages = (
          await Promise.all(
            toUpload.map((image) => handleFileUpload(image.thumbUrl || image))
          )
        ).flat();

        imagesRes = imagesRes.concat(
          uploadedImages.map((img) => img.url).filter(Boolean)
        );
      }
    }
    console.log('imageres', imagesRes);
    const productData = {
      product_creation_format: 'catalogue' as const,
      name: selectedProduct?.name || '',
      SKU: selectedProduct?.SKU || '',
      unit_cost_price: values.costPrice,
      unit_retail_price: values.sellingPrice,
      quantity: values.quantity,
      reorder_value: values.reorderLevel,
      description: values.description,
      tags: values.tags,
      size: values.measurement_unit,
      catalogue_id: selectedProduct?.id || '',
      dimension: values.dimension,
      weight: values.weight,
      media: imagesRes?.join('|'),
    };

    createProduct(productData, {
      onSuccess: (response: any) => {
        setProductData(response?.data);
        const generatedCode = response?.data?.id;
        setProductCode(generatedCode);
        setFormData(values);
        setIsModalVisible(true);
      },
      onError: (error: any) => {
        message.error(
          error?.message || 'Failed to create product. Please try again.'
        );
      },
    });
  };
  // console.log("generatedCode", productCode)
  const handleOk = () => {
    setIsModalVisible(false);
    if (formData) {
      navigate(`/pos/inventory/preview-product/${productData?.id}`, {
        state: productData,
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="space-y-5">
      <div className="p-3 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleCancel}
            />
            <Title level={4} className="!m-0">
              Add Product
            </Title>
          </div>
          {selectedProduct ? (
            <div className="flex gap-2">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={isCreating || isUploading}
              >
                Submit
              </Button>
            </div>
          ) : (
            // <Dropdown menu={menu} trigger={['click']} placement="bottom">
            //   <Button
            //     type="primary"
            //     className="rounded"
            //     size="large"
            //     icon={<PlusOutlined />}
            //   >
            //     Product Type
            //   </Button>
            // </Dropdown>
            <></>
          )}
        </div>
        <Text type="secondary" className="block mb-6">
          Search products to add a product or scan product barcode to add
          product
        </Text>
      </div>

      <div className="p-5">
        <div className=" p-5 bg-white">
          {!selectedProduct ? (
            <div>
              <div className="flex flex-col items-center justify-center w-full mb-4">
                <h1 className="mb-5 text-base font-medium">
                  Search to add product from catalogue
                </h1>
                <Select
                  showSearch
                  placeholder="Search product by name or sku"
                  className="w-full max-w-sm"
                  defaultActiveFirstOption={false}
                  suffixIcon={false}
                  filterOption={false}
                  onSearch={(value: string) => setSearchQuery(value)}
                  onSelect={handleSelect}
                  loading={isSearching}
                  options={[
                    {
                      value: 'add-multiple',
                      label: (
                        <div>
                          <p
                            onClick={() =>
                              navigate(
                                '/pos/inventory/add-product?type=multiple'
                              )
                            }
                            className="text-sm text-wrap"
                          >
                            Can't find the product you want to add?{' '}
                            <span className="text-[#003399] cursor-pointer">
                              Request to add product
                            </span>
                          </p>
                        </div>
                      ),
                    },
                    // {
                    //   value: 'add-multiple',
                    //   label: (
                    //     <div>
                    //       <p
                    //         onClick={() =>
                    //           navigate(
                    //             '/pos/inventory/add-product?type=multiple'
                    //           )
                    //         }
                    //         className="text-sm text-wrap"
                    //       >
                    //         Can't find the product you want to add?{' '}
                    //         <span className="text-[#003399] cursor-pointer">
                    //           Request to add multiple variation product
                    //         </span>
                    //       </p>
                    //     </div>
                    //   ),
                    // },
                    ...(searchResults?.data?.map((product) => ({
                      key: product.id.toString(),
                      value: product.id.toString(),
                      label: `${product.name} - ${product.SKU}`,
                    })) || []),
                  ]}
                />
              </div>

              <div className="flex gap-3 cursor-pointer w-fit mx-auto px-4 items-center text-sm text-[#000000] py-2 bg-[#D9D9D9] rounded-md">
                <BarcodeOutlined />
                <p onClick={() => navigate('/pos/inventory/scan-product')}>
                  Click here to scan product barcode to add product
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <Form
                form={form}
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={handleFinish}
                className="w-full max-w-2xl"
              >
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the product name',
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  label="SKU"
                  name="SKU"
                  rules={[{ required: true, message: 'Please enter the SKU' }]}
                >
                  <Input disabled />
                </Form.Item>

                {/* <Form.Item
                label="Size"
                name="size"
                rules={[{ required: true, message: 'Please enter the size' }]}
              >
                <Input />
              </Form.Item> */}

                <Form.Item
                  label="Product Images"
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e : e?.fileList
                  }
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload at least one image',
                  //   },
                  // ]}
                >
                  {/* <Tooltip title="You can't upload an image to a catalogue product">

                  </Tooltip> */}
                  <div>
                    <Upload
                      name="images"
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                      onPreview={handlePreview}
                      maxCount={4}
                      onChange={handleChange}
                      fileList={fileList}
                      // disabled
                    >
                      {fileList.length >= 4 ? null : uploadButton}
                    </Upload>
                  </div>

                  <div>
                    {previewImage && (
                      <div>
                        <Image
                          wrapperStyle={{ display: 'none' }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
                            afterOpenChange: (visible) =>
                              !visible && setPreviewImage(''),
                          }}
                          src={previewImage}
                        />
                      </div>
                    )}
                  </div>
                </Form.Item>

                <Form.Item
                  label="Cost Price"
                  name="costPrice"
                  rules={[
                    { required: true, message: 'Please enter the cost price' },
                  ]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    formatter={(value: any) =>
                      value
                        ? `₦ ${value
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                        : '₦'
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Selling Price"
                  name="sellingPrice"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the selling price',
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    formatter={(value: any) =>
                      value
                        ? `₦ ${value
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                        : '₦'
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Stock Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the stock quantity',
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  label="Reorder Level"
                  name="reorderLevel"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the reorder level',
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  label="Dimension"
                  name="dimension"
                  help="Enter the dimension of the product in w x b x h"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input
                    placeholder="Enter dimension"
                    type="number"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Weight"
                  help="Enter the weight of the product in grams"
                  name="weight"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input
                    placeholder="Enter weight"
                    type="number"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: 'Please enter a description' },
                  ]}
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
              </Form>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Product Successfully Added"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        centered
        width={400}
      >
        <div>
          <p className="text-sm text-[#000000D9]">
            A Product Code has been generated for this product.
          </p>
          <p className="font-bold text-sm mt-2 text-[#003399]">{productCode}</p>
        </div>
      </Modal>

      {/* <ImagePreviewModal
        isOpen={isImagePreviewOpen && !!previewImage}
        image={previewImage?.url || previewImage?.thumbUrl}
        imageUid={previewImageUid || ''}
        onClose={() => {
          setIsImagePreviewOpen(false);
          setPreviewImageUid(null);
        }}
        onChange={handleImageChange}
        onDelete={handleImageDelete}
        isDeleteOpen={isImageDeleteOpen}
        setIsDeleteOpen={setIsImageDeleteOpen}
      /> */}
    </div>
  );
};

export default CreateProductBySearch;
