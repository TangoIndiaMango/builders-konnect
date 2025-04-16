import { Link, useParams } from 'react-router-dom';
import FilterPanel from '../components/ProductListing/filter';
import ProductHeader from '../components/ProductListing/ProductHeader';
import ProductCard from '../components/ProductListing/ProductListing';
import { productCards, categoriess } from '../lib/Constants';

// Helper to normalize slugs (replace spaces with hyphens and lowercase)
const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

function TilingAndFlooringListings() {
  const { category, subcategory } = useParams();

  const categoryData = categoriess.find(
    (cat) => slugify(cat.slug) === slugify(category || '')
  );

  const subcategoryData = categoryData?.subcategories.find(
    (sub) => slugify(sub.slug) === slugify(subcategory || '')
  );

  return (
    <div>
      <h1 className="text-sm cursor-pointer text-[#00000073] py-8">
        Home /{' '}
        <span className="text-[#00000073]">
          {categoryData?.name || 'Category'}
        </span>{' '}
        /
        <span className="text-[#000000D9]">
          {subcategoryData?.name || 'Subcategory'}
        </span>
      </h1>
      <div className="flex w-full overflow-hidden">
        <FilterPanel />
        <div className="w-full overflow-y-auto bg-white p-8">
          <ProductHeader />
          <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productCards.map((item) => (
              <Link to={`/product-details/${item?.id}`} key={item.id}>
                <ProductCard item={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TilingAndFlooringListings;
