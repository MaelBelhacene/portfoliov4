import { useTranslations } from "next-intl";
import Section from "./Section";
import Reveal from "@/components/ui/Reveal";
import { toolMarks } from "@/lib/tools";

type Pillar = { title: string; items: string[] };
type ToolItem = { id: string; label: string };
type ToolGroup = { label: string; items: ToolItem[] };

const ICON = "size-[22px] shrink-0";

/**
 * Marque d’un outil : logo libre, pictogramme officiel, mot-symbole ou
 * monogramme typographique. Toujours nommée pour les lecteurs d’écran ;
 * rendue en SVG côté serveur, zéro JavaScript.
 */
function ToolMark({ id, label }: ToolItem) {
  const mark = toolMarks[id];

  if (mark && "icon" in mark) {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label={label} fill="currentColor" className={ICON}>
        <path d={mark.icon.path} />
      </svg>
    );
  }

  if (mark && "symbol" in mark) {
    return (
      <svg
        viewBox={mark.symbol.viewBox}
        role="img"
        aria-label={label}
        fill="currentColor"
        className={ICON}
        preserveAspectRatio="xMidYMid meet"
      >
        {mark.symbol.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }

  if (mark && "knockout" in mark) {
    return (
      <svg viewBox={mark.knockout.viewBox} role="img" aria-label={label} className={ICON}>
        <path d={mark.knockout.square} fill="currentColor" />
        <path d={mark.knockout.eight} fill="var(--tone-ground)" />
      </svg>
    );
  }

  const letters = mark && "mark" in mark ? mark.mark : label.slice(0, 2).toUpperCase();
  return (
    <span
      role="img"
      aria-label={label}
      className={`flex size-7 shrink-0 items-center justify-center border border-rule font-display font-semibold text-ink ${
        letters.length > 2 ? "text-[0.5rem] tracking-wide" : "text-[0.6875rem] tracking-wider"
      }`}
    >
      <span aria-hidden="true">{letters}</span>
    </span>
  );
}

/** Ligne d’outil : mot-symbole seul, ou marque + nom. */
function ToolRow({ id, label }: ToolItem) {
  const mark = toolMarks[id];

  if (mark && "wordmark" in mark) {
    return (
      <li className="flex items-center gap-2 text-ink">
        <svg
          viewBox={mark.wordmark.viewBox}
          role="img"
          aria-label={label}
          fill="currentColor"
          className="h-[1.125rem] w-auto shrink-0"
        >
          {mark.wordmark.paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </svg>
        {mark.tail && (
          <span aria-hidden="true" className="font-display text-small font-medium">
            {mark.tail}
          </span>
        )}
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 text-ink">
      <ToolMark id={id} label={label} />
      <span aria-hidden="true" className="font-display text-small font-medium">
        {label}
      </span>
    </li>
  );
}

export default function Expertise() {
  const t = useTranslations("expertise");
  const pillars = t.raw("pillars") as Pillar[];
  const tools = t.raw("tools") as ToolGroup[];

  return (
    <Section id="expertise" index="03" label={t("label")} title={t("title")} tone="inverse">
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08}>
            <h3 className="border-t border-rule pt-6 text-heading font-semibold text-ink">
              {pillar.title}
            </h3>
            <ul className="mt-6">
              {pillar.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-3 text-small text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Outils du quotidien, cyber d’abord */}
      <Reveal className="mt-16">
        <h3 className="label text-ink-muted">{t("toolsLabel")}</h3>
        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((group) => (
            <div key={group.label}>
              <dt className="label text-ink-muted">{group.label}</dt>
              <dd className="mt-4">
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <ToolRow key={item.id} id={item.id} label={item.label} />
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
