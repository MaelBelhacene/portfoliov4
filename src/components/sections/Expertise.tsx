import { useTranslations } from "next-intl";
import Section from "./Section";
import Reveal from "@/components/ui/Reveal";

type Pillar = { title: string; items: string[] };
type ToolGroup = { label: string; items: string[] };

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

      {/* Outils du quotidien, cyber d’abord — marques typographiques, aucun logo inventé */}
      <Reveal className="mt-16">
        <h3 className="label text-ink-muted">{t("toolsLabel")}</h3>
        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((group) => (
            <div key={group.label}>
              <dt className="label text-ink-muted">{group.label}</dt>
              <dd className="mt-3">
                <ul>
                  {group.items.map((item) => (
                    <li key={item} className="font-display text-body font-medium text-ink">
                      {item}
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
