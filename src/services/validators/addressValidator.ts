/**
 * Validates if a given string is a valid Ethereum address.
 */
export const isValidEthereumAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };
  