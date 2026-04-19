"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { PLACEHOLDER_IMAGE, productCanonicalUrl, whatsappPurchaseInquiryHref } from "@/lib/constants";
import { useProductSearch } from "@/app/hooks/useProductSearch";

function SearchContent() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q") ?? "";
    const genderParam = searchParams.get("gender");
    const gender = genderParam === "women" ? "women" : "men";
    const sexDegree = gender === "men" ? 1 : 2;
    const page = parseInt(searchParams.get("page") || "1", 10);

    const { data, isLoading } = useProductSearch(q, sexDegree, { page, limit: 12 });
    const products = data?.data ?? [];
    const pagination = data?.pagination;

    if (!q.trim()) {
        return (
            <main className="min-h-screen bg-white pb-20 pt-24 md:pt-40">
                <div className="mx-auto max-w-[1920px] px-6 md:px-16">
                    <p className="text-zinc-500">Enter a search term above.</p>
                    <Link href="/" className="mt-4 inline-block text-sm font-bold uppercase tracking-widest underline">
                        Back to home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white pb-20 pt-24 md:pt-40">
            <div className="mx-auto max-w-[1920px] px-6 md:px-16">
                <div className="mb-12 border-b border-zinc-100 pb-10">
                    <span className="mb-4 block text-[10px] md:text-[12px] font-bold uppercase tracking-[0.5em] text-zinc-300">
                        Luxxzone / Search
                    </span>
                    <h1 className="text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
                        Results for &quot;{q}&quot;
                    </h1>
                    <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-zinc-400">
                        Total: {pagination?.total ?? products.length} Items
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-3/4 animate-pulse bg-zinc-100" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <p className="py-16 text-zinc-500">No products found for &quot;{q}&quot;</p>
                ) : (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
                        {products.map((p: { id: number; name: string; image?: string; badge?: string | string[] | null }) => (
                            <div key={p.id} className="group flex flex-col">
                                <div className="relative aspect-3/4 mb-6 overflow-hidden bg-zinc-50 transition-transform duration-500 hover:shadow-xl">
                                    <Link href={`/product/${p.id}`}>
                                        <Image
                                            src={p.image ?? PLACEHOLDER_IMAGE}
                                            alt={p.name}
                                            fill
                                            className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </Link>
                                    {p.badge && (
                                        <div className="absolute left-0 top-4 flex flex-wrap gap-1">
                                            {(Array.isArray(p.badge) ? p.badge : [p.badge]).map((b) => (
                                                <span key={b} className="bg-black px-2 py-1 text-[8px] font-black uppercase tracking-widest text-white">
                                                    {b}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-5 px-1">
                                    <h3 className="mb-1 truncate text-[10px] md:text-[12px] font-black uppercase tracking-widest text-zinc-950">
                                        {p.name}
                                    </h3>
                                    <p className="text-[9px] font-medium italic tracking-[0.2em] text-zinc-400">Seasonal Edition</p>
                                </div>
                                <div className="mt-auto">
                                    <a
                                        href={whatsappPurchaseInquiryHref(p.name, productCanonicalUrl(p.id))}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-3 bg-[#25D366] py-3 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-white shadow-sm transition-all hover:bg-[#20ba5a] active:scale-95"
                                    >
                                        <MessageCircle className="size-4" />
                                        <span>INQUIRE NOW</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-white pb-20 pt-24 md:pt-40">
                <div className="mx-auto max-w-[1920px] px-6 md:px-16">
                    <div className="h-12 animate-pulse bg-zinc-100 w-48 mb-8" />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-3/4 animate-pulse bg-zinc-100" />
                        ))}
                    </div>
                </div>
            </main>
        }>
            <SearchContent />
        </Suspense>
    );
}
