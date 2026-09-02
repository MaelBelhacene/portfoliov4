import { siGitlab, siLaravel, siNodedotjs, siOrange, type SimpleIcon } from "simple-icons";

/**
 * Marques de l’environnement quotidien (section Expertises).
 * Logo monochrome libre (Simple Icons, CC0) quand il existe ; sinon un
 * monogramme typographique — aucun logo inventé. Les identifiants suivent
 * `expertise.tools[].items[].id` dans messages/*.json.
 */
export type ToolMark = { icon: SimpleIcon } | { mark: string };

export const toolMarks: Record<string, ToolMark> = {
  sentinelone: { mark: "S1" },
  sekoia: { mark: "SK" },
  orange: { icon: siOrange },
  activedirectory: { mark: "AD" },
  easyredmine: { mark: "ER" },
  iso27001: { mark: "ISO" },
  rgpd: { mark: "CNIL" },
  laravel: { icon: siLaravel },
  nodejs: { icon: siNodedotjs },
  gitlab: { icon: siGitlab },
};
