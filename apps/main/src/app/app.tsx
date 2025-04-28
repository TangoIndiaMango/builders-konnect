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
        path="pos/products-inventory"
        element={
        <ProtectedRoute>
          <InventoryOutlet />

          </ProtectedRoute>
        }
      >
        <Route index element={<ProductsPage />} />
        <Route path="inventories" element={<Inventories />} />
      </Route>




      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
