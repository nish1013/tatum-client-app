import { Module } from '@nestjs/common';
import { TatumService } from '../../integrations';
import { BlockchainServiceFactory } from './blockchain.service.factory';

@Module({
  providers: [TatumService, BlockchainServiceFactory],
  exports: [TatumService, BlockchainServiceFactory],
})
export class BlockchainModule {}
