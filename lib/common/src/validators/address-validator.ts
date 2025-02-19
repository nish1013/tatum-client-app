import { Network } from '@tatumio/tatum';

/**
 * Validates a blockchain address based on the selected network.
 */
export const isValidBlockchainAddress = (
  address: string,
  network: Network
): boolean => {
  switch (network) {
    case Network.ETHEREUM:
    case Network.ETHEREUM_SEPOLIA:
      return /^0x[a-fA-F0-9]{40}$/.test(address);

    default:
      throw new Error(`Network ${network} is not supported.`);
  }
};
