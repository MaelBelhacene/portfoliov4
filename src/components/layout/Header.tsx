import { useLocale, useTranslations } from "next-intl";
import { localePath, type Locale } from "@/lib/seo";
import { site } from "@/lib/site";
import HeaderNav from "./HeaderNav";

const SECTIONS = [
  "about",
  "services",
  "expertise",
  "experience",
  "education",
  "projects",
  "contact",
] as const;

/**
 * En-tête : composant serveur qui résout les chaînes et délègue
 * l’interactivité (menu mobile) à HeaderNav. Aucune traduction côté client.
 */
export default function Header() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const other: Locale = locale === "fr" ? "en" : "fr";

  return (
    <HeaderNav
      name={site.name}
      homeHref={localePath(locale)}
      links={SECTIONS.map((id) => ({ href: `#${id}`, label: t(id) }))}
      cv={{ href: site.cv, label: t("cv") }}
      localeSwitch={{
        href: localePath(other),
        code: other,
        label: a11y("localeSwitch"),
      }}
      labels={{
        mainNav: a11y("mainNav"),
        menuOpen: a11y("menuOpen"),
        menuClose: a11y("menuClose"),
      }}
    />
  );
}
