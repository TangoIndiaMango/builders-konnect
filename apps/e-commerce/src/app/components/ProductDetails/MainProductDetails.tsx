import { FC, useState } from 'react';
import { Rate, Spin, Button, Select } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProductDetails } from '../../../hooks/useProductDetails';
import { woodlikeone } from '../../lib/assets/images';
import { ShopOutlined } from '@ant-design/icons';

const MainProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [selectedSurface, setSelectedSurface] = useState('Wall');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
  const discountAmount = product.discount_information
    ? parseFloat(product.discount_information.value)
    : 0;
  const finalPrice = originalPrice - discountAmount;

  return (
    <div className="container mx-auto px-4 space-y-6 py-8">
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/category/${product.category}`}
            className="text-gray-500 hover:text-gray-700"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="lg:w-2/3">
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4 w-24">
                {product.media.map((url, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(url)}
                  >
                    <img
                      src={url || woodlikeone}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={
                    selectedImage || product.primary_media_url || woodlikeone
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Vendor Info */}
            <div className="underline text-blue-500">
              <Link to={`/vendor-store/${product.seller.merchant_code}`}>
                Visit Builder's Connect Store
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <Rate disabled defaultValue={product.ratings} allowHalf />
              <span className="text-gray-500">
                ({product.total_reviews} reviews)
              </span>
            </div>

            <div className="space-y-2 mt-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold">
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

            {/* Product Options */}
            <div className="mt-6 space-y-4 ">
              <div className="lg:flex flex-row gap-10 w-full">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity{' '}
                    <span className="text-red-500 text-sm">
                      {product.available_quantity} left{' '}
                    </span>
                  </label>
                  <Select
                    value={selectedQuantity}
                    onChange={setSelectedQuantity}
                    className="w-full"
                    options={Array.from(
                      { length: product.available_quantity },
                      (_, i) => ({ value: String(i + 1), label: String(i + 1) })
                    )}
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface
                  </label>
                  <Select
                    value={selectedSurface}
                    onChange={setSelectedSurface}
                    className="w-full"
                    options={[
                      { value: 'Wall', label: 'Wall' },
                      { value: 'Floor', label: 'Floor' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length by Width
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors">
                    1285cm by 192cm
                  </button>
                  <button className="p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors">
                    1400cm by 200cm
                  </button>
                  <button className="p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors">
                    2355cm by 334cm
                  </button>
                </div>
              </div>
            </div>
            {product.description && (
              <div className="mt-6">
                {/* <h2 className="text-lg font-semibold mb-2">Description</h2> */}
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Category</h2>
            <p className="text-gray-600">{product.category}</p>
          </div> */}

            <div className="mt-5">
              <Button type="primary" size="large" className="w-full mb-6">
                Add To Cart
              </Button>
            </div>

            <div className="lg:flex fle-row">
              {product.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
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
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.similar_products?.map((similarProduct) => (
              <Link
                key={similarProduct.id}
                to={`/product-details/${similarProduct.id}`}
                className="group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={similarProduct.primary_media_url || woodlikeone}
                    alt={similarProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {similarProduct.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    ₦{parseFloat(similarProduct.retail_price).toLocaleString()}
                  </span>
                  {similarProduct.discount_information && (
                    <span className="text-red-500 text-sm">
                      -{similarProduct.discount_information.value}% Off
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

          <div className='lg:flex flex-row'>
            <div className="mb-6">
              <div className="flex items-center gap-4 mt-6">
                <Rate disabled defaultValue={product.ratings} allowHalf />
                <span className="text-gray-500">
                  ({product.total_reviews} reviews)
                </span>
              </div>{' '}
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
                            width: `${
                              (count / product.total_reviews) * 100 || 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="w-16 text-right text-gray-500">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="space-y-6">
              {product.reviews?.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl text-gray-600">
                          {review.user_name[0]}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{review.user_name}</h3>
                      <div className="flex items-center gap-2">
                        <Rate disabled defaultValue={review.rating} />
                        <span className="text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="mt-4 flex gap-4">
                      {review.images.map((image, index) => (
                        <div
                          key={index}
                          className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100"
                        >
                          <img
                            src={image}
                            alt="Review"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="md:w-2/3">
            Rating Bars
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
                          width: `${(count / product.total_reviews) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-16 text-right text-gray-500">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div> */}
        </div>

        {/* Review List */}
      </div>
    </div>
  );
};

export default MainProductDetails;
