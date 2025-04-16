import { useParams } from "react-router-dom";
import CustomerReviews from "../components/ProductDetails/CustomerReview";
import CustomerReviewCard from "../components/ProductDetails/CustomerReviewCard";
import Hero from "../components/ProductDetails/Hero"
import SimilarProductDetails from "../components/ProductDetails/ProductDetails";
import ProductDetailsCard from "../components/ProductDetails/ProductDetailsCard"
import ProductCard from "../components/ProductDetails/SimilarProducts"


function ProductDetails() {
  const { id } = useParams();
  return (
    <div>
      <Hero />
      <ProductDetailsCard />
      <ProductCard />
      <SimilarProductDetails />
      <CustomerReviews />
      <CustomerReviewCard/>
    </div>
  );
}

export default ProductDetails