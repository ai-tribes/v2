import { useCallback } from 'react';
import { useBlockchain } from './context';
import { TransactionRequest, WalletProvider } from './types';
import { formatBlockExplorerLink } from './chains';

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
    async (provider?: WalletProvider) => {
      try {
        await connect(provider);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Failed to connect wallet',
        };
      }
    },
    [connect]
  );

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to disconnect wallet',
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
    async (newChainId: number) => {
      try {
        await switchChain(newChainId);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Failed to switch chain',
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
    async (request: TransactionRequest) => {
      try {
        const txHash = await sendTransaction(request);
        const explorerLink = formatBlockExplorerLink(chainId!, txHash);
        return {
          success: true,
          hash: txHash,
          explorerLink,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Failed to send transaction',
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
    async (message: string) => {
      try {
        const signature = await signMessage(message);
        return {
          success: true,
          signature,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Failed to sign message',
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