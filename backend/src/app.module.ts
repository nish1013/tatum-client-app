import { Module } from '@nestjs/common';
import { BalanceModule } from './balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    BalanceModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env available everywhere
    }),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.THROTTLER_TTL) || 60000, // in milliseconds
        limit: Number(process.env.THROTTLER_LIMIT) || 5, // requests within the TTL
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Apply Throttler Guard globally
    },
  ],
})
export class AppModule {}
