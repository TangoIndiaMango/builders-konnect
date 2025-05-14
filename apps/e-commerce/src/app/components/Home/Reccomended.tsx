import { Spin } from "antd";
import { Link } from "react-router-dom";
import { useGetProducts } from "../../../hooks/useApis";
import ProductCards from "../ProductListing/ProductListingHomePage";
import { woodlikefour } from '../../lib/assets/images';

function Reccomended() {
  const { data: products, isLoading } = useGetProducts({
    collection: 'recommended_for_you',
    limit: 10
  });

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="md:text-3xl text-lg font-medium leading-[40px] text-[#000000D9] flex items-center">
          <span className="w-1.5 h-8 bg-red-600 mr-4 inline-block"></span>
          Recommended for you
        </h2>
        <Link to="/products?collection=recommended_for_you" className="text-[#FF4D4F] font-medium hover:text-red-700">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-4"><Spin /></div>
        ) : (
          products?.data?.data?.map((product) => (
            <Link key={product.id} to={`/product-details/${product.id}`}>
              <ProductCards
                item={{
                  id: Number(product.id),
                  name: product.name,
                  price: parseFloat(product.retail_price),
                  discount: product.discount_information?.value ? parseFloat(product.discount_information.value) : 0,
                  rating: product.ratings || 0,
                  image: product.primary_media_url || woodlikefour
                }}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Reccomended