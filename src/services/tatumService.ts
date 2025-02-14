import { Network, TatumSDK, ITatumSdkChain, TatumConfig, Ethereum, Status } from "@tatumio/tatum";
import { ChainAsset } from '../constants/chain-asset';

/**
 * Retrieves the appropriate API key based on the selected network.
 */
const getApiKeyForNetwork = (network: Network): string => {
  const envVarName = `VITE_TATUM_${network.toUpperCase().replace(/-/g, "_")}_API_KEY`;
  const apiKey = import.meta.env[envVarName];

  if (!apiKey) {
    throw new Error(`Missing API key for network: ${network}`);
  }

  return apiKey;
};

/**
 * Initialize Tatum SDK with the given blockchain network.
 */
export const getTatumInstance = async <T extends ITatumSdkChain = Ethereum>(network: Network): Promise<T> => {
  return await TatumSDK.init<T>({
    network,
    apiKey: { v4: getApiKeyForNetwork(network) },
    verbose: true,
  } as TatumConfig);
};


/**
 * Fetch the balance of a given asset (e.g., ETH, MATIC, BTC) on any supported network.
 */
export const getBalance = async (network: Network, address: string, asset: ChainAsset = ChainAsset.ETH): Promise<string> => {
  try {
    const tatum = await getTatumInstance(network);
    const balance = await tatum.address.getBalance({ addresses: [address] });
    console.log(`Fetched ${asset} balance on ${network}:`, balance);

    if (!balance?.data?.length || balance?.status !== Status.SUCCESS) {
      // TODO: improve error message
      throw new Error(`Failed to fetch ${asset} balance.`);
    }

    const balanceData = balance?.data?.find(item => item.asset === asset);

    return balanceData ? balanceData.balance : "0.00";
  } catch (error) {
    console.error(`Error fetching ${asset} balance on ${network}:`, error);
    throw new Error(`Failed to fetch ${asset} balance.`);
  }
};
