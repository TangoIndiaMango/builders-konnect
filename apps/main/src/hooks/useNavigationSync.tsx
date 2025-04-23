import { useNavigate } from 'react-router-dom';

import { NavigationType } from '../app/store/navigation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { currentNavigationAtom } from '../app/store/navigation';

export const useNavigationSync = () => {
  const [navigation, setNavigation] = useAtom(currentNavigationAtom);
  const navigate = useNavigate();
  const location = useLocation();

  // Update URL when navigation changes
  useEffect(() => {
    if (location.pathname !== `/${navigation}`) {
      navigate(`/${navigation}`);
    }
  }, [navigation, navigate]);

  // Update navigation when URL changes
  useEffect(() => {
    const path = location.pathname.slice(1) as NavigationType;
    if (path && ['pos', 'accounting', 'procurement'].includes(path)) {
      setNavigation(path);
    }
  }, [location.pathname, setNavigation]);

  return navigation;
};
