import { Injectable } from '@nestjs/common';
import {
  TatumSDK,
  Network,
  ITatumSdkChain,
  TatumConfig,
  Ethereum,
} from '@tatumio/tatum';
import { getAsset } from '@lib/common';
import { TatumService } from '../integrations';

@Injectable()
export class BalanceService {
  constructor(private readonly tatumService: TatumService) {}

  /**
   * Fetches the balance of the given address for the selected network.
   */
  async getBalance(network: Network, address: string): Promise<string> {
    const tatum = await this.tatumService.getTatumInstance(network);
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
}
