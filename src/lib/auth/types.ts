export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'user' | 'admin' | 'moderator';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthError {
  code: string;
  message: string;
}

export const AUTH_TYPES = {
  EMAIL: 'email',
  GOOGLE: 'google',
  GITHUB: 'github',
  WALLET: 'wallet',
} as const;

export type AuthType = typeof AUTH_TYPES[keyof typeof AUTH_TYPES]; 