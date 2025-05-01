import { axiosInstance } from "../../utils/axios-instance"
import { Product, ProductSearchParams } from "./inventory.types"

const INVENTORY_URL = "/merchants/inventory-products"
const SEARCH_URL = "/super_admin/catalogues"

const inventoryURLs = {
  searchProducts: SEARCH_URL,
  getProduct: '/:id',
  createProduct: '',
  updateProduct: '/:id',
  deleteProduct: '/:id'
}

export const searchProducts = async (params?: ProductSearchParams) => {
  const queryParams = new URLSearchParams();
  
  if (params?.paginate !== undefined) queryParams.append('paginate', params.paginate.toString());
  if (params?.q) queryParams.append('q', params.q);
  if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params?.date_filter) queryParams.append('date_filter', params.date_filter);
  if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
  if (params?.export) queryParams.append('export', params.export);

  const queryString = queryParams.toString();
  const finalURL = `${SEARCH_URL}${queryString ? `?${queryString}` : ''}`;

  const response = await axiosInstance.get(finalURL);
  return response.data;
}

export const getProduct = async (id: string) => {
  const response = await axiosInstance.get(INVENTORY_URL + inventoryURLs.getProduct.replace(':id', id))
  return response.data
}

export const createProduct = async (data: Partial<Product>) => {
  const response = await axiosInstance.post(INVENTORY_URL + inventoryURLs.createProduct, data)
  return response.data
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const response = await axiosInstance.put(INVENTORY_URL + inventoryURLs.updateProduct.replace(':id', id), data)
  return response.data
}

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(INVENTORY_URL + inventoryURLs.deleteProduct.replace(':id', id))
  return response.data
}
