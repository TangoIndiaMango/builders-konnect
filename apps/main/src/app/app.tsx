import { Route, Routes } from 'react-router-dom';
import RegisterVendor from './pages/auth/register-vendor';
import AuthOutlet from './pages/auth/auth-outlets';
import Login from './pages/auth/login';
import ForgotPassword from './pages/auth/forgot-password';
import CreatePassword from './pages/auth/create-vendor-account';
import ChangePassword from './pages/auth/change-password';
import MultipleAccounts from './pages/auth/multiple-accounts';
import DashboardHome from './pages/home';
import { ProtectedRoute } from './hoc/ProtectedRoute';
import NotFound from './pages/NotFound';
import VendorProfile from './pages/profile';
import VendorProfileOutlet from './pages/profile/profile-outlet';
import VendorHomeOutlet from './pages/home/dashboard-outlet';
import SalesOutlet from './pages/sales/outlet';
import SalesHome from './pages/sales';
import CreateSales from './pages/sales/create';
import { OrderView } from './components/sales/view/OrderView';
import SalesViewPage from './pages/sales/view';
import PauseSales from './pages/sales/pause-sales';
import SalesAnalytics from './pages/sales/analytics';
import InventoryOutlet from './pages/inventory/inventory-outlet';
import InventoryPage from './pages/inventory';
import ProductsPage from './pages/inventory';
import Inventories from './pages/inventory/inventories';
import Inventory from './pages/inventory/inventories';
import EditInventoryPage from './pages/inventory/editInventorybySearch';
import EditInventoryById from './pages/inventory/editInventory';
import TriggerReorder from './pages/inventory/triggerReorder';
import CreateProductBySearch from './pages/inventory/createProductBySearch';
import CreateProduct from './pages/inventory/createProduct';
import PreviewPage from './pages/inventory/imagePreview';
import ScanProductPage from './pages/inventory/barcodeProductAdd';
import AddBulkProductPage from './pages/inventory/addBulkProduct';
import ProductPreview from './pages/inventory/previewProduct';
import EditProduct from './pages/inventory/EditProduct';


const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthOutlet />}>
        <Route path="register-vendor" element={<RegisterVendor />} />

        <Route path="create-password" element={<CreatePassword />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="multiple-accounts" element={<MultipleAccounts />} />
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
      </Route>

      <Route
        path="pos/sales"
        element={
          <ProtectedRoute>
            <SalesOutlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<SalesHome />} />
        <Route path="create" element={<CreateSales />} />
        <Route path="view/:id" element={<SalesViewPage />} />
        <Route path="pause" element={<PauseSales />} />
        <Route path="analytics" element={<SalesAnalytics />} />
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
        <Route
          path="create-product-by-search"
          element={<CreateProductBySearch />}
        />
        <Route path="add-product" element={<CreateProduct />} />
        <Route path="preview-page" element={<PreviewPage />} />
        <Route path="product-preview" element={<ProductPreview/>} /> 
        <Route path="scan-product" element={<ScanProductPage />} />
        <Route path="add-bulk-product" element={<AddBulkProductPage/>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
