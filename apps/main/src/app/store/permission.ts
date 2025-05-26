import { IUserPermissions } from "../pages/home";

import { atom, useAtom } from "jotai";

interface IPermissionState {
  permissions: IUserPermissions[];
}

const initialState: IPermissionState = {
  permissions: [],
};

export const permissionAtom = atom<IPermissionState>(initialState);

export const usePermission = () => {
  const [permission, setPermission] = useAtom(permissionAtom);

  return { permission, setPermission };
};