import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPersonJsonLd, type Locale } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Expertise from "@/components/sections/Expertise";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <Hero />
      <About />
      <Services />
      <Expertise />
      <Experience />
      <Education />
      <Projects />
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildPersonJsonLd(locale as Locale) }}
      />
    </main>
  );
}
