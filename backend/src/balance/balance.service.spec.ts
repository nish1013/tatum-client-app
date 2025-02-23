import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { BlockchainServiceFactory } from '../core/blockchain/blockchain.service.factory';
import { BlockchainService } from '../core';
import { Network } from '@tatumio/tatum';
import { BlockchainBalance } from '../core/blockchain/interfaces/blockchain.balance';
import BigNumber from 'bignumber.js';

describe('BalanceService', () => {
  let service: BalanceService;
  let factory: BlockchainServiceFactory;
  let mockBlockchainService: BlockchainService;

  beforeEach(async () => {
    mockBlockchainService = {
      getBalance: jest.fn(),
    } as unknown as BlockchainService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        {
          provide: BlockchainServiceFactory,
          useValue: {
            create: jest.fn().mockReturnValue(mockBlockchainService),
          },
        },
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    factory = module.get<BlockchainServiceFactory>(BlockchainServiceFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    it('should return the correct balance when API response is valid', async () => {
      (mockBlockchainService.getBalance as jest.Mock).mockResolvedValue({
        balance: new BigNumber('0.003634865693567631'),
      } as BlockchainBalance);

      const balance = await service.getBalance(
        Network.ETHEREUM,
        '0x1234567890abcdef',
      );

      expect(balance).toBe('0.003634865693567631');
      expect(mockBlockchainService.getBalance).toHaveBeenCalledWith(
        Network.ETHEREUM,
        '0x1234567890abcdef',
      );
    });

    it('should return "0" if no balance is found', async () => {
      (mockBlockchainService.getBalance as jest.Mock).mockResolvedValue({
        balance: new BigNumber('0'),
      } as BlockchainBalance);

      const balance = await service.getBalance(
        Network.ETHEREUM,
        '0x1234567890abcdef',
      );

      expect(balance).toBe('0');
    });

    it('should throw an error if the API call fails', async () => {
      (mockBlockchainService.getBalance as jest.Mock).mockRejectedValue(
        new Error('API Error'),
      );

      await expect(
        service.getBalance(Network.ETHEREUM, '0x1234567890abcdef'),
      ).rejects.toThrow('Failed to fetch balance.');
    });
  });
});
