import { useLocation } from 'preact-iso';
import { ThemeToggle } from './ThemeToggle';

interface NavLink {
  href: string;
  label: string;
}

const LINKS: NavLink[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/check', label: 'Check a balance' },
];

export function SiteHeader() {
  const { path } = useLocation();

  return (
    <header class="border-b border-line">
      <div class="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="/"
          class="flex items-center gap-2 text-xl font-semibold tracking-tight text-ink"
        >
          <img src="/icon.svg" alt="" width={26} height={26} />
          <span>
            Wallet<span class="text-accent-text">Balance</span>
          </span>
        </a>
        <nav class="flex items-center gap-1 text-sm" aria-label="Site">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={path === link.href ? 'page' : undefined}
              class="rounded-md px-3 py-2 text-muted hover:text-ink aria-[current=page]:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/nish1013/tatum-client-app"
            target="_blank"
            rel="noreferrer"
            class="rounded-md px-3 py-2 text-muted hover:text-ink"
          >
            Source
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
