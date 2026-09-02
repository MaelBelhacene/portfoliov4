import { useTranslations } from "next-intl";
import Section from "./Section";
import Monogram from "@/components/ui/Monogram";
import Reveal from "@/components/ui/Reveal";
import { educationOrgs } from "@/lib/orgs";

type Item = { years: string; degree: string; school: string; note: string };

export default function Education() {
  const t = useTranslations("education");
  const items = t.raw("items") as Item[];

  return (
    <Section id="education" index="05" label={t("label")} title={t("title")}>
      <ol>
        {items.map((item, i) => (
          <li key={item.degree} className="border-t border-rule py-8 md:py-10">
            <Reveal>
              <article className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-8">
                <p className="label tnum text-ink-muted md:col-span-2 md:pt-1">{item.years}</p>
                <div className="flex gap-5 md:col-span-6">
                  <Monogram org={educationOrgs[i] ?? "cesi"} />
                  <div>
                    <h3 className="text-heading font-semibold text-ink">{item.degree}</h3>
                    <p className="mt-1 text-small text-ink-muted">{item.school}</p>
                    <p className="mt-4 max-w-[52ch] text-body text-ink-muted">{item.note}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <article className="mt-6 border-t border-rule py-8 md:py-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-8">
            <p className="label tnum text-ink-muted md:col-span-2 md:pt-1">{t("cert.date")}</p>
            <div className="flex gap-5 md:col-span-6">
              <Monogram org="un" />
              <div>
                <p className="label text-ink-muted">{t("certLabel")}</p>
                <h3 className="mt-3 text-heading font-semibold text-ink">
                  {t("cert.title")} — {t("cert.org")}
                </h3>
                <p className="tnum mt-2 text-small text-ink-muted">{t("cert.id")}</p>
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
