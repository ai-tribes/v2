import { ApiError, ApiRequestConfig, ApiResponse, HttpMethod } from './types';

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

  private async request<T, D = unknown>(
    method: HttpMethod,
    endpoint: string,
    data?: D,
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
        } as ApiError;
      }

      return { data: responseData };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        error: {
          code: apiError.code || 'UNKNOWN_ERROR',
          message: apiError.message || 'An unknown error occurred',
          details: apiError.details,
        },
      };
    }
  }

  public async get<T>(endpoint: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  public async post<T, D = unknown>(endpoint: string, data?: D, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T, D>('POST', endpoint, data, config);
  }

  public async put<T, D = unknown>(endpoint: string, data?: D, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T, D>('PUT', endpoint, data, config);
  }

  public async delete<T>(endpoint: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }

  public async patch<T, D = unknown>(endpoint: string, data?: D, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T, D>('PATCH', endpoint, data, config);
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