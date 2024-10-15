export const CHAINS = {
  BASE: 'BASE',
  KIICHAIN: 'KIICHAIN',
  SUI: 'SUI',
  SOLANA: 'SOLANA',
  APTOS: 'APTOS',
};

export const EVM_CHAIN_RPC = {
  BASE: 'https://sepolia.base.org',
  KIICHAIN: 'https://a.sentry.testnet.kiivalidator.com:8645/',
};

export const EVM_CHAIN_RPC_CONFIG = {
  BASE: {
    chainId: 84532,
    chainName: 'base sepolia',
  },
  KIICHAIN: {
    chainId: 123454321,
    name: 'kiichain',
  },
};

export const BASE_CHAIN_PARAMS = {
  chainId: '0x14a34',
  chainName: 'base-sepolia',
  rpcUrls: [EVM_CHAIN_RPC.BASE],
  nativeCurrency: {
    name: 'Base Sepolia ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://sepolia-explorer.base.org'],
};
