import { StorageConfig, StorageType, StorageProvider, UploadOptions, UploadResult, StorageError } from './types';
import { localStorageProvider } from './providers/local';
import { ipfsStorageProvider } from './providers/ipfs';

class StorageClient {
  private config: StorageConfig;
  private providers: Map<StorageType, any>;

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

  public async store(
    key: string,
    data: any,
    type: StorageType = 'local'
  ): Promise<void> {
    try {
      const provider = this.getProvider(type);

      if (type === 'local') {
        await provider.set(key, data);
      } else {
        await provider.upload(data);
      }
    } catch (error: any) {
      throw this.createError('STORE_ERROR', error.message);
    }
  }

  public async retrieve<T = any>(
    key: string,
    type: StorageType = 'local'
  ): Promise<T | null> {
    try {
      const provider = this.getProvider(type);

      if (type === 'local') {
        return await provider.get<T>(key);
      } else {
        const data = await provider.download(key);
        return data as T;
      }
    } catch (error: any) {
      throw this.createError('RETRIEVE_ERROR', error.message);
    }
  }

  public async upload(
    data: string | Blob | File,
    options: UploadOptions = {},
    type: StorageType = 'ipfs'
  ): Promise<UploadResult> {
    try {
      const provider = this.getProvider(type);
      return await provider.upload(data, {
        ...options,
        encryption: options.encryption ?? this.config.encryption,
      });
    } catch (error: any) {
      throw this.createError('UPLOAD_ERROR', error.message);
    }
  }

  public async download(
    hash: string,
    type: StorageType = 'ipfs'
  ): Promise<Blob> {
    try {
      const provider = this.getProvider(type);
      return await provider.download(hash);
    } catch (error: any) {
      throw this.createError('DOWNLOAD_ERROR', error.message);
    }
  }

  public async remove(
    key: string,
    type: StorageType = 'local'
  ): Promise<void> {
    try {
      const provider = this.getProvider(type);
      if (type === 'local') {
        await provider.remove(key);
      } else {
        throw this.createError('OPERATION_NOT_SUPPORTED', 'Remove operation not supported for this provider');
      }
    } catch (error: any) {
      throw this.createError('REMOVE_ERROR', error.message);
    }
  }

  public async clear(type: StorageType = 'local'): Promise<void> {
    try {
      const provider = this.getProvider(type);
      if (type === 'local') {
        await provider.clear();
      } else {
        throw this.createError('OPERATION_NOT_SUPPORTED', 'Clear operation not supported for this provider');
      }
    } catch (error: any) {
      throw this.createError('CLEAR_ERROR', error.message);
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