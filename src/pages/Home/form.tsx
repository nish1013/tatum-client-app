import React, { useState } from "react";
import { getBalance } from "../../services/tatumService";
import { isValidBlockchainAddress } from "../../services/validators/addressValidator";
import { Network } from "@tatumio/tatum";
import { ChainAsset } from "../../constants/chain-asset";
import { formatNetworkName } from '../../utils/text-util';

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [network, setNetwork] = useState<Network>(Network.ETHEREUM_SEPOLIA); // Default network
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
    <div className="form-container">
      {/* Dropdown to Select Network */}
      <select
        value={network}
        onChange={(e) => setNetwork(e.target.value as Network)}
        className="select-box"
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
        className="input-box"
      />

      {/* Fetch Balance Button */}
      <button onClick={handleButtonClick} disabled={loading} className="button">
        {loading ? "Fetching..." : "Get Balance"}
      </button>

      {/* Display Balance */}
      <p className="result">{labelText}</p>
    </div>
  );
}

export default Form;
