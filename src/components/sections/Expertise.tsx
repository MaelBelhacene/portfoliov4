import { useTranslations } from "next-intl";
import Section from "./Section";
import Reveal from "@/components/ui/Reveal";
import { toolMarks } from "@/lib/tools";

type Pillar = { title: string; items: string[] };
type ToolGroup = { label: string; items: { id: string; label: string }[] };

/** Logo monochrome (SVG serveur, zéro JS) ou monogramme typographique. */
function ToolMark({ id, label }: { id: string; label: string }) {
  const mark = toolMarks[id];
  if (mark && "icon" in mark) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        role="img"
        aria-label={label}
        fill="currentColor"
        className="shrink-0"
      >
        <path d={mark.icon.path} />
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
                    <li key={item.id} className="flex items-center gap-3 text-ink">
                      <ToolMark id={item.id} label={item.label} />
                      <span aria-hidden="true" className="font-display text-small font-medium">
                        {item.label}
                      </span>
                    </li>
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
