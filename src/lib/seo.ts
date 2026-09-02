import type { Metadata } from "next";
import { site } from "./site";

export type Locale = "fr" | "en";

/** Chemin canonique d’une locale : français sans préfixe, anglais sous /en. */
export function localePath(locale: Locale): string {
  return locale === "en" ? "/en" : "/";
}

export function buildLocaleMetadata(
  locale: Locale,
  meta: { title: string; description: string }
): Metadata {
  const isEn = locale === "en";
  const path = localePath(locale);
  const languages = { fr: "/", en: "/en", "x-default": "/" };
  const ogImage = `/og?locale=${locale}`;

  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: isEn ? "en_US" : "fr_FR",
      alternateLocale: isEn ? ["fr_FR"] : ["en_US"],
      title: meta.title,
      description: meta.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

/** Données structurées schema.org `Person`, sérialisées sans risque d’injection. */
export function buildPersonJsonLd(locale: Locale): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle:
      locale === "en"
        ? "IT Security Assistant · Security Project Lead"
        : "IT Security Assistant · Chef de projet sécurité",
    worksFor: { "@type": "Organization", name: "DOMPLUS Groupe" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Grenoble",
      addressCountry: "FR",
    },
    sameAs: [site.github, site.linkedin],
    url: site.url,
    email: `mailto:${site.email}`,
  };
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}
