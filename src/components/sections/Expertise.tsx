import { useTranslations } from "next-intl";
import { siGitlab, siLaravel, siMysql, siNodedotjs, siPhp } from "simple-icons";
import Section from "./Section";
import Reveal from "@/components/ui/Reveal";

type Pillar = { title: string; items: string[] };

/** Logos monochromes libres (Simple Icons, CC0) — rendus en SVG serveur, zéro JS. */
const TOOLS = [siLaravel, siPhp, siNodedotjs, siMysql, siGitlab];

export default function Expertise() {
  const t = useTranslations("expertise");
  const pillars = t.raw("pillars") as Pillar[];

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

      <Reveal className="mt-16">
        <p className="label text-ink-muted">{t("toolsLabel")}</p>
        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6">
          {TOOLS.map((icon) => (
            <li key={icon.slug} className="flex items-center gap-3 text-ink">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                role="img"
                aria-label={icon.title}
                fill="currentColor"
              >
                <path d={icon.path} />
              </svg>
              <span aria-hidden="true" className="text-small text-ink-muted">
                {icon.title}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
