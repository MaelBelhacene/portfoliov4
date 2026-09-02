"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Phase = "init" | "hidden" | "shown";

/**
 * Reveal : fondu + 12 px de translation, une seule fois, à l’entrée du
 * viewport (IntersectionObserver + transitions CSS, voir globals.css).
 * Progressif : le HTML serveur est visible — sans JavaScript ou en
 * prefers-reduced-motion, rien n’est masqué.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("init");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Déjà à l’écran : ne rien animer
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setPhase("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={phase}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
