import { Injectable, Inject } from '@nestjs/common';
import { TatumService } from '../../integrations';
import { BlockchainProvider } from './blockchain.provider';
import { BlockchainService } from './services/blockchain.service';

@Injectable()
export class BlockchainServiceFactory {
  constructor(
    @Inject(TatumService) private readonly tatumService: BlockchainService,
  ) {}

  public create(provider?: BlockchainProvider): BlockchainService {
    const selectedProvider =
      provider || process.env.BLOCKCHAIN_PROVIDER || BlockchainProvider.TATUM;
    console.log(`Selected blockchain provider: ${selectedProvider}`);

    switch (selectedProvider) {
      case BlockchainProvider.TATUM:
        return this.tatumService;
      default:
        throw new Error(`Unsupported blockchain provider: ${provider}`);
    }
  }
}
