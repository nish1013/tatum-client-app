import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { TatumService } from '../integrations';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, TatumService],
})
export class BalanceModule {}
