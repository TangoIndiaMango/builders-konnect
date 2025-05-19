export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  discount: number;
  rating: number;
  category?: string;
  description?: string;
  specifications?: Record<string, string>;
  icon?: string;
}
