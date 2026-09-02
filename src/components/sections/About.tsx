import { useTranslations } from "next-intl";
import Section from "./Section";
import Portrait from "@/components/ui/Portrait";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";

type Stat = { value: number; label: string };

export default function About() {
  const t = useTranslations("about");
  const stats = t.raw("stats") as Record<"years" | "ects" | "areas", Stat>;

  return (
    <Section id="about" index="01" label={t("label")} title={t("title")} tone="alt">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <Reveal className="col-span-8 sm:col-span-5 lg:col-span-4">
          <Portrait alt={t("portraitAlt")} />
        </Reveal>

        <div className="col-span-12 sm:col-span-7 lg:col-span-8 lg:pl-6">
          <Reveal>
            <p className="max-w-[26ch] text-heading font-medium text-ink">
              {t("quote")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 space-y-6 text-body text-ink-muted">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="col-span-12">
          <h3 className="sr-only">{t("statsLabel")}</h3>
          <ul className="grid grid-cols-1 gap-x-6 border-t border-rule sm:grid-cols-3">
            {(["years", "ects", "areas"] as const).map((key, i) => (
              <li
                key={key}
                className={`py-8 ${i > 0 ? "border-t border-rule sm:border-t-0 sm:border-l sm:pl-6" : ""}`}
              >
                <p className="tnum text-index font-bold text-ink">
                  <Counter value={stats[key].value} />
                </p>
                <p className="label mt-4 max-w-[22ch] text-ink-muted">{stats[key].label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
