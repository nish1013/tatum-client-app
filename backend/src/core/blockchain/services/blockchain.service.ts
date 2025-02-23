import { BlockchainBalance } from '../interfaces/blockchain.balance';
import { BlockchainNetwork } from '../interfaces/blockchain.network';

export interface BlockchainService {
  getBalance(
    network: BlockchainNetwork,
    address: string,
  ): Promise<BlockchainBalance>;
}
