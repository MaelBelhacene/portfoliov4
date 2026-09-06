import { useTranslations } from "next-intl";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { site } from "@/lib/site";

export default function Hero() {
  const t = useTranslations("hero");
  const footer = useTranslations("footer");

  return (
    <section id="hero" aria-labelledby="hero-title" className="band-surface">
      <div className="container-grid min-h-[calc(100svh-4rem)] content-between pt-12 pb-10 md:pt-16 md:pb-12">
        <div className="col-span-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 animate-rise motion-reduce:animate-none">
          <p className="label text-ink-muted">{t("eyebrow")}</p>
          <p className="label text-ink-muted">{footer("location")}</p>
        </div>

        <div className="col-span-12 py-14 md:py-20">
          <h1
            id="hero-title"
            className="max-w-[12ch] text-display font-bold text-ink animate-rise [animation-delay:80ms] motion-reduce:animate-none"
          >
            {t.rich("title", {
              em: (chunks) => <em className="not-italic text-accent">{chunks}</em>,
            })}
          </h1>

          <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-16">
            <p className="col-span-12 max-w-[42ch] text-lead text-ink-muted animate-rise [animation-delay:160ms] motion-reduce:animate-none md:col-span-7 lg:col-span-5">
              {t("subtitle")}
            </p>
            <div className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-4 animate-rise [animation-delay:240ms] motion-reduce:animate-none md:col-span-5 lg:col-span-5 lg:col-start-8">
              <ArrowFillButton href="#projects" btnText={t("ctaProjects")} />
              <a href="#contact" className="link-underline font-display text-small font-medium text-ink">
                {t("ctaContact")}
              </a>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-rule pt-5 animate-rise [animation-delay:320ms] motion-reduce:animate-none">
          <p className="label text-ink-muted">{t("roleLine")}</p>
          <ul className="flex gap-6">
            <li>
              <a
                href={site.github}
                rel="me noopener"
                target="_blank"
                className="label link-underline text-ink"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                rel="me noopener"
                target="_blank"
                className="label link-underline text-ink"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
