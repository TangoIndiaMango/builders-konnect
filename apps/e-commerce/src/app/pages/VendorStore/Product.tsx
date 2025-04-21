import { vendorProductCards } from '../../lib/Constants';
import ProductCard from '../../components/ProductListing/ProductListing';
import { Link } from 'react-router-dom';

function Product() {
  return (
    <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vendorProductCards.map((item) => (
        <Link to={`/product-details/${item?.id}`} key={item.id}>
          <ProductCard item={item} />
        </Link>
      ))}
    </div>
  );
}

export default Product