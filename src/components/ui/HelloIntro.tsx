"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { INTRO_STORAGE_KEY } from "@/lib/intro";

/** Respiration après le tracé, puis fondu du rideau. */
const HOLD_MS = 500;
const FADE_MS = 500;
/** Filet de sécurité : le rideau se lève quoi qu’il arrive. */
const FAILSAFE_MS = 5000;

/**
 * Rideau d’ouverture : la signature manuscrite s’écrit plein écran sur
 * charbon, marque un temps, puis s’efface pour découvrir le site.
 *
 * La signature est passée en `children` depuis le layout : c’est un
 * composant serveur, ses tracés SVG ne partent donc jamais dans le bundle
 * client. La fin du tracé est lue sur le dernier trait (marqué
 * `data-hello-last`), sans avoir à faire passer de fonction à travers la
 * frontière serveur/client.
 *
 * Rendu aussi côté serveur — le rideau est présent dès le premier octet de
 * HTML, sans laisser entrevoir la page avant de la recouvrir. Sans
 * JavaScript, le `<noscript>` du layout le masque d’emblée : le site
 * s’affiche directement, jamais de page bloquée.
 *
 * Impatience respectée : un clic, une touche, une molette ou un glissement
 * lèvent le rideau immédiatement. `prefers-reduced-motion` : le mot est
 * rendu d’un coup, sans tracé — l’animation CSS étant alors désactivée,
 * aucun `animationend` n’arrive et c’est la minuterie qui prend le relais.
 */
export default function HelloIntro({ children }: { children: ReactNode }) {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const root = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    setLeaving((already) => {
      if (already) return already;
      timers.current.push(setTimeout(() => setDone(true), FADE_MS));
      return true;
    });
  }, []);

  useEffect(() => {
    // Le tableau n’est jamais réassigné : le capturer ici est sûr et permet
    // au nettoyage de purger aussi les minuteries posées par `dismiss`.
    const pending = timers.current;
    const holdThenDismiss = () => pending.push(setTimeout(dismiss, HOLD_MS));

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(INTRO_STORAGE_KEY) !== null;
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // sessionStorage indisponible (navigation privée) : le rideau se joue.
    }

    // Déjà joué dans cette session : le CSS l’a masqué avant le premier
    // rendu, il ne reste qu’à le sortir du DOM — sans écouteurs ni
    // minuteries d’animation.
    if (alreadySeen) {
      pending.push(setTimeout(() => setDone(true), 0));
      return () => pending.forEach(clearTimeout);
    }

    // On lit l’état du dernier trait plutôt que d’attendre un `animationend` :
    // l’animation CSS démarre au premier rendu, avant l’hydratation, et
    // l’événement serait manqué si celle-ci arrivait après la fin du tracé.
    // `finished` se résout même sur une animation déjà terminée ; un tableau
    // vide signifie qu’il n’y a rien à attendre (mouvement réduit).
    const last = root.current?.querySelector("[data-hello-last]");
    const running = last?.getAnimations?.() ?? [];
    if (running.length === 0) {
      holdThenDismiss();
    } else {
      Promise.all(running.map((animation) => animation.finished))
        .then(holdThenDismiss)
        .catch(() => {});
    }
    pending.push(setTimeout(dismiss, FAILSAFE_MS));

    const opts = { passive: true } as const;
    window.addEventListener("pointerdown", dismiss, opts);
    window.addEventListener("keydown", dismiss, opts);
    window.addEventListener("wheel", dismiss, opts);
    window.addEventListener("touchmove", dismiss, opts);
    return () => {
      pending.forEach(clearTimeout);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
    };
  }, [dismiss]);

  if (done) return null;

  return (
    <div
      ref={root}
      // aria-hidden : décoratif. Le contenu de la page est déjà dans le DOM
      // sous le rideau, un lecteur d’écran n’est jamais bloqué.
      aria-hidden="true"
      className={`intro-curtain fixed inset-0 z-[200] grid place-items-center bg-surface-inverse text-on-inverse ${
        leaving ? "intro-curtain-leaving" : ""
      }`}
    >
      {children}
    </div>
  );
}
