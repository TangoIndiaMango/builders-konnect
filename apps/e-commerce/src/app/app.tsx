import { Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/Applayout';

import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ForgotPassword from './pages/auth/forgot-password';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="customer/auth" element={<AppLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Main Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default App;
