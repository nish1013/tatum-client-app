import { describe, expect, it } from 'vitest';
import { nextTheme, readStoredTheme, resolveTheme } from '../theme.util';

describe('resolveTheme', () => {
  it.each([
    ['system', true, 'dark'],
    ['system', false, 'light'],
    ['light', true, 'light'],
    ['dark', false, 'dark'],
  ] as const)(
    '%s with a dark device = %s -> %s',
    (theme, prefersDark, resolved) => {
      expect(resolveTheme(theme, prefersDark)).toBe(resolved);
    }
  );
});

describe('nextTheme', () => {
  it('cycles dark, light, auto, dark', () => {
    expect([
      nextTheme('dark'),
      nextTheme('light'),
      nextTheme('system'),
    ]).toEqual(['light', 'system', 'dark']);
  });
});

describe('readStoredTheme', () => {
  it.each([
    ['dark', 'dark'],
    ['light', 'light'],
    ['system', 'system'],
    [null, 'dark'],
    ['', 'dark'],
    ['Light', 'dark'],
    ['purple', 'dark'],
  ])('reads %s as %s', (raw, theme) => {
    expect(readStoredTheme(raw)).toBe(theme);
  });
});
