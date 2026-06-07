"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";
import "lenis/dist/lenis.css";
import { LenisProvider } from "@/app/context/LenisContext";

const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (isMobile()) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: true,
    });

    setLenis(lenisInstance);

    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisProvider lenis={lenis}>{children}</LenisProvider>;
}
