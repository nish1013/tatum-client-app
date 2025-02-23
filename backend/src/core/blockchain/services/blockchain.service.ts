import { BlockchainBalance } from '../interfaces/blockchain.balance';
import { BlockchainChain } from '../interfaces/blockchain.chain';
import { BlockchainNetwork } from '../interfaces/blockchain.network';

export interface BlockchainService {
  getBalance(
    network: BlockchainNetwork,
    address: string,
  ): Promise<BlockchainBalance>;
}
