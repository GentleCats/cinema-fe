import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/AuthContext';

const RoleProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }
  const isAdmin = user?.roles?.includes('Admin');
  return isAdmin ? children : <Navigate to="/login" />;
};

export default RoleProtectedRoute;
