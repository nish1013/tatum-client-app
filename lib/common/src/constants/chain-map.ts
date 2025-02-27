import { BlockchainNetwork } from '../interfaces/blockchain.network';
// TODO: Add more networks and chains as needed
// currently only Ethereum and Ethereum Sepolia are supported
// due to the api keys limitation
export const CHAIN_NETWORKS = {
  Ethereum: [BlockchainNetwork.ETHEREUM, BlockchainNetwork.ETHEREUM_SEPOLIA],
};
