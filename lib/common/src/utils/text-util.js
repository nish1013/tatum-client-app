"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNetworkName = void 0;
/**
 * Converts network enum value to a user-friendly format.
 * Example: "ethereum-sepolia" → "Sepolia"
 */
const formatNetworkName = (network) => {
    const parts = network.split("-");
    return parts.length > 1
        ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) // Only return network part
        : network.charAt(0).toUpperCase() + network.slice(1);
};
exports.formatNetworkName = formatNetworkName;
