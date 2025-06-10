
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Owner account data
const OWNER_DATA = {
  id: 'owner-default-id',
  email: 'Owner@Kali.com',
  name: 'Owner@Kali',
  role: 'owner' as const,
  isVerified: true,
  subscriptionLevel: null,
  subscriptionExpiry: null,
  createdAt: new Date().toISOString(),
  permissions: []
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserFromSupabase(session.user.id, session.user.email || '');
      }
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserFromSupabase(session.user.id, session.user.email || '');
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUserFromSupabase = async (userId: string, email: string) => {
    try {
      // Get user profile from database
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Get user role
      const { data: userRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (profile) {
        // Map database roles to our type system
        const mapRole = (dbRole: string): User['role'] => {
          switch (dbRole) {
            case 'owner': return 'owner';
            case 'superadmin': return 'superadmin';
            case 'admin': return 'admin';
            case 'support': return 'support';
            default: return 'user';
          }
        };

        setUser({
          id: userId,
          email: email,
          name: profile.full_name || 'المستخدم',
          role: mapRole(userRole?.role || 'user'),
          isVerified: true,
          subscriptionLevel: null,
          subscriptionExpiry: null,
          createdAt: new Date().toISOString(),
          permissions: []
        });
      }
    } catch (error) {
      console.error('Error loading user from Supabase:', error);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; user?: User }> => {
    setIsLoading(true);
    
    // Check for owner credentials
    if (email === 'Owner@Kali.com' && password === 'Owner@Kali') {
      setUser(OWNER_DATA);
      setIsLoading(false);
      return { success: true, user: OWNER_DATA };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        await loadUserFromSupabase(data.user.id, data.user.email || '');
        setIsLoading(false);
        return { success: true, user: user };
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    
    setIsLoading(false);
    return { success: false };
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      if (error) throw error;

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    if (user?.email === 'Owner@Kali.com') {
      // For owner, just clear local state
      setUser(null);
    } else {
      // For Supabase users, sign out from Supabase
      await supabase.auth.signOut();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
