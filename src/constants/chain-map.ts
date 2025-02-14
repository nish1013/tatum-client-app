import { Network } from '@tatumio/tatum';

// TODO: Add more networks and chains as needed
export const CHAIN_NETWORKS = {
  Ethereum: [Network.ETHEREUM, Network.ETHEREUM_SEPOLIA],
  Polygon: [Network.POLYGON, Network.POLYGON_AMOY],
  Bitcoin: [Network.BITCOIN],
  Solana: [Network.SOLANA],
};