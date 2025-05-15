import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FilterPanel from '../components/ProductListing/filter';
import ProductHeader from '../components/ProductListing/ProductHeader';
import ProductCard from '../components/ProductListing/ProductListing';
import { useGetCategorizations, useGetProducts } from '../../hooks/useApis';
import type { FilterState } from '../components/ProductListing/filter';

type ProductFilters = {
  attributes: { [key: string]: string[] };
  price: [(number | undefined), (number | undefined)];
  sort_by?: string;
}

function ProductList() {
  const { category, subcategory } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({
    attributes: {},
    price: [undefined, undefined],
    sort_by: undefined
  });

  // Get category and subcategory names
  const { data: categoryData = [] } = useGetCategorizations('category');
  const { data: subcategoryData = [] } = useGetCategorizations('subcategory', category);

  // Find the current category and subcategory
  const currentCategory = categoryData.find(cat => cat.id === category);
  const currentSubcategory = subcategoryData.find(sub => sub.id === subcategory);

  console.log('currentCategory:', currentCategory);
  console.log('currentSubcategory:', currentSubcategory);

  // Fetch products for the subcategory with filters
  const { data: productsData, isLoading } = useGetProducts({
    subcategoryId: subcategory,
    sort_by: filters.sort_by,
    minPrice: filters.price[0],
    maxPrice: filters.price[1],
    page: currentPage,
    // Convert attributes to API format
    ...Object.entries(filters.attributes).reduce((acc, [key, values]) => {
      // Create an object with the metadata filter in square bracket notation
      const filterKey = `filters[metadata][${key.toLowerCase()}]`;
      return {
        ...acc,
        [filterKey]: values
      };
    }, {})
  });

  const products = productsData?.data || [];

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(prev => ({
      ...prev,
      attributes: newFilters.attributes,
      price: newFilters.price
    }));
  };

  const handleSortChange = (sortOption: string) => {
    setFilters(prev => ({
      ...prev,
      sort_by: sortOption
    }));
  };

  return (
    <div>
      <h1 className="text-sm cursor-pointer text-[#00000073] py-8">
        Home /{' '}
        <span className="text-[#00000073]">
          {currentCategory?.name || 'Category'}
        </span>{' '}
        /
        <span className="text-[#000000D9]">
          {currentSubcategory?.name || 'Subcategory'}
        </span>
      </h1>
      <div className="flex w-full overflow-hidden">
        <FilterPanel 
          onFilterChange={handleFilterChange}
          categoryId={currentSubcategory?.parent_id}
        />
        <div className="w-full overflow-y-auto bg-white p-8">
          <ProductHeader 
            onSortChange={handleSortChange} 
            productCount={productsData?.data?.data?.length || 0}
            currentPage={currentPage}
            totalPages={productsData?.data?.last_page || 1}
            onPageChange={setCurrentPage}
          />
          {isLoading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : productsData?.data?.data?.length > 0 ? (
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsData?.data?.data?.map((item) => (
                <Link to={`/product-details/${item.id}`} key={item.id}>
                  <ProductCard item={{
                    id: parseInt(item.id) || 0,
                    name: item.name,
                    image: item.primary_media_url || '',
                    price: parseFloat(item.retail_price) || 0,
                    discount: item.discount_information?.amount ? parseFloat(item.discount_information.amount) : 0,
                    rating: item.ratings
                  }} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No products found in this subcategory
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
