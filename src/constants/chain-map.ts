import { Network } from '@tatumio/tatum';

// TODO: Add more networks and chains as needed
// currently only Ethereum and Ethereum Sepolia are supported
// due to the api keys limitation
export const CHAIN_NETWORKS = {
  Ethereum: [Network.ETHEREUM, Network.ETHEREUM_SEPOLIA],
};