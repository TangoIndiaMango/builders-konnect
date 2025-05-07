"use client"

import { Form, Input, Upload, Button, Select } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { Step2Props } from "./types"

const Step2 = ({ form, fileList, handleBeforeUpload }: Step2Props) => {
  return (
    <div className="space-y-4">
      <Form.Item label="Product Images" name="productImages">
        <Upload
          listType="picture"
          fileList={fileList}
          beforeUpload={handleBeforeUpload}
          onChange={({ fileList }) => form.setFieldsValue({ productImages: fileList })}
          multiple
        >
          <Button icon={<UploadOutlined />}>Upload Images</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Description" name="description" rules={[{ required: true, message: "Required" }]}>
        <Input.TextArea rows={4} placeholder="Enter product description" />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select mode="tags" placeholder="Add tags" />
      </Form.Item>
    </div>
  )
}

export default Step2
