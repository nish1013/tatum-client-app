import { useEffect, useState } from 'preact/hooks';
import type { Theme } from './theme.types';
import {
  DEFAULT_THEME,
  readStoredTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
} from './theme.util';

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function useTheme(): ThemeState {
  const [theme, setThemeState] = useState<Theme>(readTheme);

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(
        theme,
        media.matches
      );
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme]);

  const setTheme = (next: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the choice then lasts for this page only.
    }
    setThemeState(next);
  };

  return { theme, setTheme };
}

function readTheme(): Theme {
  try {
    return readStoredTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return DEFAULT_THEME;
  }
}
