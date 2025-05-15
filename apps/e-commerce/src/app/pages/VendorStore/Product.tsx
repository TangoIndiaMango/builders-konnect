import { useState } from 'react';
import ProductCard from '../../components/ProductListing/ProductListing';
import { Link } from 'react-router-dom';
import type { Merchant } from '../../../hooks/useApis';
import { useGetMerchantProducts } from '../../../hooks/useApis';
import { Spin, Pagination } from 'antd';
import type { Product } from '../../types/product';

interface ProductProps {
  merchant: Merchant;
  filters: Record<string, unknown>;
}

export default function Product({ merchant, filters }: ProductProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData, isLoading } = useGetMerchantProducts(merchant.id, { 
    ...filters,
    page: currentPage,
    limit: 12
  });

  console.log('Products data:', productsData);
  console.log('Current filters:', filters);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  const products = productsData?.data?.data || [];
  console.log('Processed products:', products);

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No products found for this merchant
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((item) => {
          const product: Product = {
            id: parseInt(item.id) || 0,
            name: item.name,
            price: parseFloat(item.retail_price) || 0,
            images: [item.primary_media_url || ''],
            discount: item.discount_information?.amount ? parseFloat(item.discount_information.amount) : 0,
            rating: item.ratings || 0,
            description: item.description,
            category: item.category
          };
          
          return (
            <Link to={`/product-details/${item.id}`} key={item.id}>
              <ProductCard item={product} />
            </Link>
          );
        })}
      </div>
      
      {productsData?.data && productsData.data.last_page > 1 && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            total={productsData.data.total}
            pageSize={productsData.data.per_page}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
