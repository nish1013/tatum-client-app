import React, { useState, useEffect } from "react";
import { getBalance } from "../../services/tatumService";
import { isValidBlockchainAddress } from "../../../../lib/common/src/validators/address-validator";
import { Network } from "@tatumio/tatum";
import { formatNetworkName, CHAIN_NETWORKS, getAsset } from "../../../../lib/common/src";

function Form() {
  const [inputValue, setInputValue] = useState("");
  const chains = Object.keys(CHAIN_NETWORKS);
  const [selectedChain, setSelectedChain] = useState(chains[0]); // Default to first chain
  const [network, setNetwork] = useState(CHAIN_NETWORKS[selectedChain][0]); // Default to first network
  const [labelText, setLabelText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false); // Tracks form readiness

  // Handle chain selection and update networks
  const handleChainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newChain = (e.target as HTMLSelectElement).value;
    setSelectedChain(newChain);
    setNetwork(CHAIN_NETWORKS[newChain][0]); // Default to first network of selected chain
  };

  // Check if the form is ready (valid address & selected network)
  useEffect(() => {
    setIsFormReady(isValidBlockchainAddress(inputValue, network));
  }, [inputValue, network]);

  const handleButtonClick = async () => {
    if (!isValidBlockchainAddress(inputValue, network)) {
      setLabelText(`Invalid address for ${formatNetworkName(network)}`);
      setIsError(true);
      return;
    }

    setLoading(true);
    setIsError(false);
    setLabelText("Fetching balance...");

    try {
      const balance = await getBalance(network, inputValue, getAsset(network));
      setLabelText(`Balance: ${balance}`);
      setIsError(false);
    } catch (error) {
      setLabelText("Error fetching balance.");
      setIsError(true);
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
          onChange={(e) => setNetwork((e.target as HTMLSelectElement).value as Network)}
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
          onChange={(e) => setInputValue((e.target as HTMLSelectElement).value)}
          placeholder={`Enter ${formatNetworkName(network)} wallet address`}
          className="w-full p-3 mt-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
        />

        {/* Fetch Balance Button (Disabled until form is ready) */}
        <button
          onClick={handleButtonClick}
          disabled={!isFormReady || loading}
          className={`w-full mt-3 p-3 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 ${
            isFormReady && !loading
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {loading ? "Fetching..." : "Get Balance"}
        </button>

        {/* Display Balance/Error Message */}
        <p className={`mt-4 text-center text-lg font-semibold shadow-md ${isError ? "text-red-500" : "text-green-400"}`}>
          {labelText}
        </p>
      </div>
    </div>
  );
}

export default Form;
