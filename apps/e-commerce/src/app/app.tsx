import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/Applayout';

import { CheckoutProvider } from '../hooks/useContext';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import Advertise from './pages/advertise';
import CheckYourMail from './pages/auth/check-your-mail';
import ForgotPassword from './pages/auth/forgot-password';
import Login from './pages/auth/login';
import NewPassword from './pages/auth/new-password';
import Register from './pages/auth/register';
import VerifyEmail from './pages/auth/verify-email';
import CartPage from './pages/Cart';
import CartSummary from './pages/CartSummaryPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/Contact';
import EmptyCart from './pages/EmptyCartPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import OrderSuccess from './pages/PaymentSuccessfulPage';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import Profile from './pages/Profile';
import AccountDetails from './pages/Profile/AccountDetails';
import Addresses from './pages/Profile/Addresses';
import BillingAddressEditPage from './pages/Profile/BillingAddressEditPage';
import Orders from './pages/Profile/Orders';
import PaymentMethods from './pages/Profile/PaymentMethods';
import ShippingAddressEditPage from './pages/Profile/ShippingAddressEditPage';
import ReviewSection from './pages/ReviewSection';
import Sell from './pages/sell';
import SubcategoryList from './pages/SubcategoryList';
import VendorShop from './pages/VendorStore/VendorPage';
import ProtectedRoute from './components/ProtectedRoute';
import DealsPage from './pages/DealsPage';
import SubscriptionCheckout from './components/onboarding/onboarding';

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
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sell" element={<Sell />} />
        <Route path="subscribe/checkout" element={<SubscriptionCheckout />} />
        <Route path="advertise" element={<Advertise />} />
        <Route path="/category/:category" element={<SubcategoryList />} />
        <Route
          path="/category/:category/subcategory/:subcategory"
          element={<ProductList />}
        />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/customer-support" element={<ContactPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/vendor-store/:id" element={<VendorShop />} />
        <Route path="/review/:id" element={<ReviewSection />} />
        <Route path="carts" element={<EmptyCart />} />
        <Route path="order-summary" element={<CartSummary />} />

        {/* Protected Routes - Require Authentication */}
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckoutProvider>
                <CheckoutPage />
              </CheckoutProvider>
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
        
        {/* Protected Profile Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/profile/orders" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="payment" element={<PaymentMethods />} />
          <Route path="account" element={<AccountDetails />} />
        </Route>
        <Route
          path="/edit/billing/:id?"
          element={<ProtectedRoute><BillingAddressEditPage /></ProtectedRoute>}
        />
        <Route
          path="/edit/shipping/:id?"
          element={<ProtectedRoute><ShippingAddressEditPage /></ProtectedRoute>}
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
