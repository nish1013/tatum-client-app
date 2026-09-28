import { useRef, useState } from 'preact/hooks';
import {
  BlockchainNetwork,
  CHAIN_NETWORKS,
  formatNetworkName,
  getAsset,
  isValidBlockchainAddress,
} from '@lib/common';
import { getBalance } from '../../services/blockchainService';

interface IdleResult {
  kind: 'idle';
}

interface LoadingResult {
  kind: 'loading';
}

interface BalanceResult {
  kind: 'ok';
  balance: string;
  asset: string;
  network: BlockchainNetwork;
}

interface ErrorResult {
  kind: 'error';
  message: string;
}

type Chain = keyof typeof CHAIN_NETWORKS;

type Result = IdleResult | LoadingResult | BalanceResult | ErrorResult;

const FIELD =
  'mt-1 w-full rounded-lg border border-line bg-canvas p-3 text-base text-ink focus:border-accent focus:outline-none';

const chains = Object.keys(CHAIN_NETWORKS) as Chain[];

export function BalanceForm() {
  const [chain, setChain] = useState<Chain>(chains[0]);
  const [network, setNetwork] = useState<BlockchainNetwork>(
    CHAIN_NETWORKS[chains[0]][0]
  );
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<Result>({ kind: 'idle' });
  const requestId = useRef(0);

  const trimmed = address.trim();
  const isReady = isValidBlockchainAddress(trimmed, network);
  const loading = result.kind === 'loading';

  const reset = () => {
    requestId.current++;
    setResult({ kind: 'idle' });
  };

  const handleChain = (next: Chain) => {
    setChain(next);
    setNetwork(CHAIN_NETWORKS[next][0]);
    reset();
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!isReady || loading) return;

    const id = ++requestId.current;
    setResult({ kind: 'loading' });
    try {
      const asset = getAsset(network);
      const balance = await getBalance(network, trimmed, asset);
      if (id === requestId.current) {
        setResult({ kind: 'ok', balance, asset, network });
      }
    } catch {
      if (id === requestId.current) {
        setResult({
          kind: 'error',
          message: 'The balance could not be fetched. Try again in a moment.',
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="w-full rounded-2xl border border-line bg-surface p-6 text-left shadow-xl"
    >
      <label for="chain" class="text-sm font-medium text-muted">
        Chain
      </label>
      <select
        id="chain"
        value={chain}
        onChange={(e) => handleChain(e.currentTarget.value as Chain)}
        class={FIELD}
      >
        {chains.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label for="network" class="mt-4 block text-sm font-medium text-muted">
        Network
      </label>
      <select
        id="network"
        value={network}
        onChange={(e) => {
          setNetwork(e.currentTarget.value as BlockchainNetwork);
          reset();
        }}
        class={FIELD}
      >
        {CHAIN_NETWORKS[chain].map((net) => (
          <option key={net} value={net}>
            {formatNetworkName(net)}
          </option>
        ))}
      </select>

      <label for="address" class="mt-4 block text-sm font-medium text-muted">
        Wallet address
      </label>
      <input
        id="address"
        type="text"
        value={address}
        onInput={(e) => {
          setAddress(e.currentTarget.value);
          reset();
        }}
        placeholder="0x…"
        autoComplete="off"
        spellcheck={false}
        class={`${FIELD} font-mono`}
      />
      {trimmed && !isReady && (
        <p class="mt-2 text-sm text-muted">
          An address is 0x followed by 40 hex characters.
        </p>
      )}

      <button
        type="submit"
        disabled={!isReady || loading}
        class="mt-5 w-full rounded-lg bg-accent p-3 font-semibold text-on-accent hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? 'Checking…' : 'Get balance'}
      </button>

      <div aria-live="polite" class="mt-5 min-h-16">
        {result.kind === 'ok' && (
          <div class="rounded-lg border border-line bg-canvas p-4">
            <p class="text-sm text-muted">
              Balance on {formatNetworkName(result.network)}
            </p>
            <p class="mt-1 break-all font-mono text-2xl text-ink">
              {result.balance}{' '}
              <span class="text-accent-text">{result.asset}</span>
            </p>
          </div>
        )}
        {result.kind === 'error' && (
          <p class="text-sm text-danger">{result.message}</p>
        )}
      </div>
    </form>
  );
}
