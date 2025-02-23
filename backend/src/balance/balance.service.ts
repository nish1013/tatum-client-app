import { Injectable } from '@nestjs/common';
import {
  BlockchainNetwork,
  BlockchainService,
  BlockchainServiceFactory,
} from '../core';

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
  ): Promise<string> {
    try {
      const balance = await this.blockchainService.getBalance(network, address);

      return balance.balance.toString();
    } catch (error) {
      console.error(`Error fetching balance for ${network}:`, error);
      throw new Error('Failed to fetch balance.');
    }
  }
}
