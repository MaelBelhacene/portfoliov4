import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

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
          <Link href="/" className="btn-primary">
            {t("back")}
          </Link>
        </div>
      </div>
    </main>
  );
}
