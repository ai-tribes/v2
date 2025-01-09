import { useState, useCallback } from 'react';
import { ApiResponse, ApiError } from './types';
import { api } from './client';

interface UseApiState<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

interface UseApiResponse<T, Args extends unknown[] = unknown[]> extends UseApiState<T> {
  execute: (...args: Args) => Promise<void>;
  reset: () => void;
}

export function useApi<T, Args extends unknown[] = unknown[]>(
  apiFunction: (...args: Args) => Promise<ApiResponse<T>>,
  options: { 
    immediate?: boolean; 
    onSuccess?: (data: T) => void; 
    onError?: (error: ApiError) => void 
  } = {}
): UseApiResponse<T, Args> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const response = await apiFunction(...args);

        if (response.error) {
          setState({ data: null, error: response.error, isLoading: false });
          options.onError?.(response.error);
        } else if (response.data) {
          setState({ data: response.data, error: null, isLoading: false });
          options.onSuccess?.(response.data);
        }
      } catch (error) {
        const apiError: ApiError = {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'An unknown error occurred',
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

export function useQuery<T>(
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

  return useApi<T, []>(apiCall, options);
}

export function useMutation<T, D = unknown>(
  method: 'post' | 'put' | 'patch' | 'delete',
  endpoint: string,
  options: {
    config?: Parameters<typeof api.post>[2];
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
  } = {}
) {
  const apiCall = useCallback(
    (data?: D) => {
      if (method === 'delete') {
        return api.delete<T>(endpoint, options.config);
      }
      return api[method]<T, D>(endpoint, data, options.config);
    },
    [method, endpoint, options.config]
  );

  return useApi<T, [D?]>(apiCall, options);
} 