import { useTranslations } from "next-intl";
import Section from "./Section";
import Reveal from "@/components/ui/Reveal";

type Item = { title: string; desc: string };

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <Section id="services" index="02" label={t("label")} title={t("title")}>
      <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.title} className="border-t border-rule pt-6">
            <Reveal delay={(i % 2) * 0.08}>
              <p className="label tnum text-ink-faint">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 max-w-[18ch] text-heading font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-body text-ink-muted">{item.desc}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
