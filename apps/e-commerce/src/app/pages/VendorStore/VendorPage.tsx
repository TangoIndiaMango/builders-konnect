import VendorHeader from "./Header";
import Product from "./Product";
import VendorSidebar from "./VendorSidebar";

const VendorShop = () => {
  return (
    <div className="min-h-screen pb-16 bg-white">
      <VendorHeader />
      <div className="flex ">
        <VendorSidebar />
        <main className="flex-1 mt-3 ">
          <Product/>
        </main>
      </div>
    </div>
  );
};

export default VendorShop;
