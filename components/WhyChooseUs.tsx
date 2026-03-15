"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Shield, CreditCard, Truck, Headphones } from "lucide-react";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 1024;

const pillars = [
  {
    icon: Shield,
    label: "Authentic Products",
    description: "Every item is verified for authenticity. Shop with confidence knowing you're getting genuine luxury.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    alt: "Authentic luxury products",
  },
  {
    icon: CreditCard,
    label: "Secure Payment",
    description: "Your transactions are protected with industry-leading encryption. Safe and secure checkout every time.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
    alt: "Secure payment processing",
  },
  {
    icon: Truck,
    label: "Worldwide Shipping",
    description: "We deliver to over 150 countries. Fast, reliable shipping with full tracking and insurance.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop",
    alt: "Worldwide delivery",
  },
  {
    icon: Headphones,
    label: "Customer Support",
    description: "Our dedicated team is here 24/7 to assist you. Premium service from inquiry to aftercare.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    alt: "Dedicated customer support",
  },
];

function PillarCard({
  icon: Icon,
  label,
  description,
  image,
  alt,
  showHoverAsActive,
}: (typeof pillars)[0] & { showHoverAsActive?: boolean }) {
  return (
    <div className="group relative h-[260px] overflow-hidden bg-zinc-950 sm:h-[320px] md:h-[420px] lg:h-[500px] xl:h-[600px]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 ${showHoverAsActive ? "scale-105 grayscale-0" : ""}`}
        />
        <div
          className={`absolute inset-0 bg-linear-to-t to-transparent transition-opacity duration-500 ${
            showHoverAsActive
              ? "from-zinc-950/95 via-zinc-950/60"
              : "from-zinc-950/90 via-zinc-950/20 group-hover:from-zinc-950/95 group-hover:via-zinc-950/60"
          }`}
        />
      </div>
      <div className="relative flex h-full flex-col justify-end p-4 text-zinc-50 sm:p-6 lg:p-8">
        <div
          className={`transition-transform duration-500 ease-out ${
            showHoverAsActive ? "-translate-y-2" : "group-hover:-translate-y-2"
          }`}
        >
          <div
            className={`mb-3 inline-flex size-9 items-center justify-center border transition-colors duration-500 sm:mb-4 sm:size-10 lg:mb-6 lg:size-12 ${
              showHoverAsActive ? "border-zinc-50" : "border-zinc-50/30 group-hover:border-zinc-50"
            }`}
          >
            <Icon className="size-4 sm:size-5" strokeWidth={1} />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-50 sm:text-xs lg:text-sm">
            {label}
          </h3>
        </div>
        <div
          className={`grid transition-all duration-500 ease-out ${
            showHoverAsActive ? "grid-rows-[1fr]" : "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p
              className={`mt-2 text-[10px] leading-relaxed tracking-wide text-zinc-300 transition-opacity duration-500 delay-100 sm:mt-3 sm:text-xs lg:mt-4 ${
                showHoverAsActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
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
      className="border-t border-zinc-200 bg-zinc-50 py-8 sm:p-12 lg:p-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <span
          ref={labelRef}
          className="mb-2 block text-center text-xs font-medium uppercase tracking-[0.35em] text-zinc-500 sm:mb-4 sm:text-sm sm:tracking-[0.4em]"
        >
          The House Difference
        </span>
        <h2
          ref={titleRef}
          className="mb-10 text-center text-2xl font-bold uppercase tracking-tighter text-zinc-950 sm:mb-14 sm:text-3xl md:text-4xl lg:mb-20 lg:text-5xl xl:text-6xl"
        >
          WHY CHOOSE US
        </h2>

        {/* Mobile: Swiper 一屏看 2 个 | Desktop: 原网格 */}
        <div ref={contentRef}>
          {isMobile ? (
            <Swiper
                slidesPerView={2}
                spaceBetween={0}
                className="overflow-visible!"
              >
                {pillars.map((pillar) => (
                  <SwiperSlide key={pillar.label}>
                    <PillarCard {...pillar} showHoverAsActive />
                  </SwiperSlide>
                ))}
              </Swiper>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {pillars.map((pillar) => (
                <PillarCard key={pillar.label} {...pillar} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}