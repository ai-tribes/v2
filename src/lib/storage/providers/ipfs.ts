import { StorageConfig, StorageError, StorageMetadata, UploadOptions, UploadResult, StorageProvider, StorageType } from '../types';
import { encryptionService } from '../encryption';

interface IPFSError extends Error {
  code?: string;
  name: string;
}

interface IPFSUploadResponse {
  Hash: string;
  Name: string;
  Size: string;
}

interface EncryptedContent {
  data: string;
  iv: string;
}

export class IPFSStorageProvider implements StorageProvider {
  public readonly type: StorageType = 'ipfs';
  public readonly name = 'IPFS Storage';
  public readonly description = 'Decentralized IPFS storage provider';
  public readonly permanent = true;
  public readonly encryption: boolean;

  private config: StorageConfig;
  private gateway: string;

  constructor(config: StorageConfig = {}) {
    this.config = {
      encryption: false,
      ipfsGateway: 'https://ipfs.io/ipfs/',
      ...config,
    };
    this.gateway = this.config.ipfsGateway!;
    this.encryption = this.config.encryption || false;

    if (this.config.encryption && this.config.encryptionKey) {
      encryptionService.initialize(this.config.encryptionKey);
    }
  }

  public async upload(
    data: string | Blob | File,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    try {
      let content: Blob;
      let contentType = options.contentType || 'application/octet-stream';
      let encryptedContent: EncryptedContent | undefined;

      if (typeof data === 'string') {
        // If encryption is enabled, encrypt the string data
        if (this.config.encryption) {
          encryptedContent = await encryptionService.encrypt(data);
          content = new Blob([JSON.stringify(encryptedContent)], { type: 'application/json' });
          contentType = 'application/json+encrypted';
        } else {
          content = new Blob([data], { type: contentType });
        }
      } else {
        content = data;
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', content);

      // Upload to IPFS using Infura or other IPFS service
      const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload to IPFS');
      }

      const result = (await response.json()) as IPFSUploadResponse;
      const hash = result.Hash;

      const metadata: StorageMetadata = {
        contentType,
        size: content.size,
        created: Date.now(),
        modified: Date.now(),
        hash,
        encryption: this.config.encryption && encryptedContent ? {
          algorithm: 'AES-GCM',
          iv: encryptedContent.iv,
        } : undefined,
      };

      return {
        url: `${this.gateway}${hash}`,
        hash,
        size: content.size,
        metadata,
      };
    } catch (error) {
      const err = error as IPFSError;
      throw this.createError('UPLOAD_ERROR', err.message || 'Failed to upload to IPFS');
    }
  }

  public async download(hash: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.gateway}${hash}`);
      
      if (!response.ok) {
        throw new Error('Failed to download from IPFS');
      }

      const data = await response.blob();

      // If the content is encrypted, decrypt it
      if (this.config.encryption) {
        const text = await data.text();
        const encrypted = JSON.parse(text) as EncryptedContent;
        const decrypted = await encryptionService.decrypt(encrypted);
        return new Blob([decrypted], { type: 'text/plain' });
      }

      return data;
    } catch (error) {
      const err = error as IPFSError;
      throw this.createError('DOWNLOAD_ERROR', err.message || 'Failed to download from IPFS');
    }
  }

  public async getMetadata(hash: string): Promise<StorageMetadata> {
    try {
      const response = await fetch(`${this.gateway}${hash}`, {
        method: 'HEAD',
      });

      if (!response.ok) {
        throw new Error('Failed to get metadata from IPFS');
      }

      return {
        contentType: response.headers.get('content-type') || 'application/octet-stream',
        size: parseInt(response.headers.get('content-length') || '0'),
        created: Date.now(), // IPFS doesn't provide creation time
        modified: Date.now(),
        hash,
        encryption: this.config.encryption ? {
          algorithm: 'AES-GCM',
          iv: '', // Set if encrypted
        } : undefined,
      };
    } catch (error) {
      const err = error as IPFSError;
      throw this.createError('METADATA_ERROR', err.message || 'Failed to get metadata from IPFS');
    }
  }

  private createError(code: string, message: string): StorageError {
    return {
      code,
      message,
    };
  }
}

export const ipfsStorageProvider = new IPFSStorageProvider(); 