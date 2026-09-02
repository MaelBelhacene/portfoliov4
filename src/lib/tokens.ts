/**
 * Miroir littéral des tokens de `src/app/globals.css` pour les contextes
 * qui ne lisent pas le CSS : image Open Graph (Satori), manifeste web,
 * `themeColor` du viewport.
 *
 * Ne pas éditer à la main sans mettre à jour globals.css :
 * `src/lib/tokens.test.ts` vérifie la parité des deux fichiers.
 */
export const tokens = {
  surface: "#e9e8e4",
  "surface-alt": "#f6f5f2",
  "surface-inverse": "#1c1c1a",
  foreground: "#141413",
  muted: "#5c5b57",
  "on-inverse": "#f6f5f2",
  "on-inverse-muted": "#a6a49e",
  accent: "#b0301a",
  "on-inverse-accent": "#f0704f",
  "hairline-inverse": "#34342f",
} as const;

export type TokenName = keyof typeof tokens;
