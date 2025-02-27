import { Test, TestingModule } from '@nestjs/testing';
import { TatumService } from './tatum.service';
import { ITatumSdkChain, Network, TatumSDK } from '@tatumio/tatum';
import { BlockchainBalance } from '../../../core';
import BigNumber from 'bignumber.js';

jest.mock('@tatumio/tatum', () => ({
  ...jest.requireActual('@tatumio/tatum'),
  TatumSDK: {
    init: jest.fn(),
  },
}));

describe('TatumService', () => {
  let service: TatumService;
  const mockTatumInstance = {
    address: {
      getBalance: jest.fn(),
    },
  };

  beforeEach(async () => {
    process.env.TATUM_ETHEREUM_MAINNET_API_KEY = 'test-api-key';

    (TatumSDK.init as jest.Mock).mockResolvedValue(mockTatumInstance);

    const module: TestingModule = await Test.createTestingModule({
      providers: [TatumService],
    }).compile();

    service = module.get<TatumService>(TatumService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.TATUM_ETHEREUM_MAINNET_API_KEY;
  });

  describe('getBalance', () => {
    it('should return balance for a valid address', async () => {
      mockTatumInstance.address.getBalance.mockResolvedValue({
        data: [{ asset: 'ETH', balance: '100.50' }],
      });

      const balance: BlockchainBalance = await service.getBalance(
        Network.ETHEREUM,
        '0x1234567890abcdef',
      );

      expect(balance).toEqual({ balance: new BigNumber('100.50') });
      expect(mockTatumInstance.address.getBalance).toHaveBeenCalledWith({
        addresses: ['0x1234567890abcdef'],
      });
    });

    it('should return 0.00 if no matching asset is found', async () => {
      mockTatumInstance.address.getBalance.mockResolvedValue({
        data: [{ asset: 'BTC', balance: '5.00' }],
      });

      const balance: BlockchainBalance = await service.getBalance(
        Network.ETHEREUM,
        '0x1234567890abcdef',
      );

      expect(balance).toEqual({ balance: new BigNumber('0.00') });
    });

    it('should throw an error if the balance fetch fails', async () => {
      mockTatumInstance.address.getBalance.mockRejectedValue(
        new Error('API Error'),
      );

      await expect(
        service.getBalance(Network.ETHEREUM, '0x1234567890abcdef'),
      ).rejects.toThrow('Failed to fetch balance.');
    });

    it('should throw an error if API key is missing', async () => {
      delete process.env.TATUM_ETHEREUM_MAINNET_API_KEY;

      await expect(
        service.getBalance(Network.ETHEREUM, '0x1234567890abcdef'),
      ).rejects.toThrow('Missing API key for network: ethereum-mainnet');
    });
  });
});
