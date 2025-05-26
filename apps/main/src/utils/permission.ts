import { IUserPermissions } from "../app/pages/home";

export function getPermission(permissions: IUserPermissions[], name: string) {
  const perm = permissions?.find((p) => p.name === name);
  return (perm?.access_type as 'none' | 'partial' | 'full') || 'none';
}