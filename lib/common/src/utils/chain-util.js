"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsset = void 0;
const tatum_1 = require("@tatumio/tatum");
const chain_asset_1 = require("../constants/chain-asset");
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
const getAsset = (network) => {
    switch (network) {
        case tatum_1.Network.ETHEREUM:
        case tatum_1.Network.ETHEREUM_SEPOLIA:
            return chain_asset_1.ChainAsset.ETH;
        default:
            throw new Error(`Network ${network} is not supported.`);
    }
};
exports.getAsset = getAsset;
