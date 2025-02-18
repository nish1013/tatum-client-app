import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { BadRequestException } from '@nestjs/common';
import { Network } from '@tatumio/tatum';

describe('BalanceController', () => {
  let balanceController: BalanceController;
  let balanceService: BalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [
        {
          provide: BalanceService,
          useValue: {
            getBalance: jest.fn().mockResolvedValue('100.00'), // Mock balance service
          },
        },
      ],
    }).compile();

    balanceController = module.get<BalanceController>(BalanceController);
    balanceService = module.get<BalanceService>(BalanceService);
  });

  it('should return balance when valid params are provided', async () => {
    const network = Network.ETHEREUM;
    const address = '0x1234567890123456789012345678901234567890';

    const result = await balanceController.getBalance(network, address);

    expect(result).toEqual({ balance: '100.00' });
    expect(balanceService.getBalance).toHaveBeenCalledWith(network, address);
  });

  it('should throw BadRequestException for an invalid network', async () => {
    await expect(
      balanceController.getBalance(Network.ETHEREUM, 'invalid-address'),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException for an invalid address', async () => {
    await expect(
      balanceController.getBalance(Network.ETHEREUM, 'invalid-address'),
    ).rejects.toThrow(BadRequestException);
  });
});
