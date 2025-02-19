import { getAsset } from '../chain-util';
import { Network } from '@tatumio/tatum';
import { ChainAsset } from '../../constants/chain-asset';

describe('getAsset', () => {
  it('should return ETH for Network.ETHEREUM', () => {
    expect(getAsset(Network.ETHEREUM)).toBe(ChainAsset.ETH);
  });

  it('should return ETH for Network.ETHEREUM_SEPOLIA', () => {
    expect(getAsset(Network.ETHEREUM_SEPOLIA)).toBe(ChainAsset.ETH);
  });

  it('should throw an error for unsupported networks', () => {
    expect(() => getAsset(Network.BITCOIN)).toThrow(
      'Network bitcoin-mainnet is not supported.'
    );
  });
});
