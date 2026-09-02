import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildLocaleMetadata, type Locale } from "@/lib/seo";
import { tokens } from "@/lib/tokens";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

  // Seuls les espaces de noms utilisés côté client traversent la frontière
  const messages = await getMessages();
  const clientMessages = {
    a11y: messages.a11y,
    nav: messages.nav,
    contact: { form: (messages.contact as { form: unknown }).form },
  };
  const t = await getTranslations({ locale, namespace: "a11y" });

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${plexSans.variable}`}
    >
      <body className="min-h-svh">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <NextIntlClientProvider messages={clientMessages}>
          <a
            href="#main"
            className="label sr-only z-[100] bg-accent px-4 py-3 text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            {t("skipLink")}
          </a>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
