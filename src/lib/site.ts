/**
 * Configuration centrale du site — toutes les valeurs provisoires sont ici.
 *
 * TODO avant mise en ligne :
 *  - url   : remplacer par le domaine final (ou définir NEXT_PUBLIC_SITE_URL)
 *  - email : remplacer par l’email de contact public
 *  - cv    : déposer le PDF dans public/cv-mael-belhacene.pdf
 *  - portrait : déposer public/portrait-mael.(avif|webp|jpg|png) — en son
 *    absence, un fallback typographique est rendu (components/ui/Portrait.tsx)
 *  - envoi d’email : voir .env.example (RESEND_API_KEY, CONTACT_TO_EMAIL…)
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maelbelhacene.com",
  name: "Mael Belhacene",
  email: "contact@maelbelhacene.com",
  github: "https://github.com/MaelBelhacene",
  linkedin: "https://linkedin.com/in/mael-belhacene-89545b294",
  cv: "/cv-mael-belhacene.pdf",
  portraitCandidates: [
    "portrait-mael.avif",
    "portrait-mael.webp",
    "portrait-mael.jpg",
    "portrait-mael.jpeg",
    "portrait-mael.png",
  ],
} as const;
