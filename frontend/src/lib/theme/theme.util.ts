import type { ResolvedTheme, Theme } from './theme.types';

export const THEME_STORAGE_KEY = 'theme';

export const DEFAULT_THEME: Theme = 'dark';

export function nextTheme(current: Theme): Theme {
  if (current === 'dark') return 'light';
  if (current === 'light') return 'system';
  return 'dark';
}

export function resolveTheme(
  theme: Theme,
  prefersDark: boolean
): ResolvedTheme {
  if (theme === 'system') return prefersDark ? 'dark' : 'light';
  return theme;
}

export function readStoredTheme(raw: string | null): Theme {
  return raw === 'dark' || raw === 'light' || raw === 'system'
    ? raw
    : DEFAULT_THEME;
}
