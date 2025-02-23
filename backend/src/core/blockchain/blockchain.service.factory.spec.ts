import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainServiceFactory } from './blockchain.service.factory';
import { TatumService } from '../../integrations';
import { BlockchainProvider } from './blockchain.provider';

describe('BlockchainServiceFactory', () => {
  let factory: BlockchainServiceFactory;
  let tatumService: TatumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TatumService,
        BlockchainServiceFactory,
        {
          provide: 'BLOCKCHAIN_SERVICE',
          useClass: TatumService,
        },
      ],
    }).compile();

    factory = module.get<BlockchainServiceFactory>(BlockchainServiceFactory);
    tatumService = module.get<TatumService>(TatumService);
  });

  it('should return TatumService when provider is TATUM', () => {
    const service = factory.create(BlockchainProvider.TATUM);
    expect(service).toBe(tatumService);
  });

  it('should throw error for unsupported providers', () => {
    expect(() =>
      factory.create('unsupported' as BlockchainProvider),
    ).toThrow('Unsupported blockchain provider: unsupported');
  });
});
