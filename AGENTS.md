<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio v4 — règles du projet

- Lire `README.md` : stack, commandes, TODO avant mise en ligne.
- **Direction artistique « Norme »** : toute la DA vit dans le bloc `@theme` de
  `src/app/globals.css`. Aucune couleur en dur dans les composants ; utiliser les
  couleurs de ton (`text-ink`, `text-ink-muted`, `border-rule`, `text-mark`) qui
  suivent la bande courante. Les rares valeurs littérales sont dans
  `src/lib/tokens.ts`, vérifiées par `src/lib/tokens.test.ts`.
- **Interdit, non négociable** : toute esthétique hacker / terminal / Matrix
  (vert phosphore, scanlines, machine à écrire, glitch, néon, glow, police mono).
- Hiérarchie par la typographie et l’espace ; micro-interactions sobres
  (fondu, 12 px de translation maximum) ; `prefers-reduced-motion` respecté.
- Contenu : chaque chaîne vient de `messages/fr.json` et `messages/en.json`
  (parité vérifiée par test). Pas de texte de remplissage.
- Budget : moins de 200 kB gzip de JavaScript sur la page d’accueil. Aucune
  traduction côté client (les composants client reçoivent leurs libellés en props).
- Vérifier avant de livrer : `npm run typecheck`, `npm run lint`,
  `npm run test:run`, `npm run build`.
