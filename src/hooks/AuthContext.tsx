import { ReactNode, createContext, useContext, useLayoutEffect, useState } from 'react';
import { decodeRole } from '@/utils/decodeToken';

type UserMetaData = {
  token: string;
  roles: string[] | null;
} | null;

type AuthContextType = {
  user: UserMetaData;
  setUser: (user: UserMetaData) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserMetaData | null>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const roles = decodeRole(token);
      setUser({ token, roles });
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
