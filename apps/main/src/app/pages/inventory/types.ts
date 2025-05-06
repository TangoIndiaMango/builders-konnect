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

export interface ProductData {
  id: string;
  name: string;
  SKU: string;
  ean: string;
  category: string | null;
  subcategory: string | null;
  product_type: string | null;
  retail_price: string;
  cost_price: string;
  metadata: string | null;
  description: string | null;
  tags: string | null;
  quantity: number;
  measurement_unit: string | null;
  reorder_value: string | null;
  primary_media_url: string;
  media: string[];
  totalPrice: number;
}