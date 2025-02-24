import { Controller, Get, Query } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BadRequestException } from '@nestjs/common';
import { BalanceDto } from './models/balance.dto';
import { BlockchainNetwork, isValidBlockchainAddress } from '@lib/common';

@Controller({
  path: 'balance',
  version: '1',
})
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getBalance(
    @Query('network') network: BlockchainNetwork,
    @Query('address') address: string,
  ): Promise<BalanceDto> {
    // Validate network is a valid enum value
    if (!Object.values(BlockchainNetwork).includes(network)) {
      throw new BadRequestException(`Invalid network: ${network}`);
    }

    // Validate address based on the selected network
    if (!isValidBlockchainAddress(address, network)) {
      throw new BadRequestException(`Invalid address for ${network}`);
    }

    // Fetch balance
    const balance = await this.balanceService.getBalance(network, address);

    return { balance: balance.balance.toString() };
  }
}
