import { useTranslations } from "next-intl";
import Section from "./Section";
import Monogram from "@/components/ui/Monogram";
import Reveal from "@/components/ui/Reveal";
import { experienceOrgs } from "@/lib/orgs";

type Item = { period: string; role: string; org: string; desc: string };

export default function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as Item[];

  return (
    <Section id="experience" index="04" label={t("label")} title={t("title")} tone="alt">
      <ol>
        {items.map((item, i) => (
          <li key={item.role} className="border-t border-rule py-8 md:py-10">
            <Reveal>
              <article className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-8">
                <p className="label tnum text-ink-muted md:col-span-2 md:pt-1">
                  {item.period}
                </p>
                <div className="flex gap-5 md:col-span-6">
                  <Monogram org={experienceOrgs[i] ?? "domplus"} />
                  <div>
                    <h3 className="text-heading font-semibold text-ink">{item.role}</h3>
                    <p className="mt-1 text-small text-ink-muted">{item.org}</p>
                    <p className="mt-4 max-w-[52ch] text-body text-ink-muted">{item.desc}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
