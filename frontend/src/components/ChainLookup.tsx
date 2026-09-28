const BLOCK_COUNT = 5;

export function ChainLookup() {
  return (
    <figure
      class="chain-lookup"
      aria-label="An address is looked up on the Ethereum chain and its ETH balance comes back"
    >
      <div class="chain-card">
        <span class="chain-label">Address · Sepolia</span>
        <code class="chain-value">0x71C7…976F</code>
      </div>

      <div class="chain-track" aria-hidden="true">
        {Array.from({ length: BLOCK_COUNT }, (_, i) => (
          <span key={i} class="chain-block" />
        ))}
        <span class="chain-pulse" />
      </div>

      <div class="chain-card">
        <span class="chain-label">Balance</span>
        <span class="chain-value">
          1.25 <span class="text-accent-text">ETH</span>
        </span>
      </div>
    </figure>
  );
}
