import { Module } from '@nestjs/common';
import { BalanceModule } from './balance/balance.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BalanceModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env available everywhere
    }),
  ],
})
export class AppModule {}
