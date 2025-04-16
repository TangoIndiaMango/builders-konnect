import { Link } from 'react-router-dom';
import FilterPanel from '../components/ProductListing/filter';
import ProductHeader from '../components/ProductListing/ProductHeader';
import ProductCard from '../components/ProductListing/ProductListing';
import { productCards } from '../lib/Constants';

function TilingAndFlooringListings() {
  return (
    <div>
      <h1 className="text-sm cursor-pointer text-[#00000073]  py-8">
        {' '}
        Home / <span className="text-[#00000073]">
          Tiling and Flooring
        </span> / <span className="text-[#00000073]">Tiles</span>/{' '}
        <span className="text-[#000000D9]">Wood-Look Tiles</span>
      </h1>
      <div className="flex w-full  overflow-hidden">
        <FilterPanel />
        <div className="w-full overflow-y-auto bg-white p-8">
          <ProductHeader />
          {productCards.map((item) => (
            <Link to={`/productdetails/${item.id}`} key={item.id}>
              <ProductCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TilingAndFlooringListings;
