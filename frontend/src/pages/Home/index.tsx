import { ChainLookup } from '../../components/ChainLookup';

export function Home() {
  return (
    <section class="flex flex-col items-center py-12 text-center sm:py-20">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
        Ethereum · Mainnet and Sepolia
      </p>
      <h1 class="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Check any Ethereum wallet's balance.
      </h1>

      <div class="mt-12 w-full">
        <ChainLookup />
      </div>

      <p class="mt-12 max-w-xl text-lg text-muted">
        Paste a public address and pick a network. The app asks an Ethereum node
        for the balance and shows it in ETH. No wallet to connect, nothing to
        sign.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="/check"
          class="rounded-lg bg-accent px-5 py-3 font-semibold text-on-accent hover:opacity-90"
        >
          Check a balance
        </a>
        <a
          href="/how-it-works"
          class="rounded-lg border border-line px-5 py-3 font-semibold text-ink hover:border-accent"
        >
          How it works
        </a>
      </div>
    </section>
  );
}
