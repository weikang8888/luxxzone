"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 1024; // 仅 < lg 时用 Swiper

const WHATSAPP_NUMBER = "6581234567";

const products = [
  {
    id: 1,
    name: "Oversized Wool Coat",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    badge: "New",
  },
  {
    id: 2,
    name: "Structured Blazer",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 3,
    name: "Wide-Leg Trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Oversized Wool Coat",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    badge: "New",
  },
  {
    id: 5,
    name: "Structured Blazer",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 6,
    name: "Wide-Leg Trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    badge: "Best Seller",
  },
];

function ProductCard({
  product,
  showHoverAsActive,
}: {
  product: (typeof products)[0];
  showHoverAsActive?: boolean;
}) {
  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-3/4 overflow-hidden bg-zinc-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 85vw, 33vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 ${showHoverAsActive ? "scale-105 grayscale-0" : ""
            }`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-500 group-hover:bg-zinc-950/20 ${showHoverAsActive ? "bg-zinc-950/20" : "bg-zinc-950/0"
            }`}
        />
        {product.badge && (
          <Badge
            className="absolute left-2 top-2 rounded-none bg-zinc-50 px-2 py-0.5 text-[8px] uppercase tracking-widest text-zinc-950 hover:bg-zinc-200 sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[10px]"
          >
            {product.badge}
          </Badge>
        )}
        <div
          className={`absolute bottom-2 left-2 right-2 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:left-4 sm:right-4 ${showHoverAsActive
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
            }`}
        >
          <Button
            asChild
            className="w-full rounded-none bg-zinc-50 py-4 text-[10px] font-medium uppercase tracking-widest text-zinc-950 hover:bg-zinc-200 sm:py-6 sm:text-xs"
          >
            <Link href="#">View Details</Link>
          </Button>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between sm:mt-4">
        <h3 className="text-[10px] font-medium uppercase tracking-widest text-zinc-100 sm:text-xs">
          {product.name}
        </h3>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
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
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="bg-zinc-950 px-6 py-8 lg:px-16 lg:py-24"
    >
      <h2
        ref={titleRef}
        className="mb-10 text-center text-2xl font-light uppercase tracking-widest text-zinc-50 sm:mb-12 sm:text-3xl lg:mb-16"
      >
        Featured Pieces
      </h2>

      <div ref={contentRef} className="mx-auto max-w-[1400px] px-2 sm:px-4">
        {isMobile ? (
          <Swiper
            effect="coverflow"
            modules={[EffectCoverflow, Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            className="[&_.swiper-slide]:z-0 [&_.swiper-slide-active]:z-10"
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="w-[72%]! sm:w-[55%]! md:w-[45%]!"
              >
                {({ isActive }) => (
                  <ProductCard
                    product={product}
                    showHoverAsActive={isActive}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}