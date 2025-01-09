export interface StorageConfig {
  prefix?: string;
  encryption?: boolean;
  encryptionKey?: string;
  ipfsGateway?: string;
  arweaveGateway?: string;
}

export interface StorageItem {
  key: string;
  value: any;
  timestamp: number;
  encrypted?: boolean;
}

export interface StorageMetadata {
  contentType: string;
  size: number;
  created: number;
  modified: number;
  hash?: string;
  encryption?: {
    algorithm: string;
    iv: string;
  };
}

export interface UploadOptions {
  contentType?: string;
  encryption?: boolean;
  permanent?: boolean;
  metadata?: Record<string, any>;
}

export interface UploadResult {
  url: string;
  hash: string;
  size: number;
  metadata: StorageMetadata;
}

export interface StorageProvider {
  // Common properties
  type: StorageType;
  name: string;
  description: string;
  permanent: boolean;
  encryption: boolean;

  // Local storage methods
  set?(key: string, value: any): Promise<void>;
  get?<T = any>(key: string): Promise<T | null>;
  remove?(key: string): Promise<void>;
  clear?(): Promise<void>;

  // IPFS/Arweave methods
  upload?(data: string | Blob | File, options?: UploadOptions): Promise<UploadResult>;
  download?(hash: string): Promise<Blob>;
  getMetadata?(hash: string): Promise<StorageMetadata>;
}

export const STORAGE_TYPES = {
  LOCAL: 'local',
  IPFS: 'ipfs',
  ARWEAVE: 'arweave',
} as const;

export type StorageType = typeof STORAGE_TYPES[keyof typeof STORAGE_TYPES];

export interface StorageError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface EncryptionResult {
  data: string;
  iv: string;
}

export interface DecryptionInput {
  data: string;
  iv: string;
  algorithm?: string;
} 