import { useState, useCallback } from 'react';
import { ApiResponse, ApiError } from './types';
import { api } from './client';

interface UseApiState<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

interface UseApiResponse<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: { immediate?: boolean; onSuccess?: (data: T) => void; onError?: (error: ApiError) => void } = {}
): UseApiResponse<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const response = await apiFunction(...args);

        if (response.error) {
          setState({ data: null, error: response.error, isLoading: false });
          options.onError?.(response.error);
        } else {
          setState({ data: response.data!, error: null, isLoading: false });
          options.onSuccess?.(response.data!);
        }
      } catch (error: any) {
        const apiError: ApiError = {
          code: 'UNKNOWN_ERROR',
          message: error.message || 'An unknown error occurred',
        };
        setState({ data: null, error: apiError, isLoading: false });
        options.onError?.(apiError);
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

export function useQuery<T = any>(
  endpoint: string,
  options: {
    immediate?: boolean;
    config?: Parameters<typeof api.get>[1];
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
  } = {}
) {
  const apiCall = useCallback(
    () => api.get<T>(endpoint, options.config),
    [endpoint, options.config]
  );

  return useApi<T>(apiCall, options);
}

export function useMutation<T = any>(
  method: 'post' | 'put' | 'patch' | 'delete',
  endpoint: string,
  options: {
    config?: Parameters<typeof api.post>[2];
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
  } = {}
) {
  const apiCall = useCallback(
    (data?: any) => api[method]<T>(endpoint, data, options.config),
    [method, endpoint, options.config]
  );

  return useApi<T>(apiCall, options);
} 