import { keyStores } from 'near-api-js';

const CONTRACT_NAME = process.env.NEXT_PUBLIC_CONTRACT_NAME;
let myKeyStore: keyStores.BrowserLocalStorageKeyStore;
if (typeof window !== 'undefined') {
  myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
}

export function getConfig(env: string) {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        keyStore: myKeyStore,
        contractName: CONTRACT_NAME!,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
        headers: {},
      };
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        keyStore: myKeyStore,
        contractName: CONTRACT_NAME!,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        headers: {},
      };
    case 'betanet':
      return {
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.near.org',
        keyStore: myKeyStore,
        contractName: CONTRACT_NAME!,
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org',
        explorerUrl: 'https://explorer.betanet.near.org',
        headers: {},
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
}
