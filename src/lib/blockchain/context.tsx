'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { WalletState, WalletProvider, TransactionRequest, WalletError } from './types';
import { blockchainClient } from './client';

interface BlockchainContextType extends WalletState {
  connect: (provider?: WalletProvider) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  sendTransaction: (request: TransactionRequest) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

interface BlockchainProviderProps {
  children: ReactNode;
}

export function BlockchainProvider({ children }: BlockchainProviderProps) {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnecting: false,
    isConnected: false,
    isDisconnected: true,
    error: null,
  });

  useEffect(() => {
    const initWallet = async () => {
      if (blockchainClient.isConnected()) {
        try {
          const walletState = await blockchainClient.connect();
          setState(walletState);
        } catch (error) {
          const err = error as WalletError;
          setState(prev => ({
            ...prev,
            error: err.message,
          }));
        }
      }
    };

    initWallet();
  }, []);

  const connect = async (provider?: WalletProvider) => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    try {
      const walletState = await blockchainClient.connect(provider);
      setState(walletState);
    } catch (error) {
      const err = error as WalletError;
      setState({
        address: null,
        chainId: null,
        isConnecting: false,
        isConnected: false,
        isDisconnected: true,
        error: err.message,
      });
      throw err;
    }
  };

  const disconnect = async () => {
    try {
      await blockchainClient.disconnect();
      setState({
        address: null,
        chainId: null,
        isConnecting: false,
        isConnected: false,
        isDisconnected: true,
        error: null,
      });
    } catch (error) {
      const err = error as WalletError;
      setState(prev => ({
        ...prev,
        error: err.message,
      }));
      throw err;
    }
  };

  const switchChain = async (chainId: number) => {
    try {
      await blockchainClient.switchChain(chainId);
      setState(prev => ({
        ...prev,
        chainId,
        error: null,
      }));
    } catch (error) {
      const err = error as WalletError;
      setState(prev => ({
        ...prev,
        error: err.message,
      }));
      throw err;
    }
  };

  const sendTransaction = async (request: TransactionRequest) => {
    try {
      return await blockchainClient.sendTransaction(request);
    } catch (error) {
      const err = error as WalletError;
      setState(prev => ({
        ...prev,
        error: err.message,
      }));
      throw err;
    }
  };

  const signMessage = async (message: string) => {
    try {
      return await blockchainClient.signMessage(message);
    } catch (error) {
      const err = error as WalletError;
      setState(prev => ({
        ...prev,
        error: err.message,
      }));
      throw err;
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        switchChain,
        sendTransaction,
        signMessage,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
} 