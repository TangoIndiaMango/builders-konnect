import { FC, useState } from 'react';
import { Rate, Spin, Button, Select, Form, Input, Upload, message } from 'antd';
import CategoryBreadcrumb from '../CategoryBreadcrumb';
import { Link, useParams } from 'react-router-dom';
import { useProductDetails } from '../../../hooks/useProductDetails';
import { woodlikeone } from '../../lib/assets/images';
import { UploadOutlined } from '@ant-design/icons';
import { useCreateData } from '../../../hooks/useApis';
import { useCart } from '../../../store/cartStore';
import type { UploadFile } from 'antd/es/upload/interface';

const MainProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate(); // Removing unused variable
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSurface, setSelectedSurface] = useState('Wall');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const decodedId = id ? decodeURIComponent(id) : '';
  const { data: productData, isLoading: productLoading } = useProductDetails(decodedId);
  const [form] = Form.useForm();
  const createReview = useCreateData('customers/reviews');
  const { addToCart, isLoading: cartLoading } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        line_items: [
          {
            product_id: decodedId,
            quantity: selectedQuantity
          }
        ]
      });
      message.success('Product added to cart successfully');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || 'Failed to add product to cart');
      } else {
        message.error('Failed to add product to cart');
      }
    }
  };

  if (productLoading || cartLoading) {
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
console.log(product, "pppp")
  return (
    <div className="container mx-auto px-4 space-y-6 py-8">
      <div>
        <CategoryBreadcrumb
          items={[
            { title: 'Home', path: '/' },
            ...(product.category ? [
              { title: product.category, path: `/category/${encodeURIComponent(product.product_type.id)}` }
            ] : []), 
            ...(product.sub_category ? [
              { title: product.sub_category.name, path: `/category/${encodeURIComponent(product.product_type.id)}/subcategory/${encodeURIComponent(product.sub_category.id)}` }
            ] : []),
            { title: product.name }
          ]}
        />

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

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <Select
                  value={selectedQuantity}
                  onChange={(value) => setSelectedQuantity(value)}
                  className="w-24"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <Select.Option key={num} value={num}>
                      {num}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <Button 
                type="primary" 
                size="large" 
                className="w-full" 
                onClick={handleAddToCart}
                loading={cartLoading}
              >
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

        <div className="flex flex-col md:flex-row gap-8 mt-16">
          {/* Write a Review */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={async (values) => {
                try {
                  const formData = new FormData();
                  formData.append('feedback', values.feedback);
                  formData.append('ratings', values.ratings);
                  formData.append('modelable_type', 'product');
                  formData.append('modelable_id', id || '');

                  fileList.forEach((file) => {
                    if (file.originFileObj) {
                      formData.append('images[]', file.originFileObj);
                    }
                  });

                  await createReview.mutateAsync(formData as FormData);
                  message.success('Review submitted successfully');
                  form.resetFields();
                  setFileList([]);
                } catch {
                  message.error('Failed to submit review');
                }
              }}
            >
              <Form.Item
                name="ratings"
                label="Rating"
                rules={[{ required: true, message: 'Please rate the product' }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                name="feedback"
                rules={[{ required: true, message: 'Please write your review' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Share your experience with this product"
                />
              </Form.Item>

              <Form.Item>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={() => false}
                  maxCount={5}
                >
                  <div>
                    <UploadOutlined />
                    <div className="mt-2">Add Photos</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={createReview.isPending}
                  className="bg-blue-600 w-full"
                >
                  Submit Review
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Customer Reviews */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <Rate disabled defaultValue={product.ratings} allowHalf />
                <span className="text-gray-500">({product.total_reviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {Object.entries(product.ratings_breakdown)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([stars, count]) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-20 text-sm">{stars} stars</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${(count / product.total_reviews) * 100 || 0}%`,
                        }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm text-gray-500">{count}</span>
                  </div>
                ))}
            </div>

            <div className="space-y-6">
              {product.reviews?.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm text-gray-600">
                          {review.user_name[0]}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{review.user_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Rate disabled defaultValue={review.rating} />
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="mt-3 flex gap-2">
                          {review.images.map((image, index) => (
                            <div
                              key={index}
                              className="w-16 h-16 rounded overflow-hidden bg-gray-50"
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
                  </div>
                </div>
              ))}
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
        </div>
        {/* Customer Reviews */}

        {/* Review Form */}

        {/* Review List */}
      </div>
    </div>
  );
};

export default MainProductDetails;
