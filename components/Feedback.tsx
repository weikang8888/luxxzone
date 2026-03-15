"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import feedbackImg from "@/public/feedback.png";
import feedbackImg2 from "@/public/feedback-2.jpg";
import feedbackImg3 from "@/public/feedback-3.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

const feedbackImages = [feedbackImg, feedbackImg2, feedbackImg3];

const testimonials = [
  {
    quote: "The craftsmanship is extraordinary. Every stitch speaks of quality. This is what luxury should feel like.",
    name: "Elena Chen",
    detail: "Oversized Wool Coat",
  },
  {
    quote: "From the packaging to the fit, everything exceeded my expectations. Luxxzone has earned a lifelong customer.",
    name: "Marcus Laurent",
    detail: "Structured Blazer",
  },
  {
    quote: "Finally, a brand that understands sustainable luxury. Beautiful pieces that don't compromise on ethics.",
    name: "Sofia Nakamura",
    detail: "Wide-Leg Trousers",
  },
];

export default function Feedback() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleGroupRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(swiperRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
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
    <section ref={sectionRef} className="bg-zinc-950 p-8 sm:p-12 lg:p-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <div ref={titleGroupRef} className="shrink-0 lg:w-[260px]">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.35em] text-zinc-500 sm:text-sm sm:tracking-[0.4em]">
            Clientele
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-zinc-50 sm:text-3xl md:text-4xl lg:text-5xl">
            THE HOUSE <br /> COMMUNITY
          </h2>
          <div className="mt-8 hidden gap-3 lg:flex">
            <button
              className="feedback-prev flex size-10 items-center justify-center border border-zinc-800 bg-transparent text-zinc-500 transition-colors duration-500 hover:border-zinc-50 hover:text-zinc-50 lg:size-12"
              aria-label="Previous"
            >
              <svg className="size-4 lg:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="feedback-next flex size-10 items-center justify-center border border-zinc-800 bg-transparent text-zinc-500 transition-colors duration-500 hover:border-zinc-50 hover:text-zinc-50 lg:size-12"
              aria-label="Next"
            >
              <svg className="size-4 lg:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={swiperRef} className="flex-1 overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".feedback-prev",
              nextEl: ".feedback-next",
            }}
            className="h-full"
          >
            {testimonials.map(({ quote, name, detail }, index) => (
              <SwiperSlide key={name}>
                <div className="group flex flex-col items-center gap-8 border border-zinc-700 bg-zinc-900 p-6 transition-colors duration-500 lg:border-zinc-800/50 lg:bg-zinc-900/30 lg:hover:border-zinc-700 lg:hover:bg-zinc-900 lg:flex-row lg:items-start lg:gap-10 lg:p-8">
                  <div className="relative aspect-9/16 w-full shrink-0 overflow-hidden bg-zinc-800 shadow-xl sm:w-[220px] lg:w-[260px]">
                    <Image
                      src={feedbackImages[index]}
                      alt={`Feedback from ${name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover object-top transition-all duration-700 ease-out scale-105 grayscale-0 lg:scale-100 lg:grayscale lg:group-hover:scale-105 lg:group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-zinc-950/20 opacity-0 transition-opacity duration-500 lg:opacity-100 lg:group-hover:opacity-0" />
                  </div>

                  <div className="flex-1 lg:pt-4">
                    <span className="mb-4 hidden lg:block font-serif text-5xl leading-none text-zinc-800 sm:text-6xl">
                      &ldquo;
                    </span>
                    <blockquote className="mb-6 text-base font-light leading-[1.6] tracking-wide text-zinc-100 sm:text-lg md:text-xl lg:text-2xl">
                      {quote}
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-px w-8 bg-zinc-700" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-50 sm:text-sm">
                          {name}
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
                          {detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex justify-center gap-3 lg:hidden">
            <button className="feedback-prev flex size-10 items-center justify-center border border-zinc-800 text-zinc-500 hover:text-zinc-50" aria-label="Previous">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="feedback-next flex size-10 items-center justify-center border border-zinc-800 text-zinc-500 hover:text-zinc-50" aria-label="Next">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
