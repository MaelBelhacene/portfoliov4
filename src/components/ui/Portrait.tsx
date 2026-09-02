import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { site } from "@/lib/site";

/** Cherche la photo dans public/ au moment du rendu (serveur uniquement). */
function findPortrait(): string | null {
  for (const file of site.portraitCandidates) {
    if (existsSync(join(process.cwd(), "public", file))) return `/${file}`;
  }
  return null;
}

/**
 * Portrait au format 4/5. Sans photo déposée dans public/, un fallback
 * typographique prend sa place : bloc charbon, monogramme et nom.
 */
export default function Portrait({ alt }: { alt: string }) {
  const src = findPortrait();

  if (src) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-inverse">
        <Image
          src={src}
          alt={alt}
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
      aria-label={alt}
      className="band-inverse flex aspect-[4/5] w-full flex-col justify-between p-5 md:p-6"
    >
      <span className="label text-ink-muted">{site.name}</span>
      <span aria-hidden="true" className="text-display font-bold text-ink">
        MB
      </span>
    </div>
  );
}
