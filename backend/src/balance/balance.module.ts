import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { BlockchainModule } from '../core/blockchain/blockchain.module';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports: [BlockchainModule],
})
export class BalanceModule {}
