import { StorageConfig, StorageType, StorageProvider, UploadOptions, UploadResult, StorageError } from './types';
import { localStorageProvider } from './providers/local';
import { ipfsStorageProvider } from './providers/ipfs';

class StorageClient {
  private config: StorageConfig;
  private providers: Map<StorageType, StorageProvider>;

  constructor(config: StorageConfig = {}) {
    this.config = config;
    this.providers = new Map();

    // Initialize providers
    this.providers.set('local', localStorageProvider);
    this.providers.set('ipfs', ipfsStorageProvider);
  }

  public getProvider(type: StorageType): StorageProvider {
    const provider = this.providers.get(type);
    if (!provider) {
      throw this.createError('INVALID_PROVIDER', `Provider ${type} not found`);
    }
    return provider;
  }

  public async store<T>(
    key: string,
    data: T,
    type: StorageType = 'local'
  ): Promise<void> {
    try {
      const provider = this.getProvider(type);

      if (type === 'local' && provider.set) {
        await provider.set(key, data);
      } else if (provider.upload) {
        await provider.upload(data as unknown as string | Blob | File);
      } else {
        throw this.createError('OPERATION_NOT_SUPPORTED', 'Store operation not supported for this provider');
      }
    } catch (error) {
      const err = error as Error;
      throw this.createError('STORE_ERROR', err.message);
    }
  }

  public async retrieve<T>(
    key: string,
    type: StorageType = 'local'
  ): Promise<T | null> {
    try {
      const provider = this.getProvider(type);

      if (type === 'local' && provider.get) {
        return await provider.get<T>(key);
      } else if (provider.download) {
        const data = await provider.download(key);
        return data as unknown as T;
      }
      throw this.createError('OPERATION_NOT_SUPPORTED', 'Retrieve operation not supported for this provider');
    } catch (error) {
      const err = error as Error;
      throw this.createError('RETRIEVE_ERROR', err.message);
    }
  }

  public async upload(
    data: string | Blob | File,
    options: UploadOptions = {},
    type: StorageType = 'ipfs'
  ): Promise<UploadResult> {
    try {
      const provider = this.getProvider(type);
      if (!provider.upload) {
        throw this.createError('OPERATION_NOT_SUPPORTED', 'Upload operation not supported for this provider');
      }
      return await provider.upload(data, {
        ...options,
        encryption: options.encryption ?? this.config.encryption,
      });
    } catch (error) {
      const err = error as Error;
      throw this.createError('UPLOAD_ERROR', err.message);
    }
  }

  public async download(
    hash: string,
    type: StorageType = 'ipfs'
  ): Promise<Blob> {
    try {
      const provider = this.getProvider(type);
      if (!provider.download) {
        throw this.createError('OPERATION_NOT_SUPPORTED', 'Download operation not supported for this provider');
      }
      return await provider.download(hash);
    } catch (error) {
      const err = error as Error;
      throw this.createError('DOWNLOAD_ERROR', err.message);
    }
  }

  public async remove(
    key: string,
    type: StorageType = 'local'
  ): Promise<void> {
    try {
      const provider = this.getProvider(type);
      if (type === 'local' && provider.remove) {
        await provider.remove(key);
      } else {
        throw this.createError('OPERATION_NOT_SUPPORTED', 'Remove operation not supported for this provider');
      }
    } catch (error) {
      const err = error as Error;
      throw this.createError('REMOVE_ERROR', err.message);
    }
  }

  public async clear(type: StorageType = 'local'): Promise<void> {
    try {
      const provider = this.getProvider(type);
      if (type === 'local' && provider.clear) {
        await provider.clear();
      } else {
        throw this.createError('OPERATION_NOT_SUPPORTED', 'Clear operation not supported for this provider');
      }
    } catch (error) {
      const err = error as Error;
      throw this.createError('CLEAR_ERROR', err.message);
    }
  }

  private createError(code: string, message: string): StorageError {
    return {
      code,
      message,
    };
  }
}

export const storageClient = new StorageClient(); 