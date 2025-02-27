import { Injectable, Inject, Logger } from '@nestjs/common';
import { TatumService } from '../../integrations';
import { BlockchainProvider } from './blockchain.provider';
import { BlockchainService } from './services/blockchain.service';

@Injectable()
export class BlockchainServiceFactory {
  private readonly logger = new Logger(BlockchainServiceFactory.name);

  constructor(private readonly tatumService: TatumService) {}

  public create(provider?: BlockchainProvider): BlockchainService {
    const selectedProvider =
      provider || process.env.BLOCKCHAIN_PROVIDER || BlockchainProvider.TATUM;

    this.logger.log(`Selected blockchain provider: ${selectedProvider}`);

    switch (selectedProvider) {
      case BlockchainProvider.TATUM:
        return this.tatumService;
      default:
        throw new Error(`Unsupported blockchain provider: ${selectedProvider}`);
    }
  }
}
