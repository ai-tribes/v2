import { StorageConfig, StorageItem, StorageError, StorageMetadata, StorageProvider, StorageType } from '../types';
import { encryptionService } from '../encryption';

interface EncryptedValue {
  data: string;
  iv: string;
}

interface LocalStorageError extends Error {
  code?: string;
  name: string;
}

export class LocalStorageProvider implements StorageProvider {
  public readonly type: StorageType = 'local';
  public readonly name = 'Local Storage';
  public readonly description = 'Browser-based local storage provider';
  public readonly permanent = false;
  public readonly encryption: boolean;

  private config: StorageConfig;

  constructor(config: StorageConfig = {}) {
    this.config = {
      prefix: 'ai_tribes_',
      encryption: false,
      ...config,
    };
    this.encryption = this.config.encryption || false;

    if (this.config.encryption && this.config.encryptionKey) {
      encryptionService.initialize(this.config.encryptionKey);
    }
  }

  public async set<T>(key: string, value: T): Promise<void> {
    try {
      const item: StorageItem<T> = {
        key,
        value,
        timestamp: Date.now(),
        encrypted: false,
      };

      if (this.config.encryption) {
        const stringValue = JSON.stringify(value);
        const encrypted = await encryptionService.encrypt(stringValue);
        item.value = encrypted as unknown as T;
        item.encrypted = true;
      }

      const fullKey = this.getFullKey(key);
      localStorage.setItem(fullKey, JSON.stringify(item));
    } catch (error) {
      const err = error as LocalStorageError;
      throw this.createError('SET_ERROR', err.message || 'Failed to set item');
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const fullKey = this.getFullKey(key);
      const rawItem = localStorage.getItem(fullKey);

      if (!rawItem) {
        return null;
      }

      const item: StorageItem<T | EncryptedValue> = JSON.parse(rawItem);

      if (item.encrypted && this.config.encryption) {
        const encryptedValue = item.value as EncryptedValue;
        const decrypted = await encryptionService.decrypt({
          data: encryptedValue.data,
          iv: encryptedValue.iv,
        });
        return JSON.parse(decrypted) as T;
      }

      return item.value as T;
    } catch (error) {
      const err = error as LocalStorageError;
      throw this.createError('GET_ERROR', err.message || 'Failed to get item');
    }
  }

  public async remove(key: string): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      localStorage.removeItem(fullKey);
    } catch (error) {
      const err = error as LocalStorageError;
      throw this.createError('REMOVE_ERROR', err.message || 'Failed to remove item');
    }
  }

  public async clear(): Promise<void> {
    try {
      const keys = this.getAllKeys();
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      const err = error as LocalStorageError;
      throw this.createError('CLEAR_ERROR', err.message || 'Failed to clear storage');
    }
  }

  public async getMetadata(key: string): Promise<StorageMetadata> {
    try {
      const fullKey = this.getFullKey(key);
      const rawItem = localStorage.getItem(fullKey);

      if (!rawItem) {
        throw this.createError('NOT_FOUND', `Item with key ${key} not found`);
      }

      const item: StorageItem<unknown> = JSON.parse(rawItem);
      const size = new Blob([JSON.stringify(item.value)]).size;

      return {
        contentType: 'application/json',
        size,
        created: item.timestamp,
        modified: item.timestamp,
        encryption: item.encrypted ? {
          algorithm: 'AES-GCM',
          iv: (item.value as EncryptedValue).iv,
        } : undefined,
      };
    } catch (error) {
      const err = error as LocalStorageError;
      throw this.createError('METADATA_ERROR', err.message || 'Failed to get metadata');
    }
  }

  public async keys(): Promise<string[]> {
    return this.getAllKeys().map(key => this.removePrefix(key));
  }

  private getFullKey(key: string): string {
    return `${this.config.prefix}${key}`;
  }

  private removePrefix(key: string): string {
    return key.replace(this.config.prefix!, '');
  }

  private getAllKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.config.prefix!)) {
        keys.push(key);
      }
    }
    return keys;
  }

  private createError(code: string, message: string): StorageError {
    return {
      code,
      message,
    };
  }
}

export const localStorageProvider = new LocalStorageProvider(); 