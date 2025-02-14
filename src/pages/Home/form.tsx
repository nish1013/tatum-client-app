import React, { useState } from "react";
import { getBalance } from "../../services/tatumService";
import { isValidBlockchainAddress } from "../../services/validators/addressValidator";
import { Network } from "@tatumio/tatum";
import { ChainAsset } from "../../constants/chain-asset";
import { formatNetworkName } from "../../utils/text-util";

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [network, setNetwork] = useState<Network>(Network.ETHEREUM_SEPOLIA);
  const [labelText, setLabelText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    if (!isValidBlockchainAddress(inputValue, network)) {
      setLabelText(`Invalid address for ${formatNetworkName(network)}`);
      return;
    }

    setLoading(true);
    setLabelText("Fetching balance...");

    try {
      const balance = await getBalance(network, inputValue, ChainAsset.ETH);
      setLabelText(`Balance: ${balance} ${network === Network.BITCOIN ? "BTC" : "ETH"}`);
    } catch (error) {
      setLabelText("Error fetching balance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">

      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
        {/* Dropdown to Select Network */}
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value as Network)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
        >
          {Object.values(Network).map((net) => (
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