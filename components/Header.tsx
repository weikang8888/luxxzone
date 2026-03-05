"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200/50 bg-zinc-50/80 backdrop-blur-md"
    >
      <nav className="flex h-16 items-center justify-between px-8 lg:px-16">
        <Link
          href="/"
          className="text-lg font-bold uppercase tracking-widest text-zinc-950"
        >
          Luxxzone
        </Link>
        <div className="flex gap-8">
          <Link
            href="#collection"
            className="text-sm font-medium uppercase tracking-widest text-zinc-950 transition-opacity hover:opacity-60"
          >
            Collection
          </Link>
          <Link
            href="#newsletter"
            className="text-sm font-medium uppercase tracking-widest text-zinc-950 transition-opacity hover:opacity-60"
          >
            Newsletter
          </Link>
        </div>
      </nav>
    </header>
  );
}
