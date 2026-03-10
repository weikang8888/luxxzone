"use client";

import Image from "next/image";
import { useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen2() {
  const [isVisible, setIsVisible] = useState(true);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const logo = logoRef.current;
    const overlay = overlayRef.current;
    if (!logo || !overlay) return;

    const tl = gsap.timeline();

    // Logo 慢慢消失的 animation
    tl.to(logo, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
    })
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.15,
          ease: "power2.out",
        },
        "-=0.15"
      )
      .call(() => setIsVisible(false));
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-999 flex items-center justify-center bg-white"
      aria-hidden="true"
    >
      <div
        ref={logoRef}
        className="relative h-32 w-64 opacity-100 sm:h-40 sm:w-80 md:h-96 md:w-[55rem] shrink-0"
      >
        <Image
          src="/logo.png"
          alt="Luxxzone"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
        />
      </div>
    </div>
  );
}
