import { Injectable } from '@nestjs/common';
import {
  TatumSDK,
  Network,
  ITatumSdkChain,
  TatumConfig,
  Ethereum,
} from '@tatumio/tatum';
import { getAsset } from '@lib/common';

@Injectable()
export class BalanceService {
  private tatumInstances: Record<string, ITatumSdkChain> = {};

  constructor() {}

  /**
   * Fetches the balance of the given address for the selected network.
   */
  async getBalance(network: Network, address: string): Promise<string> {
    const tatum = await this.getTatumInstance(network);
    const asset = getAsset(network);

    try {
      const balance = await tatum.address.getBalance({ addresses: [address] });
      const balanceData = balance.data.find((item) => item.asset === asset);
      return balanceData ? balanceData.balance : '0.00';
    } catch (error) {
      console.error(`Error fetching balance for ${network}:`, error);
      throw new Error('Failed to fetch balance.');
    }
  }

  /**
   * Retrieves the appropriate API key based on the selected network.
   */
  private getApiKeyForNetwork(network: Network): string {
    const envVarName = `TATUM_${network.toUpperCase().replace(/-/g, '_')}_API_KEY`;
    const apiKey = process.env[envVarName];

    if (!apiKey) {
      throw new Error(`Missing API key for network: ${network}`);
    }

    return apiKey;
  }

  /**
   * Initialize Tatum SDK with the given blockchain network.
   * Uses caching to prevent multiple SDK instances for the same network.
   */
  private async getTatumInstance<T extends ITatumSdkChain = Ethereum>(
    network: Network,
  ): Promise<T> {
    if (!this.tatumInstances[network]) {
      this.tatumInstances[network] = await TatumSDK.init<T>({
        network,
        apiKey: { v4: this.getApiKeyForNetwork(network) },
        verbose: true,
      } as TatumConfig);
    }

    return this.tatumInstances[network] as T;
  }
}
