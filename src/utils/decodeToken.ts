import { jwtDecode } from 'jwt-decode';

export const decodeRole = (token: string) => {
  const decoded = jwtDecode(token);

  const rolesKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  let roles = null;
  if (rolesKey in decoded) {
    roles = decoded[rolesKey] as string[];
  }
  return roles;
};
