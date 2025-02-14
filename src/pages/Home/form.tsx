import React, { useState } from "react";
import { getBalance } from "../../services/tatumService";
import { isValidBlockchainAddress } from "../../services/validators/addressValidator";
import { Network } from "@tatumio/tatum";
import { ChainAsset } from "../../constants/chain-asset";
import { formatNetworkName } from "../../utils/text-util";
import { CHAIN_NETWORKS } from '../../constants/chain-map';

function Form() {
  const [inputValue, setInputValue] = useState("");
  const chains = Object.keys(CHAIN_NETWORKS);
  const [selectedChain, setSelectedChain] = useState(chains[0]); // Default to first chain
  const [network, setNetwork] = useState(CHAIN_NETWORKS[selectedChain][0]); // Default to first network
  const [labelText, setLabelText] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle chain selection and update networks
  const handleChainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newChain = e.target.value;
    setSelectedChain(newChain);
    setNetwork(CHAIN_NETWORKS[newChain][0]); // Default to first network of selected chain
  };

  const handleButtonClick = async () => {
    if (!isValidBlockchainAddress(inputValue, network)) {
      setLabelText(`Invalid address for ${formatNetworkName(network)}`);
      return;
    }

    setLoading(true);
    setLabelText("Fetching balance...");

    try {
      const balance = await getBalance(network, inputValue, ChainAsset.ETH);
      setLabelText(`Balance: ${balance} ${network.includes("BITCOIN") ? "BTC" : "ETH"}`);
    } catch (error) {
      setLabelText("Error fetching balance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
        {/* Chain Selection */}
        <label className="text-sm font-semibold text-gray-400">Select Chain</label>
        <select
          value={selectedChain}
          onChange={handleChainChange}
          className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
        >
          {chains.map((chain) => (
            <option key={chain} value={chain}>
              {chain}
            </option>
          ))}
        </select>

        {/* Network Selection */}
        <label className="text-sm font-semibold text-gray-400 mt-3 block">Select Network</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value as Network)}
          className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
        >
          {CHAIN_NETWORKS[selectedChain].map((net) => (
            <option key={net} value={net}>
              {formatNetworkName(net)}
            </option>
          ))}
        </select>

        {/* Input Field for Address */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Enter ${formatNetworkName(network)} wallet address`}
          className="w-full p-3 mt-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
        />

        {/* Fetch Balance Button */}
        <button
          onClick={handleButtonClick}
          disabled={loading}
          className="w-full mt-3 p-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 disabled:bg-gray-600"
        >
          {loading ? "Fetching..." : "Get Balance"}
        </button>

        {/* Display Balance */}
        <p className="mt-4 text-center text-lg font-semibold text-green-400 shadow-md">{labelText}</p>
      </div>
    </div>
  );
}

export default Form;
