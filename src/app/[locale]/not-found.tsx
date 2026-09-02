import { useLocale, useTranslations } from "next-intl";
import { localePath, type Locale } from "@/lib/seo";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale() as Locale;

  return (
    <main id="main" className="band-surface">
      <div className="container-grid min-h-[calc(100svh-4rem)] content-center py-24">
        <p className="label tnum col-span-12 text-ink-muted">{t("code")}</p>
        <h1 className="col-span-12 mt-6 text-display font-bold text-ink lg:col-span-10">
          {t("title")}
        </h1>
        <p className="col-span-12 mt-10 max-w-[48ch] text-lead text-ink-muted lg:col-span-6">
          {t("description")}
        </p>
        <div className="col-span-12 mt-12">
          <a href={localePath(locale)} className="btn-primary">
            {t("back")}
          </a>
        </div>
      </div>
    </main>
  );
}
