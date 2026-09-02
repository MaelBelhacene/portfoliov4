# Portfolio — Mael Belhacene (v4)

One-page bilingue FR/EN. Cybersécurité · GRC · Développement sécurisé.
Direction artistique « Norme » : grille suisse, papier gris, charbon, vermillon.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict
- Tailwind CSS v4, CSS-first — **toute la DA vit dans le bloc `@theme` de `src/app/globals.css`**
- next-intl — français sans préfixe, anglais sous `/en`
- Vitest + Testing Library
- Formulaire de contact : route API `/api/contact` + Resend

## Commandes

```bash
npm run dev      # développement (http://localhost:3000)
npm run build    # build de production
npm run start    # serveur de production
npm run lint     # ESLint
npm run test     # Vitest (mode watch) — `npm run test:run` pour un passage unique
npm run typecheck
```

## Changer la direction artistique

Un seul fichier : `src/app/globals.css`, bloc `@theme`. Les tokens sont nommés
par rôle (`surface`, `accent`, `hairline`, `muted`…), jamais par teinte.
Les composants n’utilisent que les couleurs « de ton » (`text-ink`,
`text-ink-muted`, `border-rule`, `text-mark`) qui suivent la bande courante
(`band-surface`, `band-alt`, `band-inverse`).

Trois contextes lisent des valeurs littérales — image Open Graph, manifeste,
`themeColor` : elles sont isolées dans `src/lib/tokens.ts`, et
`src/lib/tokens.test.ts` échoue si elles divergent du CSS.

## À fournir avant mise en ligne (TODO)

Tout est centralisé dans `src/lib/site.ts` :

- [ ] Domaine final (`url`, ou `NEXT_PUBLIC_SITE_URL`)
- [ ] Email public (`email`)
- [ ] CV : `public/cv-mael-belhacene.pdf`
- [ ] Photo : `public/portrait-mael.(avif|webp|jpg|png)` — sans elle, un
      fallback typographique est affiché
- [ ] Variables Resend dans `.env.local` (voir `.env.example`)
- [ ] Vrais SVG des organisations, si souhaité, à la place des monogrammes
      (`src/lib/orgs.ts`)

## Accessibilité

Contrastes AA mesurés (voir commentaires dans `globals.css`), navigation
clavier complète, focus visible, lien d’évitement, `prefers-reduced-motion`
respecté, formulaire avec labels visibles et erreurs annoncées près du champ.
