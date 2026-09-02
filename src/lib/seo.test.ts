import { describe, expect, it } from "vitest";
import { buildLocaleMetadata, buildPersonJsonLd, localePath } from "./seo";
import fr from "../../messages/fr.json";
import en from "../../messages/en.json";

describe("buildLocaleMetadata", () => {
  const frMeta = buildLocaleMetadata("fr", fr.meta);
  const enMeta = buildLocaleMetadata("en", en.meta);

  it("définit titre et description par locale", () => {
    expect(frMeta.title).toBe(fr.meta.title);
    expect(enMeta.title).toBe(en.meta.title);
    expect(frMeta.description).toBe(fr.meta.description);
  });

  it("définit canonical et hreflang fr/en/x-default", () => {
    expect(localePath("fr")).toBe("/");
    expect(localePath("en")).toBe("/en");
    expect(frMeta.alternates?.canonical).toBe("/");
    expect(enMeta.alternates?.canonical).toBe("/en");
    expect(frMeta.alternates?.languages).toEqual({
      fr: "/",
      en: "/en",
      "x-default": "/",
    });
    expect(enMeta.alternates?.languages).toEqual(frMeta.alternates?.languages);
  });

  it("définit OpenGraph et Twitter card avec l’image /og", () => {
    const og = frMeta.openGraph as Record<string, unknown>;
    expect(og.locale).toBe("fr_FR");
    expect(og.url).toBe("/");
    expect(JSON.stringify(og.images)).toContain("/og?locale=fr");
    const twitter = enMeta.twitter as Record<string, unknown>;
    expect(twitter.card).toBe("summary_large_image");
    expect(JSON.stringify(twitter.images)).toContain("/og?locale=en");
  });

  it("définit metadataBase sur le domaine du site", () => {
    expect(frMeta.metadataBase).toBeInstanceOf(URL);
  });
});

describe("buildPersonJsonLd", () => {
  it("produit un objet Person schema.org localisé", () => {
    const parsed = JSON.parse(buildPersonJsonLd("fr"));
    expect(parsed["@type"]).toBe("Person");
    expect(parsed.name).toBe("Mael Belhacene");
    expect(parsed.jobTitle).toContain("Chef de projet sécurité");
    expect(JSON.parse(buildPersonJsonLd("en")).jobTitle).toContain("Security Project Lead");
  });

  it("neutralise le caractère < pour éviter toute injection dans <script>", () => {
    expect(buildPersonJsonLd("fr")).not.toContain("<");
  });
});
