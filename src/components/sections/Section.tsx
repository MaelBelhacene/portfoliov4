import type { ReactNode } from "react";

export type Tone = "surface" | "alt" | "inverse";

const toneClass: Record<Tone, string> = {
  surface: "band-surface",
  alt: "band-alt",
  inverse: "band-inverse",
};

/**
 * Section de la one-page : bande de fond + grille 12 colonnes.
 * En-tête (index, intitulé, titre) sur 4 colonnes, contenu sur 8.
 */
export default function Section({
  id,
  index,
  label,
  title,
  tone = "surface",
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  tone?: Tone;
  children: ReactNode;
}) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${toneClass[tone]} py-20 md:py-28 lg:py-36`}
    >
      <div className="container-grid">
        <header className="col-span-12 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="label text-ink-muted">
            <span className="tnum">{index}</span>
            <span aria-hidden="true"> — </span>
            {label}
          </p>
          <h2
            id={headingId}
            className="mt-5 max-w-[14ch] text-title font-semibold text-ink"
          >
            {title}
          </h2>
        </header>
        <div className="col-span-12 mt-12 lg:col-span-8 lg:mt-0">{children}</div>
      </div>
    </section>
  );
}
