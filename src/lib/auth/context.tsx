'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials } from './types';
import { authClient } from './client';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthError extends Error {
  message: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authClient.isAuthenticated()) {
          const user = await authClient.getUser();
          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } else {
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } catch {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: 'Failed to initialize auth',
        });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authClient.login(credentials);
      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      const authError = error as AuthError;
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: authError.message || 'Failed to login',
      });
      throw authError;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authClient.register(credentials);
      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      const authError = error as AuthError;
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: authError.message || 'Failed to register',
      });
      throw authError;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await authClient.logout();
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      const authError = error as AuthError;
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: authError.message || 'Failed to logout',
      }));
      throw authError;
    }
  };

  const refreshUser = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authClient.getUser();
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      const authError = error as AuthError;
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: authError.message || 'Failed to refresh user',
      });
      throw authError;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 