import { useTheme } from '../lib/theme/useTheme';
import { nextTheme } from '../lib/theme/theme.util';
import type { Theme } from '../lib/theme/theme.types';

interface ThemeIconProps {
  theme: Theme;
}

const LABEL: Record<Theme, string> = {
  dark: 'Dark',
  light: 'Light',
  system: 'Auto (matches your device)',
};

const ICON = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 1.7,
  'stroke-linecap': 'round' as const,
  'stroke-linejoin': 'round' as const,
  'aria-hidden': true,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme(theme))}
      aria-label={`Theme: ${LABEL[theme]}. Tap to change.`}
      title={LABEL[theme]}
      class="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted hover:border-accent hover:text-ink"
    >
      <ThemeIcon theme={theme} />
    </button>
  );
}

function ThemeIcon({ theme }: ThemeIconProps) {
  if (theme === 'dark') {
    return (
      <svg {...ICON}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    );
  }
  if (theme === 'light') {
    return (
      <svg {...ICON}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  return (
    <svg {...ICON}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
