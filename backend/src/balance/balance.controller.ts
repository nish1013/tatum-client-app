import { Controller, Get, Query } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { Network } from '@tatumio/tatum';
import { BadRequestException } from '@nestjs/common';
import { isValidBlockchainAddress } from '../validators/address-validator';
import { BalanceDto } from './models/balance.dto';

@Controller({
  path: 'balance',
  version: '1',
})
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getBalance(
    @Query('network') network: Network,
    @Query('address') address: string,
  ): Promise<BalanceDto> {
    // Validate network is a valid enum value
    if (!Object.values(Network).includes(network)) {
      throw new BadRequestException(`Invalid network: ${network}`);
    }

    // Validate address based on the selected network
    if (!isValidBlockchainAddress(address, network)) {
      throw new BadRequestException(`Invalid address for ${network}`);
    }

    // Fetch balance
    return {
      balance: await this.balanceService.getBalance(
        network as Network,
        address,
      ),
    };
  }
}
