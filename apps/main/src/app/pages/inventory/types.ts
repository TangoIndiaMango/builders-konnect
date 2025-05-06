import type { UploadFile } from "antd"

export interface Category {
  value: string
  label: string
}

export interface Variant {
  size: string
  finishType: string
  shapeType: string
  color: string
}

export interface ProductFormData {
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