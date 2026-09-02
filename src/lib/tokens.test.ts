import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { tokens } from "./tokens";

/**
 * Garde-fou de l’architecture « toute la DA dans @theme » : les valeurs
 * littérales isolées dans tokens.ts doivent rester identiques à celles de
 * globals.css, sinon OG, manifeste et themeColor mentiraient.
 */
describe("parité tokens.ts ⇄ globals.css", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

  for (const [name, value] of Object.entries(tokens)) {
    it(`--color-${name} vaut ${value}`, () => {
      const re = new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`);
      const match = css.match(re);
      expect(match, `token --color-${name} absent de globals.css`).not.toBeNull();
      expect(match?.[1].toLowerCase()).toBe(value.toLowerCase());
    });
  }
});
