"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Oversized Wool Coat",
    price: "¥4,200",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    badge: "New",
  },
  {
    id: 2,
    name: "Structured Blazer",
    price: "¥3,800",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 3,
    name: "Wide-Leg Trousers",
    price: "¥1,950",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    badge: "Best Seller",
  },
];

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      gsap.from(cardsRef.current?.children ?? [], {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
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
      className="bg-zinc-950 px-8 py-24 lg:px-16"
    >
      <h2
        ref={titleRef}
        className="mb-16 text-center font-light uppercase tracking-widest text-zinc-50"
      >
        Featured Pieces
      </h2>

      <div
        ref={cardsRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <Card
            key={product.id}
            className="group overflow-hidden rounded-none border-zinc-800 bg-transparent"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              {product.badge && (
                <Badge
                  variant="secondary"
                  className="absolute left-4 top-4 rounded-none border-zinc-600 bg-zinc-900/90 text-zinc-100"
                >
                  {product.badge}
                </Badge>
              )}
            </div>
            <CardContent className="p-6">
              <p className="font-medium text-zinc-100">{product.name}</p>
              <p className="text-sm text-zinc-400">{product.price}</p>
            </CardContent>
            <CardFooter className="border-t border-zinc-800 p-6 pt-0">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full rounded-none border-zinc-600 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50"
              >
                <Link href="#">View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
