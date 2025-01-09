import { ApiRequestConfig, ApiResponse, HttpMethod } from './types';

class ApiClient {
  private config: ApiRequestConfig;

  constructor(config: ApiRequestConfig = {}) {
    this.config = {
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    };
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config: Partial<ApiRequestConfig> = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const headers = { ...this.config.headers, ...config.headers };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(config.timeout || this.config.timeout || 10000),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw {
          code: response.status.toString(),
          message: responseData.message || 'An error occurred',
          details: responseData.details,
        };
      }

      return { data: responseData };
    } catch (error: any) {
      return {
        error: {
          code: error.code || 'UNKNOWN_ERROR',
          message: error.message || 'An unknown error occurred',
          details: error.details,
        },
      };
    }
  }

  public async get<T>(endpoint: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  public async post<T>(endpoint: string, data?: any, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  public async put<T>(endpoint: string, data?: any, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  public async delete<T>(endpoint: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }

  public async patch<T>(endpoint: string, data?: any, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, config);
  }

  public setHeader(key: string, value: string): void {
    this.config.headers = {
      ...this.config.headers,
      [key]: value,
    };
  }

  public removeHeader(key: string): void {
    if (this.config.headers) {
      delete this.config.headers[key];
    }
  }
}

export const api = new ApiClient(); 