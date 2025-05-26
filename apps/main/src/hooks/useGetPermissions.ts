import { IUserPermissions } from '@/app/pages/home';
import { useEffect } from 'react';
import { usePermission } from '../app/store/permission';
import { useFetchData } from './useApis';

const useGetPermissions = () => {
  //User permissions
  const { setPermission } = usePermission();
  const userPermissions = useFetchData('merchants/access/user/module-permissions');
  const userPermissionsData = userPermissions?.data?.data as IUserPermissions[];
  // console.log(userPermissionsData, 'userPermissions');

  useEffect(() => {
    setPermission({ permissions: userPermissionsData || [] });
  }, [userPermissionsData]);

  return userPermissionsData;
};

export default useGetPermissions
