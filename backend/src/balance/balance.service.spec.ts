import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { TatumService } from '../integrations';
import { Network } from '@tatumio/tatum';
import { getAsset } from '@lib/common';

jest.mock('@tatumio/tatum');
jest.mock('@lib/common', () => ({
  getAsset: jest.fn(),
}));

describe('BalanceService', () => {
  let service: BalanceService;
  let tatumService: TatumService;
  let tatumInstance: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceService, TatumService],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    tatumService = module.get<TatumService>(TatumService);

    tatumInstance = {
      address: {
        getBalance: jest.fn(),
      },
    };

    jest
      .spyOn(tatumService, 'getTatumInstance')
      .mockResolvedValue(tatumInstance);

    (getAsset as jest.Mock).mockImplementation((network) => {
      return network === Network.ETHEREUM ? 'ETH' : 'BTC';
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    it('should return the correct balance when API response is valid', async () => {
      tatumInstance.address.getBalance.mockResolvedValue({
        data: [{ asset: 'ETH', balance: '100.50' }],
      });

      const balance = await service.getBalance(
        Network.ETHEREUM,
        '0x1234567890abcdef',
      );
      expect(balance).toBe('100.50');
      expect(tatumService.getTatumInstance).toHaveBeenCalledWith(
        Network.ETHEREUM,
      );
    });

    it('should return "0.00" if no matching asset is found', async () => {
      tatumInstance.address.getBalance.mockResolvedValue({
        data: [{ asset: 'BTC', balance: '5.00' }],
      });

      const balance = await service.getBalance(
        Network.ETHEREUM,
        '0x1234567890abcdef',
      );
      expect(balance).toBe('0.00');
    });

    it('should throw an error if the API call fails', async () => {
      tatumInstance.address.getBalance.mockRejectedValue(
        new Error('API Error'),
      );

      await expect(
        service.getBalance(Network.ETHEREUM, '0x1234567890abcdef'),
      ).rejects.toThrow('Failed to fetch balance.');
    });

    it('should call getAsset with the correct network', async () => {
      tatumInstance.address.getBalance.mockResolvedValue({
        data: [{ asset: 'ETH', balance: '100.50' }],
      });

      await service.getBalance(Network.ETHEREUM, '0x1234567890abcdef');
      expect(getAsset).toHaveBeenCalledWith(Network.ETHEREUM);
    });
  });
});
