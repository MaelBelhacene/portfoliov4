"use client";

import { useEffect, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

const SECTIONS = [
  "about",
  "services",
  "expertise",
  "experience",
  "education",
  "projects",
  "contact",
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const locale = useLocale();
  const other = locale === "fr" ? "en" : "fr";
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-surface">
      <div className="container-grid h-16 items-center">
        <div className="col-span-6 flex items-center gap-3 lg:col-span-3">
          <span aria-hidden="true" className="size-3 bg-accent" />
          <Link href="/" onClick={close} className="font-display text-small font-semibold text-ink">
            {site.name}
          </Link>
        </div>

        <nav
          aria-label={a11y("mainNav")}
          className="col-span-6 hidden justify-end lg:col-span-9 lg:flex"
        >
          <ul className="flex items-center gap-7">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="label link-underline text-ink-muted hover:text-ink">
                  {t(id)}
                </a>
              </li>
            ))}
            <li>
              <a href={site.cv} download className="label link-underline text-ink">
                {t("cv")}
              </a>
            </li>
            <li>
              <Link
                href="/"
                locale={other}
                lang={other}
                hrefLang={other}
                aria-label={a11y("localeSwitch")}
                className="label border border-ink px-2.5 py-1.5 text-ink transition-colors hover:bg-ink hover:text-ground motion-reduce:transition-none"
              >
                {other.toUpperCase()}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="col-span-6 flex items-center justify-end gap-4 lg:hidden">
          <Link
            href="/"
            locale={other}
            lang={other}
            hrefLang={other}
            aria-label={a11y("localeSwitch")}
            className="label border border-ink px-2.5 py-1.5 text-ink"
          >
            {other.toUpperCase()}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="label -mr-2 min-h-11 px-2 text-ink"
          >
            <span className="sr-only">{open ? a11y("menuClose") : a11y("menuOpen")}</span>
            <span aria-hidden="true">{open ? "×" : "Menu"}</span>
          </button>
        </div>
      </div>

      <nav
        id={panelId}
        hidden={!open}
        aria-label={a11y("mainNav")}
        className="border-t border-rule bg-surface lg:hidden"
      >
        <ul className="container-grid py-4">
          {SECTIONS.map((id) => (
            <li key={id} className="col-span-12">
              <a
                href={`#${id}`}
                onClick={close}
                className="label block border-b border-rule py-4 text-ink"
              >
                {t(id)}
              </a>
            </li>
          ))}
          <li className="col-span-12">
            <a href={site.cv} download onClick={close} className="label block py-4 text-ink">
              {t("cv")}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
