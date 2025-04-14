import React from 'react';
import ProductCard from './ProductCard';

const ProductExample: React.FC = () => {
  const handleAddToCart = () => {
    console.log('Added to cart');
    // Implement cart functionality here
  };

  return (
    <div className="p-4">
      <ProductCard
        title="Montreal Serene Paint"
        price={23803}
        originalPrice={48577}
        discount={51}
        rating={4.5}
        reviews={567}
        imageUrl="/path-to-paint-image.jpg"
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductExample;
