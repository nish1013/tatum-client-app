import { Network } from '@tatumio/tatum';

export const BlockchainNetwork = {
  ...Network,
} as const;

export type BlockchainNetwork =
  (typeof BlockchainNetwork)[keyof typeof BlockchainNetwork];
