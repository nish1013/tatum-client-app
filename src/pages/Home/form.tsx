import React, { useState } from "react";
import { getBalance } from "../../services/tatumService";
import { isValidBlockchainAddress } from "../../services/validators/addressValidator";
import { Network } from "@tatumio/tatum";
import { ChainAsset } from "../../constants/chain-asset";

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [labelText, setLabelText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    if (!isValidBlockchainAddress(inputValue, Network.ETHEREUM_SEPOLIA)) {
      setLabelText("Invalid Ethereum address.");
      return;
    }

    setLoading(true);
    setLabelText("Fetching balance...");

    try {
      const balance = await getBalance(Network.ETHEREUM_SEPOLIA, inputValue, ChainAsset.ETH);
      setLabelText(`Balance: ${balance} ETH`);
    } catch (error) {
      setLabelText("Error fetching balance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter Ethereum wallet address"
        className="input-box"
      />

      <button onClick={handleButtonClick} disabled={loading} className="button">
        {loading ? "Fetching..." : "Get Balance"}
      </button>

      <p className="result">{labelText}</p>
    </div>
  );
}

export default Form;
