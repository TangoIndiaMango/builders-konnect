import { useParams } from "react-router-dom";
import CustomerReviews from "../components/ProductDetails/CustomerReview";
import CustomerReviewCard from "../components/ProductDetails/CustomerReviewCard";
import Hero from "../components/ProductDetails/Hero"
import SimilarProductDetails from "../components/ProductDetails/ProductDetails";
import ProductDetailsCard from "../components/ProductDetails/ProductDetailsCard"
import ProductCard from "../components/ProductDetails/SimilarProducts"
import { productCards } from "../lib/Constants";


function ProductDetails() {
const { id } = useParams();
  const product = productCards.find((p) => p.id.toString() === id); // convert to string to match param

  if (!product) {
    return <div className="p-8 text-red-500">Product not found</div>;
  }
  return (
    <div>
      <Hero title="Product Details"/>
      <ProductDetailsCard  />
      <ProductCard />
      <SimilarProductDetails />
      <CustomerReviews />
      <CustomerReviewCard/>
    </div>
  );
}

export default ProductDetails