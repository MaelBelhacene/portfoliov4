import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="band-inverse">
      <div className="container-grid gap-y-10 py-14 md:py-16">
        <div className="col-span-12 md:col-span-5">
          <p className="font-display text-heading font-semibold text-ink">{site.name}</p>
          <p className="label mt-3 text-ink-muted">{t("role")}</p>
        </div>

        <div className="col-span-6 md:col-span-3">
          <p className="label text-ink-muted">{t("location")}</p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-3 inline-block break-all text-small text-ink"
          >
            {site.email}
          </a>
        </div>

        <ul className="col-span-6 flex flex-col gap-3 md:col-span-2">
          <li>
            <a href={site.github} rel="me noopener" target="_blank" className="label link-underline text-ink">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} rel="me noopener" target="_blank" className="label link-underline text-ink">
              LinkedIn
            </a>
          </li>
        </ul>

        <div className="col-span-12 md:col-span-2 md:text-right">
          <a href="#hero" className="label link-underline text-ink">
            {t("top")}
          </a>
        </div>

        <p className="tnum col-span-12 border-t border-rule pt-6 text-small text-ink-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
