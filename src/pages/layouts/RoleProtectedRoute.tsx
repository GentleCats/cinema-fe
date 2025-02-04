import { useAuth } from "@/hooks/AuthContext";
import { ReactNode } from "react";
import { Navigate } from 'react-router-dom';

// type RoleProtectedRouteProps = {
//   children: JSX.Element;
//   allowedRoles: string[]; 
// };

const RoleProtectedRoute = ({ children }: {children: ReactNode}) => {
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes('Admin'); 
  console.log(isAdmin,user,"protectedroute",!user?.roles?.includes('Admin'));
  return isAdmin ? children : <Navigate to="/login" />;
};

export default RoleProtectedRoute;
