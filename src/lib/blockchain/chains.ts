import { Chain, SUPPORTED_CHAINS } from './types';

export const chains: Record<number, Chain> = {
  [SUPPORTED_CHAINS.ETHEREUM]: {
    id: SUPPORTED_CHAINS.ETHEREUM,
    name: 'Ethereum',
    network: 'mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      'https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}',
      'https://mainnet.infura.io/v3/${INFURA_ID}',
    ],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
    ],
    testnet: false,
  },
  [SUPPORTED_CHAINS.POLYGON]: {
    id: SUPPORTED_CHAINS.POLYGON,
    name: 'Polygon',
    network: 'polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}',
      'https://polygon-rpc.com',
    ],
    blockExplorers: [
      {
        name: 'PolygonScan',
        url: 'https://polygonscan.com',
      },
    ],
    testnet: false,
  },
  [SUPPORTED_CHAINS.ARBITRUM]: {
    id: SUPPORTED_CHAINS.ARBITRUM,
    name: 'Arbitrum',
    network: 'arbitrum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      'https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}',
      'https://arbitrum.public-rpc.com',
    ],
    blockExplorers: [
      {
        name: 'Arbiscan',
        url: 'https://arbiscan.io',
      },
    ],
    testnet: false,
  },
  [SUPPORTED_CHAINS.OPTIMISM]: {
    id: SUPPORTED_CHAINS.OPTIMISM,
    name: 'Optimism',
    network: 'optimism',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      'https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}',
      'https://mainnet.optimism.io',
    ],
    blockExplorers: [
      {
        name: 'OptimismScan',
        url: 'https://optimistic.etherscan.io',
      },
    ],
    testnet: false,
  },
  [SUPPORTED_CHAINS.GOERLI]: {
    id: SUPPORTED_CHAINS.GOERLI,
    name: 'Goerli',
    network: 'goerli',
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      'https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_ID}',
      'https://goerli.infura.io/v3/${INFURA_ID}',
    ],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://goerli.etherscan.io',
      },
    ],
    testnet: true,
  },
  [SUPPORTED_CHAINS.MUMBAI]: {
    id: SUPPORTED_CHAINS.MUMBAI,
    name: 'Mumbai',
    network: 'maticmum',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID}',
      'https://rpc-mumbai.maticvigil.com',
    ],
    blockExplorers: [
      {
        name: 'PolygonScan',
        url: 'https://mumbai.polygonscan.com',
      },
    ],
    testnet: true,
  },
};

export function getChainById(chainId: number): Chain | undefined {
  return chains[chainId];
}

export function isTestnet(chainId: number): boolean {
  return chains[chainId]?.testnet ?? false;
}

export function getBlockExplorer(chainId: number): string {
  return chains[chainId]?.blockExplorers[0]?.url ?? '';
}

export function formatBlockExplorerLink(chainId: number, hash: string, type: 'tx' | 'address' = 'tx'): string {
  const baseUrl = getBlockExplorer(chainId);
  if (!baseUrl) return '';
  return `${baseUrl}/${type}/${hash}`;
} 