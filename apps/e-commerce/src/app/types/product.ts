export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  specifications?: Record<string, string>;
  discount?: number;
  rating?: number;
  icon?: string;
}
