"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useCategories } from "@/app/hooks/useCategories";
import { useProductList } from "@/app/hooks/useProductList";

function nameToSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

const sortOptions = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Price: Low to High", value: "price-asc" },
];

type ProductItem = { id: number; name: string; image?: string; badge?: string | null };

export default function CategoryPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState("newest");

    const gender = (params.gender === "men" || params.gender === "women") ? params.gender : "men";
    const slug = typeof params.slug === "string" ? params.slug : "";
    const subParam = searchParams.get("sub");
    const sub_category_id = subParam ? parseInt(subParam, 10) : undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const { data: apiCategories = [] } = useCategories();

    useEffect(() => {
        setCurrentSort(searchParams.get("sort") || "newest");
    }, [searchParams]);

    const sexDegree = gender === "men" ? 1 : 2;
    const currentCategory = useMemo(
        () => apiCategories.find((c) => c.sex_degree === sexDegree && nameToSlug(c.name) === slug),
        [apiCategories, sexDegree, slug]
    );

    const { data: products = [], isLoading } = useProductList(currentCategory?.id, sexDegree, {
        sub_category_id,
        page,
        limit,
    });

    const sidebarCategories = useMemo(
        () => apiCategories.filter((c) => c.sex_degree === sexDegree),
        [apiCategories, sexDegree]
    );

    const basePath = `/${gender}/${slug}`;
    const fullPath = subParam ? `${basePath}?sub=${subParam}` : basePath;

    const handleSortSelect = (sortValue: string) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set("sort", sortValue);
        router.push(`${basePath}?${p.toString()}`);
        setIsSortOpen(false);
    };

    const displayTitle = sub_category_id && currentCategory
        ? currentCategory.sub_categories.find((s) => s.id === sub_category_id)?.name ?? slug.replace(/-/g, " ")
        : slug.replace(/-/g, " ");

    const breadcrumb = sub_category_id && currentCategory
        ? `Luxxzone / ${gender} / ${currentCategory.name}`
        : `Luxxzone / ${gender}`;

    return (
        <main className="min-h-screen bg-white pb-20 pt-24 md:pt-32 lg:pt-40">
            <div className="mx-auto flex max-w-[1920px] flex-col gap-10 px-6 md:flex-row md:px-16">

                {/* --- 1. Sidebar --- */}
                <aside className="hidden w-64 shrink-0 md:block">
                    <div className="sticky top-40">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.05 }}
                            className="mb-12"
                        >
                            <h2 className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Navigation</h2>
                            <nav className="flex flex-col space-y-7">
                                {sidebarCategories.map((cat) => {
                                    const catSlug = nameToSlug(cat.name);
                                    const hasSubs = cat.sub_categories.length > 0;
                                    const isExpanded = slug === catSlug;
                                    const baseHref = `/${gender}/${catSlug}`;
                                    return (
                                        <div key={cat.id} className="flex flex-col">
                                            <div className="flex items-center justify-between">
                                                <Link
                                                    href={baseHref}
                                                    className={`text-[11px] font-black uppercase tracking-widest transition-all ${slug === catSlug ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                >
                                                    {cat.name}
                                                </Link>
                                                {hasSubs && (
                                                    <ChevronDown className={`size-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                                )}
                                            </div>
                                            {hasSubs && isExpanded && (
                                                <div className="mt-6 flex flex-col space-y-4 border-l border-zinc-100 pl-4">
                                                    <Link
                                                        href={baseHref}
                                                        className={`text-[9px] font-bold uppercase tracking-widest ${slug === catSlug && !sub_category_id ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                    >
                                                        Shop All
                                                    </Link>
                                                    {cat.sub_categories.map((sub) => (
                                                        <Link
                                                            key={sub.id}
                                                            href={`/${gender}/${catSlug}?sub=${sub.id}`}
                                                            className={`text-[9px] font-bold uppercase tracking-widest ${sub_category_id === sub.id ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    </div>
                </aside>

                {/* --- 2. Main Content --- */}
                <section className="flex-1 min-w-0">
                    <div className="mb-12 flex flex-col border-b border-zinc-100 pb-10">
                        <div className="mb-8">
                            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300">{breadcrumb}</span>
                            <h1 className="text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">{displayTitle}</h1>
                        </div>

                        <div className="flex items-end justify-between md:items-center">
                            <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                                Total: {products.length} <span className="hidden sm:inline">Items</span>
                            </p>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 border-b-2 border-black pb-1 text-[10px] font-black uppercase tracking-widest"
                                >
                                    Sort: {sortOptions.find(o => o.value === currentSort)?.label}
                                    <ChevronDown className={`size-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isSortOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-4 w-56 bg-white p-6 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="flex flex-col gap-4 text-right">
                                            {sortOptions.map((o) => (
                                                <button
                                                    key={o.value}
                                                    onClick={() => handleSortSelect(o.value)}
                                                    className={`text-[9px] font-bold uppercase tracking-widest ${currentSort === o.value ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                >
                                                    {o.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="aspect-[3/4] animate-pulse bg-zinc-100" />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1, delayChildren: 0 },
                                },
                            }}
                            className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10"
                        >
                            {(products as ProductItem[]).map((p) => (
                                <motion.div
                                    key={p.id}
                                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="group flex flex-col"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50 mb-6 transition-transform duration-500 hover:shadow-xl">
                                        <Link href={`/product/${p.id}`}>
                                            <Image
                                                src={p.image ?? "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800"}
                                                alt={p.name}
                                                fill
                                                className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                        </Link>
                                        {p.badge && (
                                            <span className="absolute left-0 top-4 bg-black px-2 py-1 text-[8px] font-black uppercase tracking-widest text-white">
                                                {p.badge}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-5 px-1">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 truncate text-zinc-950">
                                            {p.name}
                                        </h3>
                                        <p className="text-[9px] font-medium tracking-[0.2em] text-zinc-400 italic">
                                            Seasonal Edition
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <a
                                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I am interested in ${p.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-3 bg-[#25D366] py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all active:scale-95 hover:bg-[#20ba5a] shadow-sm"
                                        >
                                            <MessageCircle className="size-4" />
                                            <span>INQUIRE NOW</span>
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </section>
            </div>
        </main>
    );
}
