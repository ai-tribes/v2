import { useState, useCallback } from 'react';
import { StorageType, UploadOptions, UploadResult } from './types';
import { storageClient } from './client';

interface UseStorageState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useStorage<T = any>(
  key: string,
  type: StorageType = 'local'
) {
  const [state, setState] = useState<UseStorageState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const store = useCallback(
    async (data: T) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        await storageClient.store(key, data, type);
        setState({
          data,
          isLoading: false,
          error: null,
        });
        return { success: true };
      } catch (error: any) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        return {
          success: false,
          error: error.message,
        };
      }
    },
    [key, type]
  );

  const retrieve = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await storageClient.retrieve<T>(key, type);
      setState({
        data,
        isLoading: false,
        error: null,
      });
      return { success: true, data };
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
      return {
        success: false,
        error: error.message,
      };
    }
  }, [key, type]);

  const remove = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await storageClient.remove(key, type);
      setState({
        data: null,
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
      return {
        success: false,
        error: error.message,
      };
    }
  }, [key, type]);

  return {
    ...state,
    store,
    retrieve,
    remove,
  };
}

export function useUpload(type: StorageType = 'ipfs') {
  const [state, setState] = useState<{
    isLoading: boolean;
    error: string | null;
    result: UploadResult | null;
  }>({
    isLoading: false,
    error: null,
    result: null,
  });

  const upload = useCallback(
    async (data: string | Blob | File, options: UploadOptions = {}) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await storageClient.upload(data, options, type);
        setState({
          isLoading: false,
          error: null,
          result,
        });
        return { success: true, result };
      } catch (error: any) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        return {
          success: false,
          error: error.message,
        };
      }
    },
    [type]
  );

  const download = useCallback(
    async (hash: string) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const data = await storageClient.download(hash, type);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: null,
        }));
        return { success: true, data };
      } catch (error: any) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        return {
          success: false,
          error: error.message,
        };
      }
    },
    [type]
  );

  return {
    ...state,
    upload,
    download,
  };
} 