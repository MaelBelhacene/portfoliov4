import { siGitlab, siLaravel, siNodedotjs, siOrange, type SimpleIcon } from "simple-icons";
import { easy8Mark, sekoiaWordmark, sentinelOneMark, type VectorMark } from "./brand-marks";

/**
 * Marques de l’environnement quotidien (section Expertises).
 *  - `icon`     : logo monochrome libre (Simple Icons, CC0)
 *  - `symbol`   : pictogramme officiel extrait du site de l’éditeur (brand-marks.ts)
 *  - `wordmark` : mot-symbole officiel, affiché à la place du nom
 *  - `knockout` : symbole à évidement (le « 8 » d’Easy8 en couleur du fond)
 *  - `mark`     : monogramme typographique quand aucun logo n’est disponible
 * Les identifiants suivent `expertise.tools[].items[].id` dans messages/*.json.
 */
export type ToolMark =
  | { icon: SimpleIcon }
  | { symbol: VectorMark }
  | { wordmark: VectorMark; tail?: string }
  | { knockout: { viewBox: string; square: string; eight: string } }
  | { mark: string };

export const toolMarks: Record<string, ToolMark> = {
  sentinelone: { symbol: sentinelOneMark },
  sekoia: { wordmark: sekoiaWordmark, tail: "XDR" },
  orange: { icon: siOrange },
  activedirectory: { mark: "AD" },
  easyredmine: { knockout: easy8Mark },
  iso27001: { mark: "ISO" },
  rgpd: { mark: "CNIL" },
  laravel: { icon: siLaravel },
  nodejs: { icon: siNodedotjs },
  gitlab: { icon: siGitlab },
};
