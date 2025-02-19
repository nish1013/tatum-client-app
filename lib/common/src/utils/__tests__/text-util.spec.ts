import { formatNetworkName } from '../text-util';

describe('formatNetworkName', () => {
  it('should format "ethereum-sepolia" as "Sepolia"', () => {
    expect(formatNetworkName('ethereum-sepolia')).toBe('Sepolia');
  });

  it('should format "bitcoin-mainnet" as "Mainnet"', () => {
    expect(formatNetworkName('bitcoin-mainnet')).toBe('Mainnet');
  });

  it('should capitalize a single word network', () => {
    expect(formatNetworkName('ethereum')).toBe('Ethereum');
  });

  it('should return an empty string for an empty input', () => {
    expect(formatNetworkName('')).toBe('');
  });

  it('should handle unexpected format gracefully', () => {
    expect(formatNetworkName('random')).toBe('Random');
  });
});
