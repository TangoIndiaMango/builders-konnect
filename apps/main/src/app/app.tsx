import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './hoc/ProtectedRoute';
import AuthOutlet from './pages/auth/auth-outlets';
import ChangePassword from './pages/auth/change-password';
import CreatePassword from './pages/auth/create-vendor-account';
import ForgotPassword from './pages/auth/forgot-password';
import Login from './pages/auth/login';
import MultipleAccounts from './pages/auth/multiple-accounts';
import RegisterVendor from './pages/auth/register-vendor';
import DiscountHome from './pages/discount';
import DiscountCreate from './pages/discount/create';
import DiscountOutlet from './pages/discount/outlet';
import DashboardHome from './pages/home';
import VendorHomeOutlet from './pages/home/dashboard-outlet';
import EditProduct from './pages/inventory/EditProduct';
import NotFound from './pages/NotFound';
import VendorProfile from './pages/profile';
import VendorProfileOutlet from './pages/profile/profile-outlet';
import SingleStoreDetails from './pages/profile/views/single-store';
import SalesHome from './pages/sales';
<<<<<<< HEAD
import CreateSales from './pages/sales/create';
import SalesViewPage from './pages/sales/view';
import PauseSales from './pages/sales/pause-sales';
=======
>>>>>>> fd195cb7fbe7fec01ddeea7830ce0d37dab90252
import SalesAnalytics from './pages/sales/analytics';
import CreateSales from './pages/sales/create';
import SalesOutlet from './pages/sales/outlet';
import PauseSales from './pages/sales/pause-sales';
import SalesViewPage from './pages/sales/view';
import StaffHome from './pages/staff';
import AddRole from './pages/staff/add-role';
import InventoryOutlet from './pages/inventory/inventory-outlet';
import ProductsPage from './pages/inventory';
import Inventory from './pages/inventory/inventories';
import EditInventoryPage from './pages/inventory/editInventorybySearch';
import EditInventoryById from './pages/inventory/editInventory';
import TriggerReorder from './pages/inventory/triggerReorder';
import CreateProductBySearch from './pages/inventory/createProductBySearch';
import CreateProduct from './pages/inventory/createProduct';
import PreviewPage from './pages/inventory/imagePreview';
import ProductPreview from './pages/inventory/previewProduct';
import ScanProductPage from './pages/inventory/barcodeProductAdd';
import AddBulkProductPage from './pages/inventory/addBulkProduct';
<<<<<<< HEAD
import ProductPreview from './pages/inventory/previewProduct';
import EditProduct from './pages/inventory/EditProduct';
import SettingOutlet from './pages/settings/setting-outlet';
import SettingPage from './pages/settings';
=======
import AddStaffPassword from './pages/auth/add-staff-password';
import CustomersList from './pages/customers/customers-list';
import CustomersOutlet from './pages/customers/customer-outlet';
import ReviewFeedbackList from './pages/customers/reviewAndFeedback/review-feedback-list';
import ViewReview from './components/customers/VeiwReview';
import StaffOutlet from './pages/staff/outlet';
import ViewStaffDetails from './pages/staff/view-staff';
import ReturnsOutlet from './pages/returns/outlet';
import ReturnsPage from './pages/returns';
import ReturnsViewPage from './pages/returns/view';
>>>>>>> fd195cb7fbe7fec01ddeea7830ce0d37dab90252

const App = () => {
  return (
    <>
    <Routes>
      <Route path="auth" element={<AuthOutlet />}>
        <Route path="register-vendor" element={<RegisterVendor />} />
        <Route path="create-password" element={<CreatePassword />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="multiple-accounts" element={<MultipleAccounts />} />
        <Route path="add-staff-password" element={<AddStaffPassword />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <VendorHomeOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        
      </Route>

      <Route
        path="pos/profile"
        element={
          <ProtectedRoute>
            <VendorProfileOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<VendorProfile />} />
        <Route path="store/:id" element={<SingleStoreDetails />} />
      </Route>

      <Route
        path="pos/sales"
        element={
          <ProtectedRoute>
            <SalesOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<SalesHome /> } />
        <Route path="create" element={<CreateSales />} />
        <Route path="view/:id" element={<SalesViewPage />} />
        <Route path="pause" element={<PauseSales />} />
        <Route path="analytics" element={<SalesAnalytics />} />
      </Route>

      <Route
        path="pos/staff"
        element={
          <ProtectedRoute>
            <StaffOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<StaffHome />} />
        <Route path="view/:id" element={<ViewStaffDetails />} />
        <Route path="add-role" element={<AddRole />} />
        <Route path="role/:id" element={<AddRole />} />
      </Route>

      <Route
        path="pos/inventory"
        element={
          <ProtectedRoute>
            <InventoryOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProductsPage />} />
        <Route path="inventories" element={<Inventory />} />
        <Route path="edit" element={<EditInventoryPage />} />
        <Route path="edit/:id" element={<EditInventoryById />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="trigger-reorder" element={<TriggerReorder />} />
        <Route path="create-product-by-search" element={<CreateProductBySearch />} />
        <Route path="add-product" element={<CreateProduct />} />
        <Route path="preview-page" element={<PreviewPage />} />
        <Route path="product-preview" element={<ProductPreview />} />
        <Route path="scan-product" element={<ScanProductPage />} />
        <Route path="add-bulk-product" element={<AddBulkProductPage />} />
      </Route>

      <Route
<<<<<<< HEAD
        path="pos/settings"
        element={
          <ProtectedRoute>
            <SettingOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<SettingPage />} />
      </Route>
=======
        path="pos/customers"
        element={
          <ProtectedRoute>
            <CustomersOutlet />
          </ProtectedRoute>
        }
      >
        <Route path="list" element={<CustomersList />} />
        <Route path="reviews-and-feedback" element={<ReviewFeedbackList />} />
        <Route path="product-review/view/:id" element={<ViewReview />} />
      </Route>
  

      <Route
        path="pos/discounts"
        element={
          <ProtectedRoute>
            <DiscountOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<DiscountHome />} />
        <Route path="create" element={<DiscountCreate />} />
        <Route path="edit/:id" element={<DiscountCreate />} />
      </Route>

      <Route
        path="pos/returns"
        element={
          <ProtectedRoute>
            <ReturnsOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<ReturnsPage />} />
        <Route path="view/:id" element={<ReturnsViewPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
>>>>>>> fd195cb7fbe7fec01ddeea7830ce0d37dab90252
    </Routes>
    </>
  );
};

export default App;
