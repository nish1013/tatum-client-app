import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";
import { ChainAsset } from './constants/chain-asset';

/**
 * Initialize Tatum SDK with a given blockchain network.
 */
export const getTatumInstance = async (network: Network) => {
  return await TatumSDK.init<Ethereum>({
    network,
    apiKey: { v4: import.meta.env.VITE_TATUM_API_KEY },
    verbose: true,
  });
};

/**
 * Fetch the balance of a given asset (e.g., ETH, MATIC, BTC) on any supported network.
 */
export const getBalance = async (network: Network, address: string, asset: ChainAsset = ChainAsset.ETH): Promise<string> => {
  try {
    const tatum = await getTatumInstance(network);
    const balance = await tatum.address.getBalance({ addresses: [address] });

    const balanceData = balance.data.find(item => item.asset === asset);

    return balanceData ? balanceData.balance : "0.00";
  } catch (error) {
    console.error(`Error fetching ${asset} balance on ${network}:`, error);
    throw new Error(`Failed to fetch ${asset} balance.`);
  }
};
