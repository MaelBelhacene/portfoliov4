import { useTranslations } from "next-intl";
import Section from "./Section";
import ContactForm, { type ContactFormLabels } from "./ContactForm";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export default function Contact() {
  const t = useTranslations("contact");
  const labels = t.raw("form") as ContactFormLabels;

  return (
    <Section id="contact" index="07" label={t("label")} title={t("title")} tone="alt">
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-8">
        <Reveal className="lg:col-span-3">
          <p className="max-w-[34ch] text-lead text-ink-muted">{t("lead")}</p>

          <p className="label mt-12 text-ink-muted">{t("directLabel")}</p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-3 inline-block font-display text-body font-semibold text-accent"
          >
            {site.email}
          </a>

          <p className="label mt-10 text-ink-muted">{t("socialLabel")}</p>
          <ul className="mt-3 flex gap-6">
            <li>
              <a
                href={site.github}
                rel="me noopener"
                target="_blank"
                className="link-underline font-display text-small font-medium text-ink"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                rel="me noopener"
                target="_blank"
                className="link-underline font-display text-small font-medium text-ink"
              >
                LinkedIn
              </a>
            </li>
          </ul>

          <a href={site.cv} download className="btn-secondary mt-10">
            {t("cvLabel")}
          </a>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <ContactForm labels={labels} />
        </Reveal>
      </div>
    </Section>
  );
}
