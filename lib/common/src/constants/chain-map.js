"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAIN_NETWORKS = void 0;
const tatum_1 = require("@tatumio/tatum");
// TODO: Add more networks and chains as needed
// currently only Ethereum and Ethereum Sepolia are supported
// due to the api keys limitation
exports.CHAIN_NETWORKS = {
    Ethereum: [tatum_1.Network.ETHEREUM, tatum_1.Network.ETHEREUM_SEPOLIA],
};
