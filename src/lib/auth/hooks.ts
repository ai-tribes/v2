import { useCallback } from 'react';
import { useAuth } from './context';
import { LoginCredentials, RegisterCredentials } from './types';

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthError extends Error {
  message: string;
}

export function useLogin() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResult> => {
      try {
        await login(credentials);
        return { success: true };
      } catch (error) {
        const authError = error as AuthError;
        return {
          success: false,
          error: authError.message || 'Failed to login',
        };
      }
    },
    [login]
  );

  return {
    login: handleLogin,
    isLoading,
    error,
  };
}

export function useRegister() {
  const { register, isLoading, error } = useAuth();

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials): Promise<AuthResult> => {
      try {
        await register(credentials);
        return { success: true };
      } catch (error) {
        const authError = error as AuthError;
        return {
          success: false,
          error: authError.message || 'Failed to register',
        };
      }
    },
    [register]
  );

  return {
    register: handleRegister,
    isLoading,
    error,
  };
}

export function useLogout() {
  const { logout, isLoading, error } = useAuth();

  const handleLogout = useCallback(async (): Promise<AuthResult> => {
    try {
      await logout();
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError.message || 'Failed to logout',
      };
    }
  }, [logout]);

  return {
    logout: handleLogout,
    isLoading,
    error,
  };
}

export function useUser() {
  const { user, isLoading, error, refreshUser } = useAuth();

  const handleRefresh = useCallback(async (): Promise<AuthResult> => {
    try {
      await refreshUser();
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError.message || 'Failed to refresh user',
      };
    }
  }, [refreshUser]);

  return {
    user,
    isLoading,
    error,
    refresh: handleRefresh,
  };
} 