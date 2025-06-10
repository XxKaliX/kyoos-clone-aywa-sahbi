
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
  email: 'Owner@Kali',
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
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserFromSupabase(session.user.id, session.user.email || '');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
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
      console.log('Loading user from Supabase:', userId, email);
      
      // Get user profile from database
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        return;
      }

      // Get user role
      const { data: userRole, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (roleError) {
        console.error('Role error:', roleError);
      }

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

        const userData = {
          id: userId,
          email: email,
          name: profile.full_name || 'المستخدم',
          role: mapRole(userRole?.role || 'user'),
          isVerified: true,
          subscriptionLevel: null,
          subscriptionExpiry: null,
          createdAt: profile.created_at || new Date().toISOString(),
          permissions: []
        };

        console.log('Setting user data:', userData);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user from Supabase:', error);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; user?: User }> => {
    console.log('Login attempt:', email);
    setIsLoading(true);
    
    // Check for owner credentials
    if (email === 'Owner@Kali' && password === 'OwnerKali123') {
      console.log('Owner login successful');
      setUser(OWNER_DATA);
      setIsLoading(false);
      return { success: true, user: OWNER_DATA };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Supabase login error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Supabase login successful:', data.user.id);
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

      console.log('Registration successful:', data);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    if (user?.email === 'Owner@Kali') {
      // For owner, just clear local state
      console.log('Owner logout');
      setUser(null);
    } else {
      // For Supabase users, sign out from Supabase
      console.log('Supabase logout');
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
