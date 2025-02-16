"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidBlockchainAddress = void 0;
const tatum_1 = require("@tatumio/tatum");
/**
 * Validates a blockchain address based on the selected network.
 */
const isValidBlockchainAddress = (address, network) => {
    switch (network) {
        case tatum_1.Network.ETHEREUM:
        case tatum_1.Network.ETHEREUM_SEPOLIA:
            return /^0x[a-fA-F0-9]{40}$/.test(address);
        default:
            throw new Error(`Network ${network} is not supported.`);
    }
};
exports.isValidBlockchainAddress = isValidBlockchainAddress;
