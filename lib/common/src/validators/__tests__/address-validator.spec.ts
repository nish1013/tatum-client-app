import { isValidBlockchainAddress } from '../address-validator';
import { Network } from '@tatumio/tatum';

describe('Address Validator', () => {
  it('should validate a valid Ethereum address', () => {
    const validAddress = '0x16bb371d2B5BEC9AeFbA525E583b4109E93EE62b';
    expect(isValidBlockchainAddress(validAddress, Network.ETHEREUM)).toBe(true);
  });

  it('should reject an invalid Ethereum address', () => {
    const invalidAddress = 'invalid-address';
    expect(isValidBlockchainAddress(invalidAddress, Network.ETHEREUM)).toBe(
      false
    );
  });
});
