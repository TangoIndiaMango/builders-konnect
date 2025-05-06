"use client"

import { Form, Input, Select } from "antd"
import type { FormInstance } from "antd"
import type { Step1Props } from "./types"

const Step1 = ({ form, categories, subcategories, productTypes }: Step1Props) => {
  const handleCategoryChange = (value: string) => {
    // Reset subcategory and product type when category changes
    form.setFieldsValue({ subcategory: undefined, productType: undefined })
    
    // Here you would typically fetch subcategories based on the selected category
    // For now, we'll use the mock data
  }

  const handleSubcategoryChange = (value: string) => {
    // Reset product type when subcategory changes
    form.setFieldsValue({ productType: undefined })
    
    // Here you would typically fetch product types based on the selected subcategory
    // For now, we'll use the mock data
  }

  return (
    <div className="space-y-4">
      <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter product name" }]}>
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item label="SKU" name="sku" rules={[{ required: true, message: "Required" }]}>
        <Input placeholder="Enter SKU" />
      </Form.Item>

      <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select a category" }]}>
        <Select
          placeholder="Select category"
          onChange={handleCategoryChange}
        >
          {categories.map(({ value, label }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Subcategory" name="subcategory" rules={[{ required: true, message: "Please select a subcategory" }]}>
        <Select
          placeholder="Select subcategory"
          onChange={handleSubcategoryChange}
        >
          {subcategories.map(({ value, label }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Product Type" name="productType" rules={[{ required: true, message: "Please select a product type" }]}>
        <Select
          placeholder="Select product type"
        >
          {productTypes.map(({ value, label }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Brand" name="brand">
        <Input placeholder="Enter brand name" />
      </Form.Item>
    </div>
  )
}

export default Step1
