import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface ProductDetailsCardProps {
  product: Product;
}

function ProductDetailsCard({ product }: ProductDetailsCardProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div>
      <h1 className="text-sm cursor-pointer text-[#00000073] py-8">
        <Link to="/" className="hover:text-blue-600">Home</Link> /{' '}
        <Link to={`/category/${product.category}`} className="hover:text-blue-600">
          {product.category}
        </Link>{' '}
        / <span className="text-[#000000D9]">{product.name}</span>
      </h1>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col sm:flex-row p-4 gap-4 xl:gap-6 xl:h-full">
          <div className="hidden md:flex flex-col gap-4 w-[120px]">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`object-cover w-full h-28 cursor-pointer rounded ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[456px] h-[300px] sm:h-[400px] xl:h-full">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 max-w-full xl:max-w-2xl xl:h-full px-4">
          <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">₦{product.price.toLocaleString()}</span>
            {product.discount && (
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-400">₦{(product.price / (1 - product.discount / 100)).toLocaleString()}</span>
                <span className="text-red-500">-{product.discount}%</span>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {product.specifications && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
