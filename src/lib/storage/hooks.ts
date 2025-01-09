import { useState, useCallback } from 'react';
import { StorageType, UploadOptions, UploadResult, StorageError } from './types';
import { storageClient } from './client';

interface UseStorageState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface StorageResult {
  success: boolean;
  error?: string;
}

interface StorageRetrieveResult<T> extends StorageResult {
  data?: T | null;
}

interface UploadStorageResult extends StorageResult {
  result?: UploadResult;
}

interface DownloadStorageResult extends StorageResult {
  data?: Blob;
}

export function useStorage<T>(
  key: string,
  type: StorageType = 'local'
) {
  const [state, setState] = useState<UseStorageState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const store = useCallback(
    async (data: T): Promise<StorageResult> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        await storageClient.store(key, data, type);
        setState({
          data,
          isLoading: false,
          error: null,
        });
        return { success: true };
      } catch (error) {
        const err = error as StorageError;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err.message,
        }));
        return {
          success: false,
          error: err.message,
        };
      }
    },
    [key, type]
  );

  const retrieve = useCallback(async (): Promise<StorageRetrieveResult<T>> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await storageClient.retrieve<T>(key, type);
      setState({
        data,
        isLoading: false,
        error: null,
      });
      return { success: true, data };
    } catch (error) {
      const err = error as StorageError;
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message,
      }));
      return {
        success: false,
        error: err.message,
      };
    }
  }, [key, type]);

  const remove = useCallback(async (): Promise<StorageResult> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await storageClient.remove(key, type);
      setState({
        data: null,
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (error) {
      const err = error as StorageError;
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message,
      }));
      return {
        success: false,
        error: err.message,
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
    async (data: string | Blob | File, options: UploadOptions = {}): Promise<UploadStorageResult> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await storageClient.upload(data, options, type);
        setState({
          isLoading: false,
          error: null,
          result,
        });
        return { success: true, result };
      } catch (error) {
        const err = error as StorageError;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err.message,
        }));
        return {
          success: false,
          error: err.message,
        };
      }
    },
    [type]
  );

  const download = useCallback(
    async (hash: string): Promise<DownloadStorageResult> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const data = await storageClient.download(hash, type);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: null,
        }));
        return { success: true, data };
      } catch (error) {
        const err = error as StorageError;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err.message,
        }));
        return {
          success: false,
          error: err.message,
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