import { Chain, TransactionRequest, WalletError, WalletProvider, WalletState } from './types';
import { getChainById } from './chains';

interface EthereumProvider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

class BlockchainClient {
  private provider: EthereumProvider | null = null;
  private walletProvider: WalletProvider | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.provider = window.ethereum ?? null;
    }
  }

  public async connect(provider: WalletProvider = 'metamask'): Promise<WalletState> {
    try {
      if (!this.provider) {
        throw this.createError('NO_PROVIDER', 'No wallet provider found');
      }

      this.walletProvider = provider;

      // Request account access
      const accounts = (await this.provider.request({ method: 'eth_requestAccounts' })) as string[];
      const chainId = (await this.provider.request({ method: 'eth_chainId' })) as string;

      return {
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        isConnecting: false,
        isConnected: true,
        isDisconnected: false,
        error: null,
      };
    } catch (error) {
      const err = error as Error;
      throw this.createError('CONNECT_ERROR', err.message);
    }
  }

  public async disconnect(): Promise<void> {
    this.walletProvider = null;
  }

  public async switchChain(chainId: number): Promise<void> {
    try {
      if (!this.provider) {
        throw this.createError('NO_PROVIDER', 'No wallet provider found');
      }

      const chain = getChainById(chainId);
      if (!chain) {
        throw this.createError('INVALID_CHAIN', 'Invalid chain ID');
      }

      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error) {
      const err = error as { code: number; message: string };
      // If the chain hasn't been added to the wallet
      if (err.code === 4902) {
        await this.addChain(chainId);
      } else {
        throw this.createError('SWITCH_CHAIN_ERROR', err.message);
      }
    }
  }

  public async addChain(chainId: number): Promise<void> {
    try {
      if (!this.provider) {
        throw this.createError('NO_PROVIDER', 'No wallet provider found');
      }

      const chain = getChainById(chainId);
      if (!chain) {
        throw this.createError('INVALID_CHAIN', 'Invalid chain ID');
      }

      await this.provider.request({
        method: 'wallet_addEthereumChain',
        params: [this.formatChainForWallet(chain)],
      });
    } catch (error) {
      const err = error as Error;
      throw this.createError('ADD_CHAIN_ERROR', err.message);
    }
  }

  public async sendTransaction(request: TransactionRequest): Promise<string> {
    try {
      if (!this.provider) {
        throw this.createError('NO_PROVIDER', 'No wallet provider found');
      }

      const accounts = (await this.provider.request({ method: 'eth_accounts' })) as string[];
      const txHash = (await this.provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: accounts[0],
          to: request.to,
          value: request.value ? `0x${BigInt(request.value).toString(16)}` : undefined,
          data: request.data,
          chainId: request.chainId ? `0x${request.chainId.toString(16)}` : undefined,
        }],
      })) as string;

      return txHash;
    } catch (error) {
      const err = error as Error;
      throw this.createError('TRANSACTION_ERROR', err.message);
    }
  }

  public async signMessage(message: string): Promise<string> {
    try {
      if (!this.provider) {
        throw this.createError('NO_PROVIDER', 'No wallet provider found');
      }

      const accounts = (await this.provider.request({ method: 'eth_accounts' })) as string[];
      const signature = (await this.provider.request({
        method: 'personal_sign',
        params: [message, accounts[0]],
      })) as string;

      return signature;
    } catch (error) {
      const err = error as Error;
      throw this.createError('SIGN_ERROR', err.message);
    }
  }

  public isConnected(): boolean {
    return !!this.walletProvider;
  }

  private createError(code: string, message: string): WalletError {
    return {
      code,
      message,
    };
  }

  private formatChainForWallet(chain: Chain) {
    return {
      chainId: `0x${chain.id.toString(16)}`,
      chainName: chain.name,
      nativeCurrency: chain.nativeCurrency,
      rpcUrls: chain.rpcUrls,
      blockExplorerUrls: chain.blockExplorers.map(explorer => explorer.url),
    };
  }
}

export const blockchainClient = new BlockchainClient(); 