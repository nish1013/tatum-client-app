/**
 * Converts network enum value to a user-friendly format.
 * Example: "ethereum-sepolia" → "Ethereum (Sepolia)"
 */
export const formatNetworkName = (network: string): string => {
  const parts = network.split("-");
  return parts.length > 1
    ? `${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} (${parts[1].charAt(0).toUpperCase() + parts[1].slice(1)})`
    : network.charAt(0).toUpperCase() + network.slice(1);
};