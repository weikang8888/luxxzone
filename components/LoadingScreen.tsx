"use client";

import Image from "next/image";
import { useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const logo = logoRef.current;
    const overlay = overlayRef.current;
    if (!logo || !overlay) return;

    gsap.set(logo, { scale: 3 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => setIsVisible(false),
        });
      },
    });

    tl.to(logo, {
      scale: 0.5,
      duration: 1,
      ease: "power3.inOut",
    }).call(
      () => {
        const headerLogo = document.getElementById("header-logo");
        if (headerLogo) {
          const headerRect = headerLogo.getBoundingClientRect();
          const logoRect = logo.getBoundingClientRect();
          const x = headerRect.left + headerRect.width / 2 - (logoRect.left + logoRect.width / 2);
          const y = headerRect.top + headerRect.height / 2 - (logoRect.top + logoRect.height / 2);
          const targetScale = (headerRect.width * 0.8) / logoRect.width;

          gsap.to(logo, {
            x,
            y,
            scale: targetScale,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
              tl.progress(1);
            },
          });
        } else {
          tl.progress(1);
        }
      },
      undefined,
      "-=0.1"
    );
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
        className="relative h-32 w-64 sm:h-40 sm:w-80 md:h-48 md:w-96 [transform:translateZ(0)]"
        style={{ transform: "scale(3) translateZ(0)" }}
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
