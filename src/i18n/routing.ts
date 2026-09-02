import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  // URLs explicites : / en français, /en en anglais — aucune redirection
  // selon le navigateur ni cookie, ce qui permet des liens de langue statiques
  // et retire next-intl du bundle client.
  localeDetection: false,
  localeCookie: false,
});
