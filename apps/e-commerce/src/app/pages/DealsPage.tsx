import { useState } from 'react';
import { Card, Rate } from 'antd';
import { useGetProducts } from '../../hooks/useApis';
import FilterPanel from '../components/DealsPage/FilterPanel';
import ProductHeader from '../components/ProductListing/ProductHeader';
import type { FilterState } from '../components/DealsPage/FilterPanel';
import { woodlikeone } from '../lib/assets/images';

type ProductFilters = FilterState;

interface Product {
  id: string;
  name: string;
  primary_media_url: string;
  retail_price: string;
  discount_information?: {
    value: string;
  };
  ratings: number;
}

const DealsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({
    attributes: {},
    price: [0, 1000000]
  });

  // Fetch products with deals filter

  const { data: productsData, isLoading } = useGetProducts({
    collection: 'deal_of_the_day',
    categoryId: filters.attributes.category?.[0],
    ...(filters.price.length === 2 && {
      min_price: filters.price[0],
      max_price: filters.price[1]
    }),
    ...Object.entries(filters.attributes).reduce((acc, [key, values]) => {
      if (key === 'category') return acc;
      return {
        ...acc,
        [`filters[metadata][${key.toLowerCase()}]`]: values
      };
    }, {}),
    page: currentPage,
    paginate: 10
  
  });

  const handleFilterChange = (newFilters: FilterState) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
  };

  const handleSortChange = () => {
    // Sort option is handled by the API
  };

  return (
    <div>
      <div className="flex w-full overflow-hidden">
        <FilterPanel onFilterChange={handleFilterChange} />
        <div className="w-full overflow-y-auto bg-white p-8">
          <div className="flex  bg-[#003399] justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-white">Deals of the Day</h1>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-lg text-white">
                <span>Ends in</span>
                <div className="rounded">03</div>
                <span>:</span>
                <div className="rounded">23</div>
                <span>:</span>
                <div className="rounded">19</div>
                <span>:</span>
                <div className="rounded">56</div>
              </div>
            </div>
          </div>

          {/* <ProductHeader 
            onSortChange={handleSortChange} 
            productCount={productsData?.data?.data?.length || 0}
            currentPage={currentPage}
            totalPages={productsData?.data?.last_page || 1}
            onPageChange={setCurrentPage}
          /> */}

          {isLoading ? (
            <div className="text-center pb-8">Loading products...</div>
          ) : productsData?.data?.data?.length ? (
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsData.data.data.map((product: Product) => (
                <Card
                  key={product.id}
                  hoverable
                  cover={
                    <div className="relative pt-[100%]">
                      <img
                        alt={product.name}
                        src={product.primary_media_url || woodlikeone}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      {product.discount_information?.value && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                          -{product.discount_information.value}% Off
                        </div>
                      )}
                    </div>
                  }
                >
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <Rate allowHalf defaultValue={product.ratings} className="text-sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <span className="text-lg font-bold text-red-500 break-all">₦{product.retail_price}</span>
                      {product.discount_information?.value && (
                        <span className="ml-2 text-sm text-gray-500 line-through break-all">
                          ₦{parseFloat(product.retail_price) * (1 + parseFloat(product.discount_information.value) / 100)}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No deals available at the moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealsPage;
