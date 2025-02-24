import { BlockchainBalance } from '../interfaces/blockchain.balance';
import { BlockchainNetwork } from '@lib/common';

export interface BlockchainService {
  getBalance(
    network: BlockchainNetwork,
    address: string,
  ): Promise<BlockchainBalance>;
}
