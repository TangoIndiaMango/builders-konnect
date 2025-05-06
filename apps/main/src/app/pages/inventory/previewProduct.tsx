import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Typography, message, Modal, Tag, Row, Col, Card } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

export default function ProductPreview() {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state
  const [imageUrl, setImageUrl] = useState<string>("")

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const [productCode, setProductCode] = useState(product?.productCode || "")

  useEffect(() => {
    if (product) {
      if (product.imageUrl) {
        setImageUrl(product.imageUrl)
      } else if (product.productImages && product.productImages.length > 0) {
        const image = product.productImages[0]
        if (image.url) {
          setImageUrl(image.url)
        } else if (image.thumbUrl) {
          setImageUrl(image.thumbUrl)
        } else if (image.originFileObj) {
          setImageUrl(URL.createObjectURL(image.originFileObj))
        }
      }
    }
  }, [product])

  if (!product) {
    return <div>No product data available</div>
  }

  const handleContinueEditing = () => {
    navigate(`/pos/inventory/edit-product/${product.id}`, {
      state: product,
    })
  }

  const handleAddProduct = () => {
    const generatedCode = Math.random().toString(36).substr(2, 9).toUpperCase()
    setProductCode(generatedCode)
    setIsSuccessModalVisible(true)
  }

  const handleModalOk = () => {
    setIsSuccessModalVisible(false)
    message.success("Product added successfully!")
    setTimeout(() => {
      navigate("/pos/inventory")
    }, 1000)
  }

  const handleCancel = () => {
    window.history.back()
  }

  const getColorCode = (color: string) => {
    const colors: Record<string, string> = {
      white: "#ffffff",
      black: "#000000",
      pink: "#ff69b4",
      cream: "#fffdd0",
      grey: "#808080",
      brown: "#a52a2a",
    }
    return colors[color?.toLowerCase()] || "#ff69b4"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center">
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleCancel} />
          <Title level={4} className="!m-0 ml-2">
            Preview Product
          </Title>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleContinueEditing}>Continue Editing</Button>
          <Button type="primary" onClick={handleAddProduct}>
            Submit Product
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <Row gutter={[16, 16]}>
          {/* Product Image */}
          <Col xs={24} lg={12}>
            <Card bordered={false} className="mb-4" bodyStyle={{ padding: 0 }}>
              {imageUrl ? (
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={product.name || "Product"}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "400px",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f5f5f5",
                    color: "#999",
                  }}
                >
                  No image available
                </div>
              )}
            </Card>
          </Col>

          {/* Product Details */}
          <Col xs={24} lg={12}>
            <div>
              <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                {product.name || "M and D Mandalas Tiles, Ceramic Wall Tiles"}
              </Title>

              <Text className="text-blue-600">
                <a href="#">Added by {product.brand || "Builder's Hub Construction"}</a>
              </Text>

              <Title level={3} style={{ margin: "16px 0" }}>
                ₦ {product.sellingPrice || "70000"}
              </Title>

              <div className="mb-4">
                <Text type="secondary">Size:</Text>
                <div className="border text-sm w-fit mt-1 border-[#003399] text-[#003399] px-3 py-2 rounded-sm">
                  {product.size || "30x30 cm"}
                </div>
              </div>

              {product.stockQuantity && (
                <div className="mb-2">
                  <Text strong>Stock: </Text>
                  <Text>{product.stockQuantity} in stock</Text>
                </div>
              )}

              {product.reorderLevel && (
                <div className="mb-2">
                  <Text strong>Reorder Level: </Text>
                  <Text>{product.reorderLevel}</Text>
                </div>
              )}

              {product.tags && (
                <div className="mb-4">
                  <Text strong>Tags: </Text>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(typeof product.tags === 'string' 
                      ? product.tags.split(',').filter(tag => tag.trim())
                      : Array.isArray(product.tags) 
                        ? product.tags 
                        : []
                    ).map((tag, index) => (
                      <Tag key={index} color="blue">
                        {tag.trim()}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              {product.variants && product.variants.length > 0 && (
                <div className="mt-4">
                  <Text strong>Product Variants:</Text>
                  <Card className="mt-2 p-0 overflow-x-auto">
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", minWidth: "400px" }}>
                        <thead>
                          <tr>
                            <th style={{ padding: "8px", textAlign: "left" }}>Size</th>
                            <th style={{ padding: "8px", textAlign: "left" }}>Finish</th>
                            <th style={{ padding: "8px", textAlign: "left" }}>Shape</th>
                            <th style={{ padding: "8px", textAlign: "left" }}>Color</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.variants.map((variant, index) => (
                            <tr key={index}>
                              <td style={{ padding: "8px" }}>{variant.size || "-"}</td>
                              <td style={{ padding: "8px" }}>{variant.finishType || "-"}</td>
                              <td style={{ padding: "8px" }}>{variant.shapeType || "-"}</td>
                              <td style={{ padding: "8px" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  <div
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      borderRadius: "50%",
                                      backgroundColor: getColorCode(variant.color),
                                      marginRight: "8px",
                                    }}
                                  />
                                  {variant.color || "-"}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}

              {product.description && (
                <div className="mt-4">
                  <Text strong>Description:</Text>
                  <Paragraph style={{ fontSize: "14px", marginTop: "8px" }}>
                    {product.description}
                  </Paragraph>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* Success Modal */}
      <Modal
        title="Product Successfully Added"
        open={isSuccessModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <p className="text-sm text-[#000000D9]">A Product Code has been generated for this product.</p>
        <p className="font-bold text-sm mt-2 text-[#003399]">{productCode}</p>
      </Modal>
    </div>
  )
}
