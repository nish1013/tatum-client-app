import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainServiceFactory } from './blockchain.service.factory';
import { TatumService } from '../../integrations';
import { BlockchainProvider } from './blockchain.provider';
import { BlockchainService } from './services/blockchain.service';

describe('BlockchainServiceFactory', () => {
  let factory: BlockchainServiceFactory;
  let tatumService: jest.Mocked<BlockchainService>;

  beforeEach(async () => {
    const mockTatumService: Partial<BlockchainService> = {
      getBalance: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockchainServiceFactory,
        {
          provide: TatumService,
          useValue: mockTatumService,
        },
      ],
    }).compile();

    factory = module.get<BlockchainServiceFactory>(BlockchainServiceFactory);
    tatumService = module.get(TatumService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.BLOCKCHAIN_PROVIDER;
  });

  it('should return TatumService when provider is explicitly TATUM', () => {
    const service = factory.create(BlockchainProvider.TATUM);
    expect(service).toBe(tatumService);
  });

  it('should return TatumService when no provider is specified and env is set to TATUM', () => {
    process.env.BLOCKCHAIN_PROVIDER = BlockchainProvider.TATUM;
    const service = factory.create();
    expect(service).toBe(tatumService);
  });

  it('should default to TatumService if no provider or env is set', () => {
    const service = factory.create();
    expect(service).toBe(tatumService);
  });

  it('should throw an error for unsupported providers', () => {
    expect(() => factory.create('unsupported' as BlockchainProvider)).toThrow(
      'Unsupported blockchain provider: unsupported',
    );
  });

  it('should log the selected provider', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    factory.create(BlockchainProvider.TATUM);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Selected blockchain provider: TATUM',
    );
    consoleSpy.mockRestore();
  });
});
