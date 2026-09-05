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
- [x] CV : `public/cv-mael-belhacene.pdf` — à régénérer si le parcours évolue
- [ ] Photo : `public/portrait-mael.(avif|webp|jpg|png)` — sans elle, un
      carton d’identité typographique est affiché à sa place
- [ ] Variables Resend dans `.env.local` (voir `.env.example`)
- [ ] Vrais SVG des organisations, si souhaité, à la place des monogrammes
      (`src/lib/orgs.ts`)

## Formulaire de contact

L'envoi passe par une route serveur, `src/app/api/contact/route.ts`, et par
[Resend](https://resend.com). La clé n'existe qu'en variable d'environnement,
jamais dans le code ni dans le dépôt.

Sans configuration, la route répond `503 unconfigured` et le formulaire affiche
« le service d'envoi n'est pas encore configuré », avec l'adresse email juste à
côté. C'est un repli volontaire : rien ne casse, le visiteur a toujours un moyen
de joindre.

Pour l'activer en production :

```bash
vercel env add RESEND_API_KEY production
vercel env add CONTACT_TO_EMAIL production
vercel redeploy
```

La CLI demande chaque valeur de façon interactive — elle ne transite ni par un
fichier, ni par l'historique du shell. Voir `.env.example` pour le détail de
chaque variable, notamment le choix de l'expéditeur.

Protections en place : champ piège (honeypot) traité en silence, validation
serveur stricte (`src/lib/contact.ts`, couverte par tests). Il n'y a pas de
limitation de débit applicative — si le formulaire est abusé, la réponse est
le pare-feu Vercel, qui filtre en amont de la fonction.

## Accessibilité

Contrastes AA mesurés (voir commentaires dans `globals.css`), navigation
clavier complète, focus visible, lien d’évitement, `prefers-reduced-motion`
respecté, formulaire avec labels visibles et erreurs annoncées près du champ.
