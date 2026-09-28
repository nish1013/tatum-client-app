const STEPS = [
  'You pick a network and paste a public wallet address.',
  'The page checks the address format before the button turns on.',
  'The server checks it again, then asks an Ethereum node for the balance.',
  'The balance comes back in ETH and is shown with its network.',
];

const RULES = [
  'Two networks: Ethereum mainnet and the Sepolia test network.',
  'An address is 0x followed by 40 hex characters. Anything else is refused, in the page and on the server.',
  'Only the native ETH balance is shown. Tokens and NFTs held by the address are not included.',
  'It is read-only. There is no wallet to connect and nothing to sign.',
];

const TRY = [
  'Choose Sepolia and paste any address from a Sepolia block explorer. Press Get balance.',
  'Delete one character from the address. The button turns off.',
  'Switch to Mainnet with the same address. A different balance comes back, because each network keeps its own.',
];

interface ListSectionProps {
  title: string;
  items: string[];
  ordered?: boolean;
}

export function HowItWorks() {
  return (
    <section class="mx-auto w-full max-w-2xl py-12">
      <h1 class="text-3xl font-semibold tracking-tight text-ink">
        How it works
      </h1>
      <ListSection title="The flow" items={STEPS} ordered />
      <ListSection title="The rules" items={RULES} />
      <ListSection title="Try it yourself" items={TRY} ordered />
      <a
        href="/check"
        class="mt-10 inline-block rounded-lg bg-accent px-5 py-3 font-semibold text-on-accent hover:opacity-90"
      >
        Check a balance
      </a>
    </section>
  );
}

function ListSection({ title, items, ordered }: ListSectionProps) {
  const List = ordered ? 'ol' : 'ul';
  return (
    <>
      <h2 class="mt-10 text-lg font-semibold text-ink">{title}</h2>
      <List
        class={`mt-3 space-y-2 pl-5 text-muted ${ordered ? 'list-decimal' : 'list-disc'}`}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </>
  );
}
