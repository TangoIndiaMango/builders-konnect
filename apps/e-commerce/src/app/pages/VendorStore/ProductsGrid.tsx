import { Pagination } from 'antd';
import { Spin } from 'antd';
import { Product } from '../../types/product';
import ProductCard from '../../components/ProductListing/ProductListing';

interface ProductsGridProps {
  productsData: any;
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
          <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(productsData?.data || []).map((item: any) => {
              const product: Product = {
                id: item.id,
                name: item.name,
                price: parseFloat(item.retail_price),
                images: [item.primary_media_url || ''],
                discount: item.discount_information?.amount
                  ? parseFloat(item.discount_information.amount)
                  : 0,
                rating: item.ratings || 0,
                description: item.description,
                category: item.category,
              };

              return <ProductCard item={product} />;
            })}
          </div>

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
