/**
 * Monogrammes typographiques des organisations — aucun logo inventé.
 * Les vrais SVG pourront remplacer ces marques plus tard.
 *
 * Les tableaux suivent l’ordre des entrées de messages/*.json
 * (experience.items, education.items).
 */
export const monograms = {
  domplus: { mark: "DP", name: "DOMPLUS Groupe" },
  prowebce: { mark: "PW", name: "PROWEBCE" },
  cesi: { mark: "CESI", name: "CESI" },
  un: { mark: "UN", name: "United Nations" },
} as const;

export type OrgKey = keyof typeof monograms;

export const experienceOrgs: OrgKey[] = ["domplus", "domplus", "domplus", "domplus", "prowebce"];
export const educationOrgs: OrgKey[] = ["cesi", "cesi"];
