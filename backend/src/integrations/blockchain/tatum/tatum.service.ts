import { Injectable } from '@nestjs/common';
import {
  Ethereum,
  ITatumSdkChain,
  Network,
  TatumConfig,
  TatumSDK,
} from '@tatumio/tatum';

@Injectable()
export class TatumService {
  private tatumInstances: Record<string, ITatumSdkChain> = {};

  constructor() {}

  /**
   * Initialize Tatum SDK with the given blockchain network.
   * Uses caching to prevent multiple SDK instances for the same network.
   */
  public async getTatumInstance<T extends ITatumSdkChain = Ethereum>(
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

  /**
   * Retrieves the appropriate API key based on the selected network.
   */
  public getApiKeyForNetwork(network: Network): string {
    const envVarName = `TATUM_${network.toUpperCase().replace(/-/g, '_')}_API_KEY`;
    const apiKey = process.env[envVarName];

    if (!apiKey) {
      throw new Error(`Missing API key for network: ${network}`);
    }

    return apiKey;
  }
}
