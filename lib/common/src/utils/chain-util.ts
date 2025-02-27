import { Network } from '@tatumio/tatum';
import { ChainAsset } from '../constants/chain-asset';
import { BlockchainNetwork } from '../interfaces';

/**
 * Determines the correct asset symbol for a given blockchain network.
 *
 * Currently supports:
 * - Ethereum (Mainnet, Sepolia) → ETH
 *
 * @param network - The selected blockchain network.
 * @returns The corresponding asset symbol.
 * @throws Error if the network is not supported.
 */
export const getAsset = (network: BlockchainNetwork): ChainAsset => {
  switch (network) {
    case BlockchainNetwork.ETHEREUM:
    case BlockchainNetwork.ETHEREUM_SEPOLIA:
      return ChainAsset.ETH;

    default:
      throw new Error(`Network ${network} is not supported.`);
  }
};
