import { FC } from 'react';
import { Rate, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../../../hooks/useProductDetails';
import { woodlikeone } from '../../lib/assets/images';

const MainProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: productData, isLoading } = useProductDetails(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!productData || !productData.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const product = productData.data;
  const originalPrice = parseFloat(product.retail_price);
  const discountAmount = product.discount_information ? parseFloat(product.discount_information.value) : 0;
  const finalPrice = originalPrice - discountAmount;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.primary_media_url || woodlikeone}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {product.media.map((url, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={url || woodlikeone}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <Rate disabled defaultValue={product.ratings} allowHalf />
            <span className="text-gray-500">({product.total_reviews} reviews)</span>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-red-600">
                ₦{finalPrice.toLocaleString()}
              </span>
              {discountAmount > 0 && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ₦{originalPrice.toLocaleString()}
                  </span>
                  <span className="text-red-500">
                    -{Math.round((discountAmount / originalPrice) * 100)}% Off
                  </span>
                </>
              )}
            </div>
          </div>

          {product.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Category</h2>
            <p className="text-gray-600">{product.category}</p>
          </div>

          {product.metadata && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Specifications</h2>
              <dl className="divide-y border-t border-b">
                {Object.entries(product.metadata).map(([key, value]) => (
                  <div key={key} className="py-3 flex justify-between">
                    <dt className="text-gray-600">{key}</dt>
                    <dd className="text-gray-900">{value as string}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Ratings Breakdown */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Ratings Breakdown</h2>
            <div className="space-y-2">
              {Object.entries(product.ratings_breakdown)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([stars, count]) => (
                  <div key={stars} className="flex items-center gap-4">
                    <span className="w-16">{stars} stars</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-yellow-400 h-full rounded-full"
                        style={{
                          width: `${(count / product.total_reviews) * 100 || 0}%`,
                        }}
                      />
                    </div>
                    <span className="w-16 text-right text-gray-500">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProductDetails;
