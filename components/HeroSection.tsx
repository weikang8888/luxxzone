"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });
      gsap.from(btnRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.7,
      });
      gsap.from(imageRef.current, {
        scale: 1.08,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Column - Typography & CTA */}
      <div className="flex flex-col justify-center bg-zinc-50 px-8 py-16 lg:px-16 lg:py-24">
        <span
          ref={labelRef}
          className="mb-6 font-light uppercase tracking-widest text-zinc-950"
        >
          Spring/Summer 2026
        </span>

        <h1
          ref={headlineRef}
          className="mb-12 max-w-2xl text-5xl font-bold leading-[1.1] text-zinc-950 md:text-6xl lg:text-7xl xl:text-8xl"
        >
          REDEFINE THE SILHOUETTE
        </h1>

        <div ref={btnRef}>
          <Button
            asChild
            variant="outline"
            className="w-fit rounded-none border-zinc-950 px-8 py-6 font-medium uppercase tracking-widest text-zinc-950 transition-colors duration-500 hover:bg-zinc-950 hover:text-zinc-50"
          >
            <Link href="#collection">Discover Collection</Link>
          </Button>
        </div>
      </div>

      {/* Right Column - Fashion Image */}
      <div ref={imageRef} className="relative h-[50vh] overflow-hidden lg:h-screen">
        <Image
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
          alt="Fashion model - Spring Summer 2026 collection"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover grayscale"
          priority
        />
      </div>
    </section>
  );
}
