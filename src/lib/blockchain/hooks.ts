import { useCallback } from 'react';
import { useBlockchain } from './context';
import { TransactionRequest, WalletProvider, WalletError } from './types';
import { formatBlockExplorerLink } from './chains';

interface BlockchainResult {
  success: boolean;
  error?: string;
}

interface TransactionResult extends BlockchainResult {
  hash?: string;
  explorerLink?: string;
}

interface SignMessageResult extends BlockchainResult {
  signature?: string;
}

export function useWallet() {
  const {
    address,
    chainId,
    isConnecting,
    isConnected,
    isDisconnected,
    error,
    connect,
    disconnect,
  } = useBlockchain();

  const handleConnect = useCallback(
    async (provider?: WalletProvider): Promise<BlockchainResult> => {
      try {
        await connect(provider);
        return { success: true };
      } catch (error) {
        const err = error as WalletError;
        return {
          success: false,
          error: err.message || 'Failed to connect wallet',
        };
      }
    },
    [connect]
  );

  const handleDisconnect = useCallback(async (): Promise<BlockchainResult> => {
    try {
      await disconnect();
      return { success: true };
    } catch (error) {
      const err = error as WalletError;
      return {
        success: false,
        error: err.message || 'Failed to disconnect wallet',
      };
    }
  }, [disconnect]);

  return {
    address,
    chainId,
    isConnecting,
    isConnected,
    isDisconnected,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
}

export function useNetwork() {
  const { chainId, error, switchChain } = useBlockchain();

  const handleSwitchChain = useCallback(
    async (newChainId: number): Promise<BlockchainResult> => {
      try {
        await switchChain(newChainId);
        return { success: true };
      } catch (error) {
        const err = error as WalletError;
        return {
          success: false,
          error: err.message || 'Failed to switch chain',
        };
      }
    },
    [switchChain]
  );

  return {
    chainId,
    error,
    switchChain: handleSwitchChain,
  };
}

export function useTransaction() {
  const { chainId, error, sendTransaction } = useBlockchain();

  const handleSendTransaction = useCallback(
    async (request: TransactionRequest): Promise<TransactionResult> => {
      try {
        const txHash = await sendTransaction(request);
        const explorerLink = chainId ? formatBlockExplorerLink(chainId, txHash) : undefined;
        return {
          success: true,
          hash: txHash,
          explorerLink,
        };
      } catch (error) {
        const err = error as WalletError;
        return {
          success: false,
          error: err.message || 'Failed to send transaction',
        };
      }
    },
    [chainId, sendTransaction]
  );

  return {
    error,
    sendTransaction: handleSendTransaction,
  };
}

export function useSignMessage() {
  const { error, signMessage } = useBlockchain();

  const handleSignMessage = useCallback(
    async (message: string): Promise<SignMessageResult> => {
      try {
        const signature = await signMessage(message);
        return {
          success: true,
          signature,
        };
      } catch (error) {
        const err = error as WalletError;
        return {
          success: false,
          error: err.message || 'Failed to sign message',
        };
      }
    },
    [signMessage]
  );

  return {
    error,
    signMessage: handleSignMessage,
  };
} 