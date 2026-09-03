import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind en laissant la dernière gagner sur les
 * conflits (`px-2 px-4` → `px-4`). Convention shadcn, attendue par les
 * composants de `src/components/ui` importés depuis l’extérieur.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
