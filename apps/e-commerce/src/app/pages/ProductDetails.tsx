import Hero from "../components/ProductDetails/Hero";
import MainProductDetails from "../components/ProductDetails/MainProductDetails";
import SimilarProductDetails from "../components/ProductDetails/ProductDetails";
import ProductCard from "../components/ProductDetails/SimilarProducts";
import CustomerReviews from "../components/ProductDetails/CustomerReview";
import CustomerReviewCard from "../components/ProductDetails/CustomerReviewCard";

function ProductDetails() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
      <Hero title="Product Details"/>
      <div className="mb-12">
        <MainProductDetails />
      </div>
      {/* <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
        <ProductCard />
      </div>
      <div className="mb-12">
        <SimilarProductDetails />
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
        <CustomerReviews />
        <CustomerReviewCard />
      </div> */}
    </div>
  );
}

export default ProductDetails