export interface Chain {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers: {
    name: string;
    url: string;
  }[];
  testnet: boolean;
}

export interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  isDisconnected: boolean;
  error: string | null;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  data?: string;
  chainId: number;
  status?: 'pending' | 'success' | 'failed';
  timestamp: number;
}

export interface TransactionRequest {
  to: string;
  value?: string;
  data?: string;
  chainId?: number;
}

export interface SignMessageRequest {
  message: string;
  address: string;
}

export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  POLYGON: 137,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  // Testnets
  GOERLI: 5,
  MUMBAI: 80001,
} as const;

export type ChainId = typeof SUPPORTED_CHAINS[keyof typeof SUPPORTED_CHAINS];

export interface WalletError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export type WalletProvider = 'metamask' | 'walletconnect' | 'coinbase'; 