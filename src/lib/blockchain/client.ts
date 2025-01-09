import { Chain, TransactionRequest, WalletError, WalletProvider, WalletState } from './types';
import { getChainById } from './chains';

declare global {
  interface Window {
    ethereum?: any;
  }
}

class BlockchainClient {
  private provider: any;
  private walletProvider: WalletProvider | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.provider = window.ethereum;
    }
  }

  public async connect(provider: WalletProvider = 'metamask'): Promise<WalletState> {
    try {
      if (!this.provider) {
        throw this.createError('NO_PROVIDER', 'No wallet provider found');
      }

      this.walletProvider = provider;

      // Request account access
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      const chainId = await this.provider.request({ method: 'eth_chainId' });

      return {
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        isConnecting: false,
        isConnected: true,
        isDisconnected: false,
        error: null,
      };
    } catch (error: any) {
      throw this.createError('CONNECT_ERROR', error.message);
    }
  }

  public async disconnect(): Promise<void> {
    this.walletProvider = null;
  }

  public async switchChain(chainId: number): Promise<void> {
    try {
      const chain = getChainById(chainId);
      if (!chain) {
        throw this.createError('INVALID_CHAIN', 'Invalid chain ID');
      }

      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      // If the chain hasn't been added to the wallet
      if (error.code === 4902) {
        await this.addChain(chainId);
      } else {
        throw this.createError('SWITCH_CHAIN_ERROR', error.message);
      }
    }
  }

  public async addChain(chainId: number): Promise<void> {
    try {
      const chain = getChainById(chainId);
      if (!chain) {
        throw this.createError('INVALID_CHAIN', 'Invalid chain ID');
      }

      await this.provider.request({
        method: 'wallet_addEthereumChain',
        params: [this.formatChainForWallet(chain)],
      });
    } catch (error: any) {
      throw this.createError('ADD_CHAIN_ERROR', error.message);
    }
  }

  public async sendTransaction(request: TransactionRequest): Promise<string> {
    try {
      const accounts = await this.provider.request({ method: 'eth_accounts' });
      const txHash = await this.provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: accounts[0],
          to: request.to,
          value: request.value ? `0x${BigInt(request.value).toString(16)}` : undefined,
          data: request.data,
          chainId: request.chainId ? `0x${request.chainId.toString(16)}` : undefined,
        }],
      });

      return txHash;
    } catch (error: any) {
      throw this.createError('TRANSACTION_ERROR', error.message);
    }
  }

  public async signMessage(message: string): Promise<string> {
    try {
      const accounts = await this.provider.request({ method: 'eth_accounts' });
      const signature = await this.provider.request({
        method: 'personal_sign',
        params: [message, accounts[0]],
      });

      return signature;
    } catch (error: any) {
      throw this.createError('SIGN_ERROR', error.message);
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