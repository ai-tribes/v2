import { EncryptionResult, DecryptionInput, StorageError } from './types';

interface CryptoError extends Error {
  code?: string;
  name: string;
}

export class EncryptionService {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;
  private key: CryptoKey | null = null;

  public async initialize(key?: string): Promise<void> {
    if (!this.isSupported()) {
      throw this.createError('ENCRYPTION_NOT_SUPPORTED', 'Web Crypto API is not supported in this environment');
    }

    try {
      if (key) {
        // Convert string key to CryptoKey
        const keyBuffer = new TextEncoder().encode(key);
        this.key = await crypto.subtle.importKey(
          'raw',
          keyBuffer,
          { name: EncryptionService.ALGORITHM, length: EncryptionService.KEY_LENGTH },
          false,
          ['encrypt', 'decrypt']
        );
      } else {
        // Generate a new random key
        this.key = await crypto.subtle.generateKey(
          { name: EncryptionService.ALGORITHM, length: EncryptionService.KEY_LENGTH },
          true,
          ['encrypt', 'decrypt']
        );
      }
    } catch (error) {
      const err = error as CryptoError;
      throw this.createError('ENCRYPTION_INIT_ERROR', err.message || 'Failed to initialize encryption');
    }
  }

  public async encrypt(data: string): Promise<EncryptionResult> {
    if (!this.key) {
      throw this.createError('ENCRYPTION_NOT_INITIALIZED', 'Encryption service not initialized');
    }

    try {
      // Generate random IV
      const iv = crypto.getRandomValues(new Uint8Array(EncryptionService.IV_LENGTH));
      
      // Encrypt the data
      const encodedData = new TextEncoder().encode(data);
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: EncryptionService.ALGORITHM, iv },
        this.key,
        encodedData
      );

      // Convert to base64 strings
      const encryptedBase64 = this.arrayBufferToBase64(encryptedBuffer);
      const ivBase64 = this.arrayBufferToBase64(iv);

      return {
        data: encryptedBase64,
        iv: ivBase64,
      };
    } catch (error) {
      const err = error as CryptoError;
      throw this.createError('ENCRYPTION_ERROR', err.message || 'Failed to encrypt data');
    }
  }

  public async decrypt({ data, iv }: DecryptionInput): Promise<string> {
    if (!this.key) {
      throw this.createError('ENCRYPTION_NOT_INITIALIZED', 'Encryption service not initialized');
    }

    try {
      // Convert base64 strings back to buffers
      const encryptedBuffer = this.base64ToArrayBuffer(data);
      const ivBuffer = this.base64ToArrayBuffer(iv);

      // Decrypt the data
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: EncryptionService.ALGORITHM, iv: ivBuffer },
        this.key,
        encryptedBuffer
      );

      // Convert back to string
      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      const err = error as CryptoError;
      throw this.createError('DECRYPTION_ERROR', err.message || 'Failed to decrypt data');
    }
  }

  private isSupported(): boolean {
    return typeof crypto !== 'undefined' && 
           typeof crypto.subtle !== 'undefined' && 
           typeof TextEncoder !== 'undefined';
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private createError(code: string, message: string): StorageError {
    return {
      code,
      message,
    };
  }
}

export const encryptionService = new EncryptionService(); 