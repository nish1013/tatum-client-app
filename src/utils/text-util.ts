/**
 * Converts network enum value to a user-friendly format.
 * Example: "ethereum-sepolia" → "Sepolia"
 */
export const formatNetworkName = (network: string): string => {
    const parts = network.split("-");
    return parts.length > 1 
      ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) // Only return network part
      : network.charAt(0).toUpperCase() + network.slice(1);
  };
  