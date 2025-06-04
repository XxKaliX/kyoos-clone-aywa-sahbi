
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );

    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete (userWithoutPassword as any).password;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: User) => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role: 'user' as const,
      isVerified: false,
      subscriptionLevel: null,
      createdAt: new Date().toISOString(),
      permissions: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Create superadmin if first user
    if (users.length === 1) {
      users[0].role = 'superadmin';
      users[0].isVerified = true;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
