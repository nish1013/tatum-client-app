import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { BadRequestException } from '@nestjs/common';
import { BlockchainNetwork } from '@lib/common';
import BigNumber from 'bignumber.js';
import { BlockchainBalance } from '../core/blockchain/interfaces/blockchain.balance';

describe('BalanceController', () => {
  let balanceController: BalanceController;
  let balanceService: BalanceService;

  beforeEach(async () => {
    const mockBalance: BlockchainBalance = { balance: new BigNumber('100') };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [
        {
          provide: BalanceService,
          useValue: {
            getBalance: jest.fn().mockResolvedValue(mockBalance),
          },
        },
      ],
    }).compile();

    balanceController = module.get<BalanceController>(BalanceController);
    balanceService = module.get<BalanceService>(BalanceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    it('should return balance when valid params are provided', async () => {
      const network = BlockchainNetwork.ETHEREUM;
      const address = '0x1234567890123456789012345678901234567890';

      const result = await balanceController.getBalance(network, address);

      expect(result).toEqual({ balance: '100' });
      expect(balanceService.getBalance).toHaveBeenCalledWith(network, address);
    });

    it('should throw BadRequestException for an invalid network', async () => {
      const invalidNetwork = 'invalid-network' as BlockchainNetwork;
      const address = '0x1234567890123456789012345678901234567890';

      await expect(
        balanceController.getBalance(invalidNetwork, address),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for an invalid address', async () => {
      const network = BlockchainNetwork.ETHEREUM;
      const invalidAddress = 'invalid-address';

      await expect(
        balanceController.getBalance(network, invalidAddress),
      ).rejects.toThrow(BadRequestException);
    });

    it('should handle service errors gracefully', async () => {
      jest
        .spyOn(balanceService, 'getBalance')
        .mockRejectedValue(new Error('Service error'));

      const network = BlockchainNetwork.ETHEREUM;
      const address = '0x1234567890123456789012345678901234567890';

      await expect(
        balanceController.getBalance(network, address),
      ).rejects.toThrow('Service error');
    });
  });
});
