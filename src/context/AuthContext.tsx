import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userStorage } from '../services/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  biometricId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithBiometric: (biometricId: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('landai:auth');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('landai:auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('landai:auth');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get user from storage
    const storedUser = userStorage.getByEmail(email);
    
    if (storedUser && storedUser.password === password) {
      const user: User = {
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
        role: storedUser.role,
        avatar: storedUser.avatar,
        biometricId: storedUser.biometricId
      };
      setUser(user);
      return true;
    }
    return false;
  };

  const loginWithBiometric = async (biometricId: string): Promise<boolean> => {
    // Simulate biometric authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = userStorage.getAll();
    const storedUser = users.find(u => u.biometricId === biometricId);
    
    if (storedUser) {
      const user: User = {
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
        role: storedUser.role,
        avatar: storedUser.avatar,
        biometricId: storedUser.biometricId
      };
      setUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        loginWithBiometric,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
