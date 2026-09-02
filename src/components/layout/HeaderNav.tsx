"use client";

import { useEffect, useId, useState } from "react";

type LinkItem = { href: string; label: string };

export type HeaderNavProps = {
  name: string;
  homeHref: string;
  links: LinkItem[];
  cv: LinkItem;
  localeSwitch: { href: string; code: string; label: string };
  labels: { mainNav: string; menuOpen: string; menuClose: string };
};

export default function HeaderNav({
  name,
  homeHref,
  links,
  cv,
  localeSwitch,
  labels,
}: HeaderNavProps) {
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

  const switchLink = (
    <a
      href={localeSwitch.href}
      lang={localeSwitch.code}
      hrefLang={localeSwitch.code}
      aria-label={localeSwitch.label}
      className="label border border-ink px-2.5 py-1.5 text-ink transition-colors hover:bg-ink hover:text-ground motion-reduce:transition-none"
    >
      {localeSwitch.code.toUpperCase()}
    </a>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-surface">
      <div className="container-grid h-16 items-center">
        <div className="col-span-6 flex items-center gap-3 lg:col-span-3">
          <span aria-hidden="true" className="size-3 bg-accent" />
          <a href={homeHref} onClick={close} className="font-display text-small font-semibold text-ink">
            {name}
          </a>
        </div>

        <nav
          aria-label={labels.mainNav}
          className="col-span-6 hidden justify-end lg:col-span-9 lg:flex"
        >
          <ul className="flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="label link-underline text-ink-muted hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={cv.href} download className="label link-underline text-ink">
                {cv.label}
              </a>
            </li>
            <li>{switchLink}</li>
          </ul>
        </nav>

        <div className="col-span-6 flex items-center justify-end gap-4 lg:hidden">
          {switchLink}
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="label -mr-2 min-h-11 px-2 text-ink"
          >
            <span className="sr-only">{open ? labels.menuClose : labels.menuOpen}</span>
            <span aria-hidden="true">{open ? "×" : "Menu"}</span>
          </button>
        </div>
      </div>

      <nav
        id={panelId}
        hidden={!open}
        aria-label={labels.mainNav}
        className="border-t border-rule bg-surface lg:hidden"
      >
        <ul className="container-grid py-4">
          {links.map((link) => (
            <li key={link.href} className="col-span-12">
              <a
                href={link.href}
                onClick={close}
                className="label block border-b border-rule py-4 text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="col-span-12">
            <a href={cv.href} download onClick={close} className="label block py-4 text-ink">
              {cv.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
