import { StorageConfig, StorageItem, StorageError, StorageMetadata } from '../types';
import { encryptionService } from '../encryption';

export class LocalStorageProvider {
  private config: StorageConfig;

  constructor(config: StorageConfig = {}) {
    this.config = {
      prefix: 'ai_tribes_',
      encryption: false,
      ...config,
    };

    if (this.config.encryption && this.config.encryptionKey) {
      encryptionService.initialize(this.config.encryptionKey);
    }
  }

  public async set(key: string, value: any): Promise<void> {
    try {
      const item: StorageItem = {
        key,
        value,
        timestamp: Date.now(),
        encrypted: false,
      };

      if (this.config.encryption) {
        const stringValue = JSON.stringify(value);
        const encrypted = await encryptionService.encrypt(stringValue);
        item.value = encrypted.data;
        item.encrypted = true;
      }

      const fullKey = this.getFullKey(key);
      localStorage.setItem(fullKey, JSON.stringify(item));
    } catch (error: any) {
      throw this.createError('SET_ERROR', error.message);
    }
  }

  public async get<T = any>(key: string): Promise<T | null> {
    try {
      const fullKey = this.getFullKey(key);
      const rawItem = localStorage.getItem(fullKey);

      if (!rawItem) {
        return null;
      }

      const item: StorageItem = JSON.parse(rawItem);

      if (item.encrypted && this.config.encryption) {
        const decrypted = await encryptionService.decrypt({
          data: item.value,
          iv: item.value.iv,
        });
        return JSON.parse(decrypted);
      }

      return item.value;
    } catch (error: any) {
      throw this.createError('GET_ERROR', error.message);
    }
  }

  public async remove(key: string): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      localStorage.removeItem(fullKey);
    } catch (error: any) {
      throw this.createError('REMOVE_ERROR', error.message);
    }
  }

  public async clear(): Promise<void> {
    try {
      const keys = this.getAllKeys();
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error: any) {
      throw this.createError('CLEAR_ERROR', error.message);
    }
  }

  public async getMetadata(key: string): Promise<StorageMetadata | null> {
    try {
      const fullKey = this.getFullKey(key);
      const rawItem = localStorage.getItem(fullKey);

      if (!rawItem) {
        return null;
      }

      const item: StorageItem = JSON.parse(rawItem);
      const size = new Blob([JSON.stringify(item.value)]).size;

      return {
        contentType: 'application/json',
        size,
        created: item.timestamp,
        modified: item.timestamp,
        encryption: item.encrypted ? {
          algorithm: 'AES-GCM',
          iv: item.value.iv,
        } : undefined,
      };
    } catch (error: any) {
      throw this.createError('METADATA_ERROR', error.message);
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