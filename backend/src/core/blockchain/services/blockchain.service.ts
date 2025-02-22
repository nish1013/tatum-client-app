import { BlockchainBalance } from '../interfaces/blockchain.balance';
import { BlockchainNetwork } from '../interfaces/blockchain.network';

export interface BlockchainService {
  getInstance<T>(network: BlockchainService): Promise<T>;
  getApiKey(network: BlockchainNetwork): string;
  getBalance(address: string): Promise<BlockchainBalance>;
}
