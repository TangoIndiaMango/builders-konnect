import { Route, Routes } from 'react-router-dom';
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

      {/* Main Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About/>} />
        <Route path="sell" element={<Sell/>} />
        <Route path="advertise" element={<Advertise/>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
