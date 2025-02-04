import { useAuth } from '@/hooks/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: {children: ReactNode}) => {
  const { user } = useAuth();
  console.log(user,"user")
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
