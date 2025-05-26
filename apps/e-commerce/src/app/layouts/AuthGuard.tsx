import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { getAuthUser } from '../../utils/auth';
import { persistedCartAtom } from '../../store/cart';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getAuthUser();
  const [cart] = useAtom(persistedCartAtom);

  useEffect(() => {
    if (!user && cart.items.length > 0) {
      // Save the current path to redirect back after login
      localStorage.setItem('redirectPath', location.pathname);
      navigate('/auth/login', {
        state: {
          from: location.pathname,
          message: 'Please login to continue with your checkout'
        }
      });
    }
  }, [user, cart, navigate, location]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-4">Please Login to Continue</h2>
        <p className="text-gray-600 mb-4">
          You need to be logged in to proceed with checkout
        </p>
        <button
          onClick={() => navigate('/login', {
            state: {
              from: location.pathname,
              message: 'Please login to continue with your checkout'
            }
          })}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Login Now
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;