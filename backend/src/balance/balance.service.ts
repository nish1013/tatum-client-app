import { Injectable } from '@nestjs/common';
import {
  BlockchainBalance,
  BlockchainService,
  BlockchainServiceFactory,
} from '../core';
import { BlockchainNetwork } from '@lib/common';

@Injectable()
export class BalanceService {
  private blockchainService: BlockchainService;
  constructor(private readonly factory: BlockchainServiceFactory) {
    this.blockchainService = this.factory.create();
  }

  /**
   * Fetches the balance of the given address for the selected network.
   */
  async getBalance(
    network: BlockchainNetwork,
    address: string,
  ): Promise<BlockchainBalance> {
    try {
      const balance = await this.blockchainService.getBalance(network, address);

      return balance;
    } catch (error) {
      console.error(`Error fetching balance for ${network}:`, error);
      throw new Error('Failed to fetch balance.');
    }
  }
}
