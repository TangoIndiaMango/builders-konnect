import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './layouts/Applayout';

import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ForgotPassword from './pages/auth/forgot-password';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import NewPassword from './pages/auth/new-password';
import About from './pages/About';
import Sell from './pages/sell';
import Advertise from './pages/advertise';
import VerifyEmail from './pages/auth/verify-email';
import CheckYourMail from './pages/auth/check-your-mail';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Orders from './pages/Profile/Orders';
import Addresses from './pages/Profile/Addresses';
import PaymentMethods from './pages/Profile/PaymentMethods';
import AccountDetails from './pages/Profile/AccountDetails';
import ContactPage from './pages/Contact';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccess from './pages/PaymentSuccessfulPage';
import EmptyCart from './pages/EmptyCartPage';
import CartSummary from './pages/CartSummaryPage';
import CartPage from './pages/Cart';
import { CheckoutProvider } from '../hooks/useContext';
import VendorShop from './pages/VendorStore/VendorPage';
import ReviewSection from './pages/ReviewSection';
import BillingAddressEditPage from './pages/Profile/BillingAddressEditPage';
import ShippingAddressEditPage from './pages/Profile/ShippingAddressEditPage';
import SubcategoryList from './pages/SubcategoryList';
import ProductList from './pages/ProductList';

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<AppLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="new-password" element={<NewPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="check-your-mail" element={<CheckYourMail />} />
      </Route>

      {/* Main Site Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route
          path="checkout"
          element={
            <CheckoutProvider>
              <CheckoutPage />
            </CheckoutProvider>
          }
        />
        <Route path="carts" element={<EmptyCart />} />
        <Route path="order-summary" element={<CartSummary />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sell" element={<Sell />} />
        <Route path="advertise" element={<Advertise />} />
        <Route path="/category/:category" element={<SubcategoryList />} />
        <Route
          path="/category/:category/subcategory/:subcategory"
          element={<ProductList />}
        />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/vendor-store/:id" element={<VendorShop />} />
        <Route path="/review/:id" element={<ReviewSection />} />

        {/* Profile Routes */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Navigate to="/profile/orders" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="payment" element={<PaymentMethods />} />
          <Route path="account" element={<AccountDetails />} />
        </Route>
        <Route path="/edit/billing/:id?" element={<BillingAddressEditPage />} />
        <Route path="/edit/shipping/:id?" element={<ShippingAddressEditPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
