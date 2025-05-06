"use client"

import React from 'react'
import { Form, Button, Typography, Modal, message } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import type { RcFile, UploadFile } from "antd/es/upload"
import Step1 from "./components/Step1"
import Step2 from "./components/Step2"
import Step3 from "./components/Step3"
import type { Category, ProductFormData, Variant } from "./components/types"

const { Title } = Typography

const CreateProduct: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [productTypes, setProductTypes] = useState<Category[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [productCode, setProductCode] = useState<string>('')
  const [formData, setFormData] = useState<ProductFormData>({} as ProductFormData)
  const [variants] = useState<Variant[]>([])

  const handleNext = async () => {
    try {
      await form.validateFields()
      setCurrentStep(currentStep + 1)
    } catch (_error) {
      message.error('Please fill in all required fields')
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFinish = async () => {
    try {
      const values = await form.validateFields()
      const productData = {
        ...values,
        productImages: fileList,
        variants
      }
      setFormData(productData)
      setIsModalVisible(true)
      setProductCode(Math.random().toString(36).substring(7))
    } catch (_error) {
      message.error('Please fill in all required fields')
    }
  }

  const handleOk = () => {
    setIsModalVisible(false)
    navigate('/inventory')
  }

  const handleBeforeUpload = (file: RcFile) => {
    setFileList([...fileList, file as UploadFile])
    return false
  }

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList)
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for now
        setCategories([
          { value: 'category1', label: 'Category 1' },
          { value: 'category2', label: 'Category 2' },
        ])
      } catch (_error) {
        message.error('Failed to fetch categories')
      }
    }
    fetchData()
  }, [])

  const steps = [
    {
      title: 'Basic Information',
      content: (
        <Step1
          form={form}
          categories={categories}
          subcategories={subcategories}
          productTypes={productTypes}
        />
      )
    },
    {
      title: 'Product Specifications',
      content: (
        <Step2
          form={form}
          fileList={fileList}
          handleBeforeUpload={handleBeforeUpload}
          handleUploadChange={handleUploadChange}
        />
      )
    },
    {
      title: 'Pricing & Inventory',
      content: <Step3 form={form} />
    }
  ]

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/inventory')}
          className="mr-4"
        >
          Back
        </Button>
        <Title level={2} className="m-0">Create Product</Title>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Form form={form} layout="vertical" className="max-w-3xl mx-auto">
          {steps[currentStep].content}

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={handleFinish}>
                Finish
              </Button>
            )}
          </div>
        </Form>
      </div>

      <Modal title="Product Successfully Added" open={isModalVisible} onOk={handleOk} onCancel={handleOk}>
        <p className="text-sm text-[#000000D9]">A Product Code has been generated for this product.</p>
        <p className="font-bold text-sm mt-2 text-[#003399]">{productCode}</p>
      </Modal>
    </div>
  )
}

export default CreateProduct
 