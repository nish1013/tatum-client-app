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
export declare const getAsset: (network: Network) => ChainAsset;
