import { Route, Routes } from 'react-router-dom';
import RegisterVendor from './pages/auth/register-vendor';
import AuthOutlet from './pages/auth/auth-outlets';
import Login from './pages/auth/login';
import ForgotPassword from './pages/auth/forgot-password';
import CreateVendorAccount from './pages/auth/create-vendor-account';

const App = () => {

return (
  <Routes>

    <Route path="auth" element={<AuthOutlet />}>
      <Route path="" element={<RegisterVendor />} />
      <Route path="create-vendor" element={<CreateVendorAccount />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Route>
  </Routes>
)
}

export default App;
