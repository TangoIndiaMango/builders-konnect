import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import ProductCards from '../ProductListing/ProductListingHomePage';
import { useGetCategorizations, useGetProducts } from '../../../hooks/useApis';
import { woodliketwo } from '../../lib/assets/images';

interface Product {
  id: string;
  name: string;
  retail_price: string;
  discount_information?: {
    value: string;
  };
  ratings?: number;
  primary_media_url?: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

const CategoryFilter: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { data: categories, isLoading: categoriesLoading } = useGetCategorizations('category');
  const { data: products, isLoading: productsLoading } = useGetProducts({
    categoryId: selectedCategory,
  });

  useEffect(() => {
    if (categories?.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  if (categoriesLoading) {
    return <div className="flex justify-center py-4"><Spin /></div>;
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <h2 className="md:text-3xl text-lg font-medium leading-[40px] text-[#000000D9] flex items-center">
          <span className="w-1.5 h-8 bg-red-600 mr-4 inline-block"></span>
          Browse By Category
        </h2>
      </div>

      <div className="flex gap-4 justify-center flex-wrap mb-6">
        {categories?.map((category: Category) => (
          <Button
            key={category.id}
            type={selectedCategory === category.id ? 'primary' : 'default'}
            size="large"
            className={`min-w-[150px] h-16 rounded-xl text-lg font-semibold transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-[#D64545] border-none text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsLoading ? (
          <div className="col-span-full flex justify-center py-4"><Spin /></div>
        ) : (
          products?.data?.data?.slice(0, 4).map((product: Product) => (
            <Link key={product.id} to={`/product-details/${product.id}`}>
              <ProductCards 
                key={product.id} 
                item={{
                  id: Number(product.id),
                  name: product.name,
                  price: parseFloat(product.retail_price),
                  discount: product.discount_information?.value ? parseFloat(product.discount_information.value) : 0,
                  rating: product.ratings || 0,
                  image: product.primary_media_url || woodliketwo,
                  category: product.category
                }} 
              />
            </Link>
          ))
        )}
      </div>

      <Link to={`/category/${selectedCategory}`}>
        <div className="mt-10 flex justify-center">
          <Button
            type="primary"
            size="large"
            className="min-w-[150px] h-16 rounded-xl text-lg font-semibold transition-all duration-200 bg-[#D64545] border-none text-white"
          >
            View All
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryFilter;
