import { FormInstance } from "antd"
import { RcFile, UploadFile } from "antd/es/upload"

export interface Step1Props {
  form: FormInstance
  categories: Category[]
  subcategories: Category[]
  productTypes: Category[]
}

export interface Step2Props {
  form: FormInstance
  fileList: UploadFile[]
  handleBeforeUpload: (file: RcFile) => boolean
  handleUploadChange: ({ fileList }: { fileList: UploadFile[] }) => void
}

export interface Step3Props {
  form: FormInstance
}

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
  variants?: Variant[]
}
