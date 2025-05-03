"use client"

import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Upload,
  InputNumber,
  Modal,
  Table,
  type UploadFile,
  message,
} from "antd"
import { ArrowLeftOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { RcFile } from "antd/es/upload"

const { Title } = Typography

interface Category {
  value: string
  label: string
}

interface Variant {
  size: string
  finishType: string
  shapeType: string
  color: string
}

interface ProductFormData {
  name: string
  sku: string
  category: string
  subcategory: string
  productType: string
  brand: string
  productImages: UploadFile[]
  size: string
  finishType: string
  shapeType: string
  color: string
  costPrice: number
  sellingPrice: number
  stockQuantity: number
  reorderLevel: number
  description: string
  tags: string[]
}

const CreateProduct = () => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [productTypes, setProductTypes] = useState<Category[]>([])
  const [formData, setFormData] = useState<ProductFormData | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [productCode, setProductCode] = useState("")
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false)
  const [isColorModalVisible, setIsColorModalVisible] = useState(false)
  const [variants, setVariants] = useState<Variant[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch categories from API
    setCategories([
      { value: "tiles", label: "Tiles" },
      { value: "building", label: "Building Materials" },
    ])
  }, [])

  const handleCancel = (): void => {
    window.history.back()
  }

  // This function properly handles the file upload and creates object URLs
  const handleBeforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/")
    if (!isImage) {
      message.error("You can only upload image files!")
      return Upload.LIST_IGNORE
    }

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!")
      return Upload.LIST_IGNORE
    }

    // Create a URL for the file
    const objectUrl = URL.createObjectURL(file)

    // Add the URL to the file object
    const newFile = {
      ...file,
      url: objectUrl,
      thumbUrl: objectUrl,
    } as UploadFile

    setFileList([...fileList, newFile])
    return false // Prevent upload
  }

  const handleFinish = (values: ProductFormData): void => {
    const generatedCode = Math.random().toString(36).substr(2, 9).toUpperCase()

    // Use our fileList state which has the proper URLs
    const formValues = {
      ...values,
      productImages: fileList,
      variants,
    }

    setFormData(formValues)
    setProductCode(generatedCode)
    setIsModalVisible(true)
  }

  const handleSubmit = () => {
    form.submit()
  }

  const handleOk = (): void => {
    setIsModalVisible(false)

    if (formData) {
      // Get the first image URL from our fileList
      const imageUrl = fileList.length > 0 ? fileList[0].url || fileList[0].thumbUrl : ""

      navigate("/pos/inventory/product-preview", {
        state: {
          ...formData,
          productCode,
          imageUrl,
          // Also pass the entire productImages array for potential gallery view
          productImages: fileList,
        },
      })
    } else {
      console.error("Form data is incomplete or missing.")
    }
  }

  const handleNext = (): void => {
    setCurrentStep((prev) => Math.min(prev + 1, 2))
  }

  const handlePrevious = (): void => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleCategoryChange = (selectedCategory: string) => {
    console.log("Selected category:", selectedCategory)
    setSubcategories([
      { value: "wall-tiles", label: "Wall Tiles" },
      { value: "floor-tiles", label: "Floor Tiles" },
    ])
    form.setFieldsValue({ subcategory: undefined, productType: undefined })
  }

  const handleSubcategoryChange = (selectedSubcategory: string) => {
    console.log("Selected subcategory:", selectedSubcategory)
    setProductTypes([
      { value: "ceramic", label: "Ceramic" },
      { value: "porcelain", label: "Porcelain" },
    ])
    form.setFieldsValue({ productType: undefined })
  }

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList)
  }

  return (
    <>
      <div className="p-3 h-fit bg-gray-50">
        <div className="mb-4 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleCancel}>
              Back
            </Button>
            <Title level={4} className="!m-0">
              Add Product
            </Title>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            {currentStep === 2 ? (
              <Button type="primary" onClick={handleSubmit}>
                Finish
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
            {currentStep > 0 && <Button onClick={handlePrevious}>Previous</Button>}
            <span className="text-gray-500">Step {currentStep + 1} of 3</span>
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
                <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Required" }]}>
                  <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                  label="Store Keeping Unit (SKU)"
                  name="sku"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input placeholder="PC-202502-MG" />
                </Form.Item>

                <Form.Item label="Product Category" name="category" rules={[{ required: true, message: "Required" }]}>
                  <Select placeholder="Select category" options={categories} onChange={handleCategoryChange} />
                </Form.Item>

                <Form.Item label="Sub Category" name="subcategory" rules={[{ required: true, message: "Required" }]}>
                  <Select
                    placeholder="Select sub category"
                    options={subcategories}
                    onChange={handleSubcategoryChange}
                  />
                </Form.Item>

                <Form.Item label="Product Type" name="productType" rules={[{ required: true, message: "Required" }]}>
                  <Select placeholder="Select product type" options={productTypes} />
                </Form.Item>

                <Form.Item label="Brand" name="brand" rules={[{ required: true, message: "Required" }]}>
                  <Input placeholder="Enter brand name" />
                </Form.Item>

                <Form.Item
                  label="Product Images"
                  name="productImages"
                  rules={[{ required: true, message: "Required" }]}
                  extra="Recommended file size: 500x500 px. Max file size: 2MB"
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={handleBeforeUpload}
                    onChange={handleUploadChange}
                    maxCount={4}
                  >
                    <div className="text-center">
                      <UploadOutlined className="text-lg" />
                      <div className="mt-2">Upload</div>
                    </div>
                  </Upload>
                </Form.Item>

                <Form.Item label="Product Variant" required className="mb-2">
                  <div
                    className="flex items-center gap-2 text-[#3B43FF] cursor-pointer"
                    onClick={() => setIsVariantModalVisible(true)}
                  >
                    <PlusOutlined /> Add product variant
                  </div>
                  <span className="text-gray-400 text-sm">
                    Select the product variations of the product you want to add.
                  </span>
                </Form.Item>

                {variants.length > 0 && (
                  <div className="mt-4">
                    <Table
                      dataSource={variants}
                      columns={[
                        { title: "Size", dataIndex: "size" },
                        { title: "Finish Type", dataIndex: "finishType" },
                        { title: "Shape Type", dataIndex: "shapeType" },
                        { title: "Color", dataIndex: "color" },
                        {
                          title: "Action",
                          key: "action",
                          render: (_, record, index) => (
                            <Button
                              type="link"
                              danger
                              onClick={() => {
                                const newVariants = [...variants]
                                newVariants.splice(index, 1)
                                setVariants(newVariants)
                              }}
                            >
                              Delete
                            </Button>
                          ),
                        },
                      ]}
                      pagination={false}
                    />
                  </div>
                )}
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <Form.Item label="Size" name="size" rules={[{ required: true, message: "Required" }]}>
                  <Input placeholder="Enter size" />
                </Form.Item>

                <Form.Item label="Finish Type" name="finishType" rules={[{ required: true, message: "Required" }]}>
                  <Input placeholder="Enter finish type" />
                </Form.Item>

                <Form.Item label="Shape Type" name="shapeType" rules={[{ required: true, message: "Required" }]}>
                  <Input placeholder="Enter shape type" />
                </Form.Item>

                <Form.Item label="Color" name="color" rules={[{ required: true, message: "Required" }]}>
                  <Input placeholder="Enter color" />
                </Form.Item>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <Form.Item label="Cost Price" name="Product Name" rules={[{ required: true, message: "Required" }]}>
                  <InputNumber
                    min={0}
                    className="w-full"
                    placeholder="Enter cost price"
                    formatter={(value) => (value ? `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "")}
                    parser={(value) => value?.replace(/₦\s?|(,*)/g, "") || "0"}
                  />
                </Form.Item>

                <Form.Item label="Selling Price" name="sellingPrice" rules={[{ required: true, message: "Required" }]}>
                  <InputNumber
                    min={0}
                    className="w-full"
                    placeholder="Enter selling price"
                    formatter={(value) => (value ? `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "")}
                    parser={(value) => value?.replace(/₦\s?|(,*)/g, "") || "0"}
                  />
                </Form.Item>

                <Form.Item
                  label="Stock Quantity"
                  name="stockQuantity"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber min={0} className="w-full" placeholder="Enter stock quantity" />
                </Form.Item>

                <Form.Item label="Reorder Level" name="reorderLevel" rules={[{ required: true, message: "Required" }]}>
                  <InputNumber min={0} className="w-full" placeholder="Enter reorder level" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} placeholder="Enter product description" />
                </Form.Item>

                <Form.Item label="Product Tags" name="tags">
                  <Select mode="tags" placeholder="Enter tags" style={{ width: "100%" }} />
                </Form.Item>
              </div>
            )}

            {currentStep === 3 && null}
          </Form>
        </div>
      </div>
      <Modal title="Product Successfully Added" open={isModalVisible} onOk={handleOk} onCancel={handleOk}>
        <p className="text-sm text-[#000000D9]">A Product Code has been generated for this product.</p>
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
            setVariants([...variants, values])
            setIsVariantModalVisible(false)
          }}
          layout="vertical"
        >
          <Form.Item label="Size" name="size" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select size">
              <Select.Option value="60x60 cm">60x60 cm</Select.Option>
              <Select.Option value="30x30 cm">30x30 cm</Select.Option>
              <Select.Option value="45x45 cm">45x45 cm</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Finish Type" name="finishType">
            <Select placeholder="Select finish type">
              <Select.Option value="Matte">Matte</Select.Option>
              <Select.Option value="Glossy">Glossy</Select.Option>
              <Select.Option value="Polished">Polished</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Shape Type" name="shapeType">
            <Select placeholder="Select shape type">
              <Select.Option value="Square">Square</Select.Option>
              <Select.Option value="Rectangle">Rectangle</Select.Option>
              <Select.Option value="Hexagon">Hexagon</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Color" name="color">
            <Select
              placeholder="Select color"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <div className="p-2 border-t">
                    <Button type="link" className="w-full text-left p-0" onClick={() => setIsColorModalVisible(true)}>
                      + Add Color
                    </Button>
                  </div>
                </div>
              )}
            >
              <Select.Option value="White">White</Select.Option>
              <Select.Option value="Black">Black</Select.Option>
              <Select.Option value="Cream">Cream</Select.Option>
              <Select.Option value="Brown">Brown</Select.Option>
              <Select.Option value="Grey">Grey</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsVariantModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal title="Add Colour" open={isColorModalVisible} onCancel={() => setIsColorModalVisible(false)} footer={null}>
        <Form
          onFinish={(values) => {
            // TODO: Add new color to options
            setIsColorModalVisible(false)
          }}
          layout="vertical"
        >
          <Form.Item label="Name of Colour" name="colorName" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="Enter colour name" />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsColorModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default CreateProduct
