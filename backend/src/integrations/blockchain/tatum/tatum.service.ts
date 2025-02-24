import { Injectable } from '@nestjs/common';
import {
  Ethereum,
  ITatumSdkChain,
  Network,
  TatumConfig,
  TatumSDK,
} from '@tatumio/tatum';

import { BlockchainService, BlockchainBalance } from '../../../core';
import { getAsset, BlockchainNetwork } from '@lib/common';
import BigNumber from 'bignumber.js';

@Injectable()
export class TatumService implements BlockchainService {
  private tatumInstances: Record<string, ITatumSdkChain> = {};

  constructor() {}

  /**
   * Fetches the balance of the given address for the selected network.
   * @param network - The blockchain network to fetch the balance from.
   * @param address - The address to fetch the balance for.
   * @returns The balance of the address.
   */
  public async getBalance(
    network: BlockchainNetwork,
    address: string,
  ): Promise<BlockchainBalance> {
    const tatum = await this.getInstance(network);
    const asset = getAsset(network);

    try {
      const balance = await tatum.address.getBalance({ addresses: [address] });
      const balanceData = balance.data.find((item) => item.asset === asset);
      return {
        balance: new BigNumber(balanceData ? balanceData.balance : '0'),
      };
    } catch (error) {
      console.error(`Error fetching balance for ${network}:`, error);
      throw new Error('Failed to fetch balance.');
    }
  }
  /**
   * Initialize Tatum SDK with the given blockchain network.
   * Uses caching to prevent multiple SDK instances for the same network.
   */
  private async getInstance<T extends ITatumSdkChain = Ethereum>(
    network: BlockchainNetwork,
  ): Promise<T> {
    if (!this.tatumInstances[network]) {
      this.tatumInstances[network] = await TatumSDK.init<T>({
        network,
        apiKey: { v4: this.getApiKey(network) },
        verbose: true,
      } as TatumConfig);
    }

    return this.tatumInstances[network] as T;
  }

  /**
   * Retrieves the appropriate API key based on the selected network.
   */
  private getApiKey(network: Network): string {
    const envVarName = `TATUM_${network.toUpperCase().replace(/-/g, '_')}_API_KEY`;
    const apiKey = process.env[envVarName];

    if (!apiKey) {
      throw new Error(`Missing API key for network: ${network}`);
    }

    return apiKey;
  }
}
