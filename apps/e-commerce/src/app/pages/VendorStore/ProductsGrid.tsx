import { Pagination, Spin, Button, Typography } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { Product } from '../../types/product';
import ProductCard from '../../components/ProductListing/ProductListing';
import { ReloadOutlined } from '@ant-design/icons';

interface ProductData {
  id: string;
  name: string;
  retail_price: string;
  primary_media_url?: string;
  discount_information?: {
    amount: string;
  };
  ratings?: number;
  description: string;
  category: string;
}

interface PaginatedResponse {
  data: ProductData[];
  total: number;
  per_page: number;
  last_page: number;
}

interface ProductsGridProps {
  productsData: PaginatedResponse | null;
  productsLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const ProductsGrid = ({
  productsData,
  productsLoading,
  currentPage,
  setCurrentPage,
}: ProductsGridProps) => {
  return (
    <main className="flex-1 mt-3">
      {productsLoading ? (
        <div className="flex justify-center items-center py-8">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          {(productsData?.data || []).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <Typography.Title level={4} className="text-gray-500 mb-4">
                No products found
              </Typography.Title>
              <Typography.Text className="text-gray-400 mb-6">
                Try adjusting your filters or search criteria
              </Typography.Text>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => window.location.reload()}
              >
                Reload
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(productsData?.data || []).map((item: ProductData) => {
              console.log('Product Debug:', {
                id: item.id,
                type: typeof item.id,
                name: item.name,
                full_item: item
              });
              const product: Product = {
                id: item.id,
                name: item.name,
                price: item.retail_price ? parseFloat(item.retail_price) : 0,
                images: [item.primary_media_url || ''],
                discount: item.discount_information?.amount
                  ? parseFloat(item.discount_information.amount)
                  : 0,
                rating: item.ratings || 0,
                description: item.description,
                category: item.category,
              };

              return (
                <RouterLink key={item.id} to={`/product-details/${item.id}`}>
                  <ProductCard item={product} />
                </RouterLink>
              );
              })}
            </div>
          )}

          {productsData && productsData.last_page > 1 && (
            <div className="flex justify-center">
              <Pagination
                current={currentPage}
                total={productsData.total}
                pageSize={productsData.per_page}
                onChange={setCurrentPage}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ProductsGrid;
