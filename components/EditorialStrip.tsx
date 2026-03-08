"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EditorialStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scale: 1.1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, stripRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={stripRef} className="relative h-[60vh] overflow-hidden lg:h-[80vh]">
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop"
          alt="Editorial - Autumn Winter 2026"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/30">
        <div className="text-center">
          <span className="mb-4 block font-light uppercase tracking-widest text-zinc-50">
            Autumn/Winter 2026
          </span>
          <h2 className="text-4xl font-bold text-zinc-50 md:text-6xl">
            THE ARCHIVE
          </h2>
        </div>
      </div>
    </section>
  );
}
