import { api } from '../api';
import { API_ENDPOINTS } from '../api/constants';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from './types';

class AuthClient {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor() {
    // Set up auth header if token exists
    const token = this.getToken();
    if (token) {
      api.setHeader('Authorization', `Bearer ${token}`);
    }
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    
    if (response.error) {
      throw response.error;
    }

    if (response.data) {
      this.setTokens(response.data.tokens);
      api.setHeader('Authorization', `Bearer ${response.data.tokens.accessToken}`);
    }

    return response.data;
  }

  public async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);
    
    if (response.error) {
      throw response.error;
    }

    if (response.data) {
      this.setTokens(response.data.tokens);
      api.setHeader('Authorization', `Bearer ${response.data.tokens.accessToken}`);
    }

    return response.data;
  }

  public async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      this.clearTokens();
      api.removeHeader('Authorization');
    }
  }

  public async getUser(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.AUTH.ME);
    
    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  public async refreshToken(): Promise<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );

    if (response.error) {
      throw response.error;
    }

    if (response.data) {
      this.setTokens(response.data.tokens);
      api.setHeader('Authorization', `Bearer ${response.data.tokens.accessToken}`);
    }

    return response.data;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setTokens(tokens: AuthResponse['tokens']): void {
    localStorage.setItem(this.tokenKey, tokens.accessToken);
    localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.refreshTokenKey);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}

export const authClient = new AuthClient(); 