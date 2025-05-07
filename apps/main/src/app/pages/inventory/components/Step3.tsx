"use client"

import { Form, InputNumber } from "antd"
import type { Step3Props } from "./types"

const Step3 = ({ form }: Step3Props) => {
  return (
    <div className="space-y-4">
      <Form.Item label="Cost Price" name="costPrice" rules={[{ required: true, message: "Required" }]}>
        <InputNumber
          className="w-full"
          formatter={(value) => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => (value || "").replace(/₦\s?|(,*)/g, "")}
          placeholder="Enter cost price"
          onChange={(value) => {
            form.setFieldsValue({ costPrice: value })
          }}
        />
      </Form.Item>

      <Form.Item label="Selling Price" name="sellingPrice" rules={[{ required: true, message: "Required" }]}>
        <InputNumber
          className="w-full"
          formatter={(value) => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => (value || "").replace(/₦\s?|(,*)/g, "")}
          placeholder="Enter selling price"
          onChange={(value) => {
            form.setFieldsValue({ sellingPrice: value })
          }}
        />
      </Form.Item>

      <Form.Item label="Stock Quantity" name="stockQuantity" rules={[{ required: true, message: "Required" }]}>
        <InputNumber 
          className="w-full" 
          placeholder="Enter stock quantity"
          onChange={(value) => {
            form.setFieldsValue({ stockQuantity: value })
          }}
        />
      </Form.Item>

      <Form.Item label="Reorder Level" name="reorderLevel">
        <InputNumber 
          className="w-full" 
          placeholder="Enter reorder level"
          onChange={(value) => {
            form.setFieldsValue({ reorderLevel: value })
          }}
        />
      </Form.Item>
    </div>
  )
}

export default Step3
