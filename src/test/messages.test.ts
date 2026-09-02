import { describe, expect, it } from "vitest";
import fr from "../../messages/fr.json";
import en from "../../messages/en.json";

type Tree = Record<string, unknown>;

/** Aplati les clés d’un objet de messages en chemins pointés, avec la forme des valeurs. */
function shape(tree: Tree, prefix = ""): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      return [
        `${path}[len=${value.length}]`,
        ...value.flatMap((item, i) =>
          typeof item === "object" && item !== null
            ? shape(item as Tree, `${path}[${i}]`)
            : [`${path}[${i}]:scalar`]
        ),
      ];
    }
    if (typeof value === "object" && value !== null) {
      return shape(value as Tree, path);
    }
    return [`${path}:${typeof value}`];
  });
}

describe("parité des messages fr/en", () => {
  it("possède exactement les mêmes clés, structures et types", () => {
    expect(shape(en as Tree).sort()).toEqual(shape(fr as Tree).sort());
  });

  it("aucune valeur de traduction vide", () => {
    const check = (tree: Tree, path = "") => {
      for (const [key, value] of Object.entries(tree)) {
        const current = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          expect(value.trim(), `valeur vide : ${current}`).not.toBe("");
        } else if (typeof value === "object" && value !== null) {
          check(value as Tree, current);
        }
      }
    };
    check(fr as Tree);
    check(en as Tree);
  });

  it("les balises riches du hero existent dans les deux langues", () => {
    expect(fr.hero.title).toMatch(/<em>.+<\/em>/);
    expect(en.hero.title).toMatch(/<em>.+<\/em>/);
  });

  it("l’anglais est une traduction, pas un calque du français", () => {
    const pairs: [string, string][] = [
      [fr.hero.subtitle, en.hero.subtitle],
      [fr.about.p1, en.about.p1],
      [fr.contact.lead, en.contact.lead],
      [fr.notFound.description, en.notFound.description],
      [fr.a11y.localeSwitch, en.a11y.localeSwitch],
    ];
    for (const [f, e] of pairs) {
      expect(e).not.toBe(f);
    }
  });
});
