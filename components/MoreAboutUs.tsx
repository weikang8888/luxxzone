"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export default function MoreAboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🌟 核心升级：不让整个框一起出，而是让里面的元素（标签、标题、正文、按钮）逐个瀑布流式浮现
      gsap.from(contentRef.current?.children ?? [], {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15, // 每个元素间隔 0.15 秒出现
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
      id="more-about-us"
      className="border-t border-zinc-200 bg-zinc-50 p-8 sm:p-12 lg:p-16"
    >
      <div
        ref={contentRef}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:gap-8"
      >
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-zinc-500 sm:text-sm sm:tracking-[0.4em]">
          Stay Connected
        </span>

        <h2 className="text-3xl font-bold uppercase tracking-tighter text-zinc-950 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          THE LUXXZONE <br /> COMMUNITY
        </h2>

        <p className="max-w-xl text-sm text-zinc-500 sm:text-base md:text-lg">
          Join our community for exclusive drops, behind-the-scenes content, and
          direct updates from the House of Luxxzone.
        </p>

        <Button
          asChild
          variant="outline"
          className="mt-2 inline-flex items-center gap-2 rounded-none border border-zinc-950 bg-zinc-950 px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-50 transition-colors duration-500 sm:gap-3 sm:px-8 sm:py-6 sm:text-sm lg:bg-transparent lg:text-zinc-950 lg:hover:bg-zinc-950 lg:hover:text-zinc-50"
        >
          <Link
            href="https://t.me/luxxzone"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon className="size-4 sm:size-5" />
            Join Our Telegram
          </Link>
        </Button>
      </div>
    </section>
  );
}