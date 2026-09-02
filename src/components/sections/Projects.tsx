import { useTranslations } from "next-intl";
import Section from "./Section";
import Reveal from "@/components/ui/Reveal";

type Item = { title: string; context: string; role: string; stack: string[] };

export default function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as Item[];

  return (
    <Section id="projects" index="06" label={t("label")} title={t("title")} tone="inverse">
      <ol className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title} className="border-t border-rule pt-6">
            <Reveal delay={i * 0.08}>
              <article>
                <p className="tnum text-index font-bold text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 max-w-[16ch] text-heading font-semibold text-ink">
                  {item.title}
                </h3>
                <dl className="mt-8 space-y-6">
                  <div>
                    <dt className="label text-ink-muted">{t("contextLabel")}</dt>
                    <dd className="mt-2 text-small text-ink">{item.context}</dd>
                  </div>
                  <div>
                    <dt className="label text-ink-muted">{t("roleLabel")}</dt>
                    <dd className="mt-2 text-small text-ink">{item.role}</dd>
                  </div>
                  <div>
                    <dt className="label text-ink-muted">{t("stackLabel")}</dt>
                    <dd className="label mt-2 text-mark">{item.stack.join(" · ")}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
