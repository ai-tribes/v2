import { useCallback } from 'react';
import { useAuth } from './context';
import { LoginCredentials, RegisterCredentials } from './types';

export function useLogin() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        await login(credentials);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Failed to login',
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
    async (credentials: RegisterCredentials) => {
      try {
        await register(credentials);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Failed to register',
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

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to logout',
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

  const handleRefresh = useCallback(async () => {
    try {
      await refreshUser();
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to refresh user',
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