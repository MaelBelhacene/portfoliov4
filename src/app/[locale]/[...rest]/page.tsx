import { notFound } from "next/navigation";

/** Toute route inconnue sous une locale valide rend le 404 localisé. */
export default function CatchAll() {
  notFound();
}
