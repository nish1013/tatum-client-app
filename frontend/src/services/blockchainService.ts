import { ChainAsset, BlockchainNetwork } from '@lib/common';

/**
 * Fetch the balance of a given asset (e.g., ETH, MATIC, BTC) on any supported network by calling the backend API.
 */
export const getBalance = async (
  network: BlockchainNetwork,
  address: string,
  asset: ChainAsset = ChainAsset.ETH
): Promise<string> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_API
      }/v1/balance?network=${network}&address=${address}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${asset} balance. HTTP Status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data?.balance) {
      throw new Error(`No balance returned for ${asset} on ${network}.`);
    }

    console.log(`Fetched ${asset} balance on ${network}:`, data.balance);
    return data.balance;
  } catch (error) {
    console.error(
      `Error fetching ${asset} balance from backend on ${network}:`,
      error
    );
    throw new Error(`Failed to fetch ${asset} balance.`);
  }
};
