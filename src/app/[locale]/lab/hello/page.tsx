import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  AppleHelloEnglishEffect,
  AppleHelloVietnameseEffect,
} from "@/components/ui/apple-hello-effect";

/**
 * ROUTE TEMPORAIRE — démo du composant `apple-hello-effect`, reprise de
 * son `demo.tsx`. Hors indexation (noindex + robots.ts).
 * À supprimer avant la mise en ligne : voir la checklist du README.
 */
export const metadata: Metadata = {
  title: "Apple hello effect",
  robots: { index: false, follow: false },
};

export default async function AppleHelloEffectDemo({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main
      id="main"
      className="flex h-screen w-full flex-col items-center justify-center gap-16"
    >
      <AppleHelloEnglishEffect speed={1.1} />
      <AppleHelloVietnameseEffect speed={1.1} className="h-16" />
    </main>
  );
}
