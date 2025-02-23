import { BlockchainNetwork } from '../interfaces';

/**
 * Validates a blockchain address based on the selected network.
 */
export const isValidBlockchainAddress = (
  address: string,
  network: BlockchainNetwork,
): boolean => {
  switch (network) {
    case BlockchainNetwork.ETHEREUM:
    case BlockchainNetwork.ETHEREUM_SEPOLIA:
      return /^0x[a-fA-F0-9]{40}$/.test(address);

    default:
      throw new Error(`Network ${network} is not supported.`);
  }
};
