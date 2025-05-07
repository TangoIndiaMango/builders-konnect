
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Form, Input, Select, Button, Upload, Typography, Row, Col, Modal, message } from "antd"
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons"
import type { UploadFile } from "antd/es/upload/interface"

const { Text } = Typography
const { Option } = Select

interface Variant {
  size: string
  finishType: string
  shapeType: string
  color: string
}

const EditProduct = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state

  const [form] = Form.useForm()
  const [variantForm] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [variant, setVariant] = useState<Variant>({
    size: "60x60 cm",
    finishType: "Glossy",
    shapeType: "Square",
    color: "Pink",
  })
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // Debug log to see what data is coming in
  useEffect(() => {
    console.log("Product data received:", product)
  }, [product])

  useEffect(() => {
    if (product) {
      // Set form values with fallbacks to ensure fields are populated
      form.setFieldsValue({
        name: product.name || "Mandalas Tiles",
        sku: product.sku || "PC-202502-NG",
        category: product.category || "tiles",
        subcategory: product.subcategory || "wall-tiles",
        productType: product.productType || "ceramic",
        brand: product.brand || "M and D Global",
      })

      // Set variant with fallbacks
      if (product.variants && product.variants.length > 0) {
        const productVariant = product.variants[0]
        setVariant({
          size: productVariant.size || "60x60 cm",
          finishType: productVariant.finishType || "Glossy",
          shapeType: productVariant.shapeType || "Square",
          color: productVariant.color || "Pink",
        })
      } else {
        setVariant({
          size: product.size || "60x60 cm",
          finishType: product.finishType || "Glossy",
          shapeType: product.shapeType || "Square",
          color: product.color || "Pink",
        })
      }

      // Set file list for images
      if (product.productImages && product.productImages.length > 0) {
        const images = product.productImages.map((image: any, index: number) => ({
          uid: `-${index}`,
          name: `image-${index}.png`,
          status: "done",
          url: image.url || image.thumbUrl,
          thumbUrl: image.thumbUrl || image.url,
        }))
        setFileList(images)
      } else if (product.imageUrl) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: product.imageUrl,
            thumbUrl: product.imageUrl,
          },
        ])
      }
    }
  }, [form, product])

  // Set variant form values when modal opens
  useEffect(() => {
    if (isVariantModalVisible) {
      variantForm.setFieldsValue(variant)
    }
  }, [isVariantModalVisible, variant, variantForm])

  const handleCancel = () => {
    navigate(-1)
  }

  const handleNext = () => {
    form.validateFields().then((values) => {
      const updatedProduct = {
        ...product,
        ...values,
        size: variant.size,
        finishType: variant.finishType,
        shapeType: variant.shapeType,
        color: variant.color,
        productImages: fileList,
        variants: [variant],
      }

      console.log("Updated product:", updatedProduct)
      message.success("Product updated successfully!")
      navigate("/pos/inventory")
    })
  }

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList)
  }

  const handleEditVariant = () => {
    setIsVariantModalVisible(true)
  }

  const handleVariantSubmit = (values: Variant) => {
    setVariant(values)
    setIsVariantModalVisible(false)
    message.success("Variant updated successfully!")
  }

  const handleDeleteVariant = () => {
    setIsDeleteModalVisible(true)
  }

  const confirmDeleteVariant = () => {
    setVariant({
      size: "",
      finishType: "",
      shapeType: "",
      color: "",
    })
    setIsDeleteModalVisible(false)
    message.success("Variant deleted successfully!")
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-white text-black">
        <div className="flex items-center">
          <Button type="text" icon={<ArrowLeftOutlined style={{ color: "black" }} />} onClick={handleCancel}>
            <span style={{ color: "black" }}>Request to Add Product</span>
          </Button>
        </div>
        <div>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Text type="secondary">Fill the form below to add a new product.</Text>

        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          requiredMark={false}
          colon={false}
          labelCol={{ style: { textAlign: "right" } }}
        >
          <Row gutter={16}>
            <Col span={6} className="text-right">
              <Text className="text-red-500">*</Text> Product Name:
            </Col>
            <Col span={18}>
              <Form.Item name="name" rules={[{ required: true, message: "Required" }]} noStyle>
                <Input placeholder="Enter product name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className="mt-4">
            <Col span={6} className="text-right">
              <Text className="text-red-500">*</Text> Store Keeping Unit (SKU):
            </Col>
            <Col span={18}>
              <Form.Item name="sku" rules={[{ required: true, message: "Required" }]} noStyle>
                <Input placeholder="PC-202502-MG" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className="mt-4">
            <Col span={6} className="text-right">
              <Text className="text-red-500">*</Text> Product Category:
            </Col>
            <Col span={18}>
              <Form.Item name="category" rules={[{ required: true, message: "Required" }]} noStyle>
                <Select placeholder="Select category" suffixIcon={<span>▼</span>}>
                  <Option value="tiles">Tiles</Option>
                  <Option value="building">Building Materials</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className="mt-4">
            <Col span={6} className="text-right">
              <Text className="text-red-500">*</Text> Sub Category:
            </Col>
            <Col span={18}>
              <Form.Item name="subcategory" rules={[{ required: true, message: "Required" }]} noStyle>
                <Select placeholder="Select sub category" suffixIcon={<span>▼</span>}>
                  <Option value="wall-tiles">Wall Tiles</Option>
                  <Option value="floor-tiles">Floor Tiles</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className="mt-4">
            <Col span={6} className="text-right">
              <Text className="text-red-500">*</Text> Product Type:
            </Col>
            <Col span={18}>
              <Form.Item name="productType" rules={[{ required: true, message: "Required" }]} noStyle>
                <Select placeholder="Select product type" suffixIcon={<span>▼</span>}>
                  <Option value="ceramic">Ceramic</Option>
                  <Option value="porcelain">Porcelain</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className="mt-4">
            <Col span={6} className="text-right">
              Brand:
            </Col>
            <Col span={18}>
              <Form.Item name="brand" noStyle>
                <Input placeholder="Enter brand name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className="mt-4">
            <Col span={6} className="text-right">
              <Text className="text-red-500">*</Text> Product Images:
            </Col>
            <Col span={18}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
                maxCount={4}
              >
                {fileList.length < 4 && (
                  <div className="text-center">
                    <PlusOutlined />
                    <div className="mt-2">Upload</div>
                  </div>
                )}
              </Upload>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Recommended file size: less than 2MB, keep visual elements centred
              </Text>
            </Col>
          </Row>

          <Row gutter={16} className="mt-4">
            <Col span={6} className="text-right">
              <Text className="text-red-500">*</Text> Product Variant:
            </Col>
            <Col span={18}>
              <div>
                <Row gutter={16} className="mb-2">
                  <Col span={4}>Size:</Col>
                  <Col span={20}>
                    <div
                      className="border rounded px-2 py-1 bg-blue-100 text-blue-600 inline-block"
                      style={{ fontSize: "12px" }}
                    >
                      {variant.size || "60x60 cm"}
                    </div>
                  </Col>
                </Row>

                <Row gutter={16} className="mb-2">
                  <Col span={4}>Finish Type:</Col>
                  <Col span={20}>
                    <div
                      className="border rounded px-2 py-1 bg-blue-100 text-blue-600 inline-block"
                      style={{ fontSize: "12px" }}
                    >
                      {variant.finishType || "Glossy"}
                    </div>
                  </Col>
                </Row>

                <Row gutter={16} className="mb-2">
                  <Col span={4}>Shape Type:</Col>
                  <Col span={20}>
                    <div
                      className="border rounded px-2 py-1 bg-blue-100 text-blue-600 inline-block"
                      style={{ fontSize: "12px" }}
                    >
                      {variant.shapeType || "Square"}
                    </div>
                  </Col>
                </Row>

                <Row gutter={16} className="mb-2">
                  <Col span={4}>Colour:</Col>
                  <Col span={20}>
                    <div
                      className="border rounded px-2 py-1 bg-blue-100 text-blue-600 inline-block"
                      style={{ fontSize: "12px" }}
                    >
                      {variant.color || "Pink"}
                    </div>
                  </Col>
                </Row>

                <div className="mt-2">
                  <Button
                    type="link"
                    style={{ color: "#3B43FF", padding: 0, marginRight: 16 }}
                    onClick={handleEditVariant}
                  >
                    <span style={{ fontSize: "12px" }}>🖊 Edit product variant</span>
                  </Button>
                  <Button type="link" danger style={{ padding: 0 }} onClick={handleDeleteVariant}>
                    <span style={{ fontSize: "12px" }}>🗑 Delete product variant</span>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Edit Variant Modal */}
      <Modal
        title="Edit Product Variant"
        open={isVariantModalVisible}
        onCancel={() => setIsVariantModalVisible(false)}
        footer={null}
      >
        <Form form={variantForm} layout="vertical" onFinish={handleVariantSubmit}>
          <Form.Item label="Size" name="size" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select size">
              <Option value="60x60 cm">60x60 cm</Option>
              <Option value="30x30 cm">30x30 cm</Option>
              <Option value="45x45 cm">45x45 cm</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Finish Type" name="finishType" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select finish type">
              <Option value="Matte">Matte</Option>
              <Option value="Glossy">Glossy</Option>
              <Option value="Polished">Polished</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Shape Type" name="shapeType" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select shape type">
              <Option value="Square">Square</Option>
              <Option value="Rectangle">Rectangle</Option>
              <Option value="Hexagon">Hexagon</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Color" name="color" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select color">
              <Option value="White">White</Option>
              <Option value="Black">Black</Option>
              <Option value="Cream">Cream</Option>
              <Option value="Brown">Brown</Option>
              <Option value="Grey">Grey</Option>
              <Option value="Pink">Pink</Option>
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

      {/* Delete Variant Confirmation Modal */}
      <Modal
        title="Delete Variant"
        open={isDeleteModalVisible}
        onOk={confirmDeleteVariant}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this product variant?</p>
      </Modal>
    </div>
  )
}

export default EditProduct
