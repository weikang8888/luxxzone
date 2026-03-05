"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="border-t border-zinc-200 bg-zinc-50 px-8 py-24 lg:px-16"
    >
      <div
        ref={contentRef}
        className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center"
      >
        <span className="font-light uppercase tracking-widest text-zinc-950">
          Join the House
        </span>
        <h2 className="text-3xl font-bold text-zinc-950 md:text-4xl">
          SUBSCRIBE FOR EXCLUSIVE DROPS
        </h2>
        <p className="text-zinc-600">
          Be the first to access new collections, private sales, and editorial
          content.
        </p>
        <form className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-none border-zinc-950 bg-transparent py-6"
          />
          <Button
            type="submit"
            className="rounded-none bg-zinc-950 px-8 py-6 font-medium uppercase tracking-widest text-zinc-50 hover:bg-zinc-800"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
