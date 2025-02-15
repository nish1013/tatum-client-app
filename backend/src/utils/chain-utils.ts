import { Network } from '@tatumio/tatum';
import { ChainAsset } from '../constants/chain-asset';

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
export const getAsset = (network: Network): ChainAsset => {
  switch (network) {
    case Network.ETHEREUM:
    case Network.ETHEREUM_SEPOLIA:
      return ChainAsset.ETH;

    default:
      throw new Error(`Network ${network} is not supported.`);
  }
};
