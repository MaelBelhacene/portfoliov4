import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

/** Cherche la photo dans public/ au moment du rendu (serveur uniquement). */
function findPortrait(): string | null {
  for (const file of site.portraitCandidates) {
    if (existsSync(join(process.cwd(), "public", file))) return `/${file}`;
  }
  return null;
}

/**
 * Portrait au format 4/5. Sans photo déposée dans public/, un carton
 * d’identité typographique prend sa place : filet, carré d’accent, nom,
 * positionnement et lieu — lisible comme un choix, pas comme un trou.
 */
export default function Portrait() {
  const t = useTranslations("about");
  const footer = useTranslations("footer");
  const src = findPortrait();

  if (src) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-inverse">
        <Image
          src={src}
          alt={t("portraitAlt")}
          fill
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 40vw, 66vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={t("portraitFallback")}
      className="flex aspect-[4/5] w-full flex-col justify-between border border-rule p-5 md:p-6"
    >
      <span aria-hidden="true" className="size-3 bg-accent" />
      <div aria-hidden="true">
        <p className="text-heading font-semibold text-ink">{site.name}</p>
        <p className="label mt-5 border-t border-rule pt-4 text-ink-muted">{footer("role")}</p>
        <p className="label mt-2 text-ink-muted">{footer("location")}</p>
      </div>
    </div>
  );
}
