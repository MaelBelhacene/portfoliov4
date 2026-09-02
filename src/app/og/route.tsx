import { ImageResponse } from "next/og";
import { tokens } from "@/lib/tokens";
import { site } from "@/lib/site";
import fr from "../../../messages/fr.json";
import en from "../../../messages/en.json";

/**
 * Archivo Bold en TTF — un vieux user-agent force Google Fonts à servir du
 * truetype (Satori ne lit pas le woff2). Sans réseau, on retombe sur la
 * police par défaut : l’image reste générée.
 */
async function loadArchivo(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Archivo:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64)" } }
    ).then((res) => res.text());
    const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
    if (!match) return null;
    return await fetch(match[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "en" ? "en" : "fr";
  const messages = locale === "en" ? en : fr;
  // « Aligner la sécurité sur <em>le réel</em>. » → l’emphase passe en vermillon
  const [before, emphasis = "", after = ""] = messages.hero.title.split(/<\/?em>/);
  const eyebrow = messages.hero.eyebrow;

  const archivo = await loadArchivo();
  const fontFamily = archivo ? "Archivo" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: tokens.surface,
          color: tokens.foreground,
          padding: "64px 80px",
          fontFamily,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderBottom: `2px solid ${tokens.foreground}`,
            paddingBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 28, height: 28, backgroundColor: tokens.accent }} />
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
              {site.name}
            </span>
          </div>
          <span
            style={{
              fontSize: 20,
              color: tokens.muted,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Grenoble, France
          </span>
        </div>

        <div
          style={{
            display: "block",
            fontSize: 96,
            lineHeight: 0.95,
            letterSpacing: -4,
            fontWeight: 700,
            maxWidth: 960,
          }}
        >
          {before}
          <span style={{ color: tokens.accent }}>{emphasis}</span>
          {after}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: tokens.muted,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: archivo
        ? [{ name: "Archivo", data: archivo, weight: 700, style: "normal" }]
        : undefined,
    }
  );
}
