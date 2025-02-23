import { Injectable, Inject } from '@nestjs/common';
import { TatumService } from '../../integrations';
import { BlockchainProvider } from './blockchain.provider';
import { BlockchainService } from './services/blockchain.service';

@Injectable()
export class BlockchainServiceFactory {
  constructor(
    @Inject(TatumService) private readonly tatumService: BlockchainService,
  ) {}

  create(provider: BlockchainProvider): BlockchainService {
    switch (provider) {
      case BlockchainProvider.TATUM:
        return this.tatumService;
      default:
        throw new Error(`Unsupported blockchain provider: ${provider}`);
    }
  }
}
