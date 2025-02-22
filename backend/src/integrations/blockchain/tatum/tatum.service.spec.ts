import { Test, TestingModule } from '@nestjs/testing';
import { TatumService } from './tatum.service';
import { Ethereum, ITatumSdkChain, Network, TatumSDK } from '@tatumio/tatum';

jest.mock('@tatumio/tatum', () => ({
  ...jest.requireActual('@tatumio/tatum'),
  TatumSDK: {
    init: jest.fn(),
  },
}));

describe('TatumService', () => {
  let service: TatumService;

  beforeEach(async () => {
    // Set environment variable before each test
    process.env.TATUM_ETHEREUM_MAINNET_API_KEY = 'test-api-key';

    const module: TestingModule = await Test.createTestingModule({
      providers: [TatumService],
    }).compile();

    service = module.get<TatumService>(TatumService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    delete process.env.TATUM_ETHEREUM_MAINNET_API_KEY;
  });

  describe('getApiKeyForNetwork', () => {
    it('should return the API key for the given network', () => {
      const apiKey = service.getApiKeyForNetwork(Network.ETHEREUM);
      expect(apiKey).toBe('test-api-key');
    });

    it('should throw an error if the API key is missing', () => {
      delete process.env.TATUM_ETHEREUM_MAINNET_API_KEY;
      expect(() => service.getApiKeyForNetwork(Network.ETHEREUM)).toThrow(
        'Missing API key for network: ethereum',
      );
    });
  });

  describe('getTatumInstance', () => {
    it('should return a Tatum instance for a given network', async () => {
      const mockTatumInstance: ITatumSdkChain = {
        address: { getBalance: jest.fn() },
      } as unknown as ITatumSdkChain;

      jest.spyOn(TatumSDK, 'init').mockResolvedValue(mockTatumInstance);

      const instance = await service.getTatumInstance<Ethereum>(
        Network.ETHEREUM,
      );
      expect(instance).toBeDefined();
      expect(TatumSDK.init).toHaveBeenCalledWith(
        expect.objectContaining({
          network: Network.ETHEREUM,
          apiKey: { v4: 'test-api-key' },
          verbose: true,
        }),
      );
    });

    it('should reuse an existing Tatum instance if available', async () => {
      const mockTatumInstance: ITatumSdkChain = {
        address: { getBalance: jest.fn() },
      } as unknown as ITatumSdkChain;

      service['tatumInstances'][Network.ETHEREUM] = mockTatumInstance;
      const instance = await service.getTatumInstance<Ethereum>(
        Network.ETHEREUM,
      );
      expect(instance).toBe(mockTatumInstance);
      expect(TatumSDK.init).not.toHaveBeenCalled();
    });

    it('should throw an error if API key is missing when initializing Tatum instance', async () => {
      delete process.env.TATUM_ETHEREUM_MAINNET_API_KEY;

      await expect(
        service.getTatumInstance<Ethereum>(Network.ETHEREUM),
      ).rejects.toThrow('Missing API key for network: ethereum');
    });
  });
});
