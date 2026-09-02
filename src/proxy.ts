import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Next.js 16 : le fichier s’appelle proxy.ts, l’API next-intl reste celle du middleware. */
export default createMiddleware(routing);

export const config = {
  // Tout sauf les routes API, /og, les internes Next et les fichiers statiques
  matcher: "/((?!api|og|_next|_vercel|.*\\..*).*)",
};
