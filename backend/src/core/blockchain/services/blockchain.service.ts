import { BlockchainBalance } from '../interfaces/blockchain.balance';
import { BlockchainChain } from '../interfaces/blockchain.chain';
import { BlockchainNetwork } from '../interfaces/blockchain.network';

export interface BlockchainService {
  getInstance<T extends BlockchainChain>(
    network: BlockchainNetwork,
  ): Promise<T>;
  getApiKey(network: BlockchainNetwork): string;
  getBalance(address: string): Promise<BlockchainBalance>;
}
