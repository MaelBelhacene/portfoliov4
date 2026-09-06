// D'après « Arrow Fill Button » (Hyperiux Vault), réaccordé à la DA « Norme » :
// aucune couleur en dur, tailles sur l'échelle du projet, courbe et durée
// prises dans le thème. Le libellé arrive en prop — pas de traduction ici.
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { ArrowRight } from "lucide-react";

const DEFAULT_HREF = "#";
/* Le survol n'existe pas au doigt : sous cette largeur, l'appui en tient lieu. */
const COMPACT_LAYOUT_BREAKPOINT = 1024;
const ANIMATION_DURATION_MS = 400;

export interface ArrowFillButtonOwnProps {
  btnText: string;
  href?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  fillBgColor?: string;
  fillTextColor?: string;
  hoverFillBgColor?: string;
  hoverFillTextColor?: string;
  arrowColor?: string;
  hoverArrowColor?: string;
}

export type ArrowFillButtonProps = ArrowFillButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ArrowFillButtonOwnProps>;

/* Le bouton et le calque clippé partagent leurs marges : les deux libellés se superposent au pixel. */
const PADDING_X = "pl-4.5 pr-[calc(var(--icon-circle)+var(--icon-right)+0.75rem)] md:pl-5";
const TRANSITION =
  "transition-all duration-[400ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none";
const ARROW =
  "absolute top-1/2 left-1/2 size-4 origin-center text-current transition-transform duration-[400ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none md:size-5";

export default function ArrowFillButton({
  btnText,
  href = DEFAULT_HREF,
  className = "",

  bgColor = "var(--color-accent)",
  textColor = "var(--color-on-accent)",

  fillBgColor = "var(--color-surface-alt)",
  fillTextColor = "var(--color-accent)",

  hoverFillBgColor = "var(--color-surface-alt)",
  hoverFillTextColor = "var(--color-accent-strong)",

  arrowColor,
  hoverArrowColor,

  ...props
}: ArrowFillButtonProps) {
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const releaseTimeoutRef = useRef<number | null>(null);

  const usesUtilityBackground =
    className.includes("bg-") ||
    className.includes("from-") ||
    className.includes("via-") ||
    className.includes("to-");

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${COMPACT_LAYOUT_BREAKPOINT - 1}px)`);

    const syncCompactLayout = (matches: boolean) => {
      setIsCompactLayout(matches);
      if (!matches) {
        setIsPressed(false);
      }
    };

    const handleChange = (event: MediaQueryListEvent) => syncCompactLayout(event.matches);

    syncCompactLayout(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) {
        window.clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  const clearPressedState = () => {
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
    }

    // On laisse le remplissage aller au bout avant de revenir à l'état de repos.
    releaseTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      releaseTimeoutRef.current = null;
    }, ANIMATION_DURATION_MS);
  };

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerDown?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }

    setIsPressed(true);
  };

  const handlePointerRelease = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.type === "pointerup") {
      props.onPointerUp?.(event);
    } else {
      props.onPointerCancel?.(event);
    }

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    clearPressedState();
  };

  return (
    <a
      href={href}
      {...props}
      data-pressed={isPressed ? "true" : "false"}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerRelease}
      onPointerCancel={handlePointerRelease}
      className={`group relative inline-flex h-10 w-fit cursor-pointer items-center justify-center overflow-hidden rounded-full border border-(--btn-bg) font-display text-small leading-none font-medium whitespace-nowrap text-(--btn-text) [--circle-inset-y:calc((100%-var(--icon-circle))/2)] [--icon-circle:1.75rem] [--icon-right:0.3125rem] md:h-12 md:[--icon-circle:2.25rem] ${PADDING_X} ${
        usesUtilityBackground ? "" : "bg-(--btn-bg)"
      } ${className}`}
      style={
        {
          "--btn-bg": bgColor,
          "--btn-text": textColor,
          "--btn-fill-bg": fillBgColor,
          "--btn-fill-text": fillTextColor,
          "--btn-fill-bg-hover": hoverFillBgColor,
          "--btn-fill-text-hover": hoverFillTextColor,
          "--btn-arrow": arrowColor ?? fillTextColor,
          "--btn-arrow-hover": hoverArrowColor ?? hoverFillTextColor,
        } as CSSProperties
      }
    >
      <span className="relative z-1">{btnText}</span>

      {/* Le disque de l'icône, qui s'étend jusqu'à remplir tout le bouton. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-2 rounded-full bg-(--btn-fill-bg) inset-[var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle))] ${TRANSITION} group-hover:inset-0 group-hover:bg-(--btn-fill-bg-hover) group-data-[pressed=true]:inset-0 group-data-[pressed=true]:bg-(--btn-fill-bg-hover)`}
      />

      {/* Le même libellé, clippé sur le disque : il se révèle à mesure du remplissage. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-2 flex items-center text-(--btn-fill-text) [clip-path:inset(var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle)))] ${PADDING_X} ${TRANSITION} group-hover:text-(--btn-fill-text-hover) group-hover:[clip-path:inset(0_0_0_0)] group-data-[pressed=true]:text-(--btn-fill-text-hover) group-data-[pressed=true]:[clip-path:inset(0_0_0_0)]`}
      >
        <span className="relative z-1 whitespace-nowrap">{btnText}</span>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[var(--icon-right)] z-3 inline-flex h-[var(--icon-circle)] w-[var(--icon-circle)] shrink-0 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-(--btn-fill-bg) text-(--btn-arrow) transition-colors duration-[400ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none group-hover:bg-(--btn-fill-bg-hover) group-hover:text-(--btn-arrow-hover) group-data-[pressed=true]:bg-(--btn-fill-bg-hover) group-data-[pressed=true]:text-(--btn-arrow-hover)"
        style={{
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          maskImage: "radial-gradient(white, black)",
        }}
      >
        {/* Deux flèches : celle qui entre par la gauche remplace celle qui sort par la droite. */}
        <ArrowRight
          className={`${ARROW} -translate-y-1/2 translate-x-[-170%] scale-0 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-100 group-data-[pressed=true]:-translate-x-1/2 group-data-[pressed=true]:-translate-y-1/2 group-data-[pressed=true]:scale-100`}
          strokeWidth={1.8}
        />

        <ArrowRight
          className={`${ARROW} -translate-x-1/2 -translate-y-1/2 group-hover:translate-x-[70%] group-hover:-translate-y-1/2 group-hover:scale-0 group-data-[pressed=true]:translate-x-[70%] group-data-[pressed=true]:-translate-y-1/2 group-data-[pressed=true]:scale-0`}
          strokeWidth={1.8}
        />
      </span>
    </a>
  );
}
