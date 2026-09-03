import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildLocaleMetadata, type Locale } from "@/lib/seo";
import { tokens } from "@/lib/tokens";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelloIntro from "@/components/ui/HelloIntro";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";
import { INTRO_GUARD_SCRIPT } from "@/lib/intro";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildLocaleMetadata(locale as Locale, {
    title: t("title"),
    description: t("description"),
  });
}

export const viewport: Viewport = {
  themeColor: tokens.surface,
};

/**
 * Toutes les traductions sont résolues côté serveur : aucun
 * NextIntlClientProvider, donc aucun runtime i18n dans le bundle client.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "a11y" });

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${plexSans.variable}`}
      // Le script de lib/intro.ts pose `data-intro` sur cet élément avant
      // l’hydratation : le serveur ne peut pas connaître l’état du
      // sessionStorage, l’écart est donc attendu. La suppression ne porte
      // que sur les attributs de cette balise, jamais sur le reste de
      // l’arbre, qui garde sa vérification d’hydratation complète.
      suppressHydrationWarning
    >
      <body className="min-h-svh">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}.intro-curtain{display:none !important}`}</style>
        </noscript>
        {/* Doit rester avant le rideau : il est exécuté pendant l’analyse du
            document, donc avant que le rideau ne soit peint. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_GUARD_SCRIPT }} />
        <HelloIntro>
          {/* Rendu côté serveur : les tracés ne partent pas dans le bundle client */}
          <AppleHelloEnglishEffect speed={0.7} className="h-14 w-auto md:h-20" />
        </HelloIntro>
        <a
          href="#main"
          className="label sr-only z-[100] bg-accent px-4 py-3 text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {t("skipLink")}
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
