import type { MetadataRoute } from "next";
import { tokens } from "@/lib/tokens";
import fr from "../../messages/fr.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: fr.meta.title,
    short_name: "M. Belhacene",
    description: fr.about.quote,
    start_url: "/",
    display: "browser",
    background_color: tokens.surface,
    theme_color: tokens.surface,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
