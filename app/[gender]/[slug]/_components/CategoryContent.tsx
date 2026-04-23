"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { PLACEHOLDER_IMAGE, productCanonicalUrl, whatsappPurchaseInquiryHref } from "@/lib/constants";
import { categoryMatchesGender } from "@/lib/categoryGender";
import { nameToSlug } from "@/lib/nameToSlug";
import { useCategories } from "@/app/hooks/useCategories";
import { useProductListInfinite } from "@/app/hooks/useProductListInfinite";

const sortOptions: { label: string; value: string; sort_title?: number; sort_best_selling?: number; sort_new?: number }[] = [
    { label: "Default", value: "default" },
    { label: "Newest", value: "newest", sort_new: 1 },
    // { label: "Best Selling", value: "best-selling", sort_best_selling: 1 },
    { label: "Alphabetical A-Z", value: "alphabetical-a-z", sort_title: 1 },
    { label: "Alphabetical Z-A", value: "alphabetical-z-a", sort_title: 2 },
];

type ProductItem = { id: number; name: string; image?: string; badge?: string | string[] | null };

type Props = {
    gender: "men" | "women";
    slug: string;
    subSlug?: string;
    subSubSlug?: string;
};

export default function CategoryContent({ gender, slug, subSlug, subSubSlug }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState("default");
    const [expandedCatIds, setExpandedCatIds] = useState<Set<number>>(new Set());
    const [collapsedCatIds, setCollapsedCatIds] = useState<Set<number>>(new Set());
    /** Sub-rows that have sub_sub_categories: toggle brand dropdown (`${categoryId}-${subId}`). */
    const [openSubDropdownIds, setOpenSubDropdownIds] = useState<Set<string>>(new Set());

    const limit = 12;
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { data: apiCategories = [] } = useCategories();

    useEffect(() => {
        setCurrentSort(searchParams.get("sort") || "default");
    }, [searchParams]);

    const sexDegree = gender === "men" ? 1 : 2;
    const currentCategory = useMemo(
        () =>
            apiCategories.find(
                (c) => categoryMatchesGender(c.sex_degree, sexDegree) && nameToSlug(c.name) === slug
            ),
        [apiCategories, sexDegree, slug]
    );

    const subCategory = useMemo(() => {
        if (!subSlug || !currentCategory) return undefined;
        return currentCategory.sub_categories.find((s) => nameToSlug(s.name) === subSlug);
    }, [currentCategory, subSlug]);

    const subSubCategory = useMemo(() => {
        if (!subSubSlug || !subCategory) return undefined;
        const triples = subCategory.sub_sub_categories ?? [];
        return triples.find((ss) => nameToSlug(ss.name) === subSubSlug);
    }, [subCategory, subSubSlug]);

    const sub_category_id = subCategory?.id;

    const selectedSort = sortOptions.find((o) => o.value === currentSort);
    const sortParams: { sort_title?: number; sort_best_selling?: number; sort_new?: number } = {};
    if (selectedSort?.sort_title != null) sortParams.sort_title = selectedSort.sort_title;
    else if (selectedSort?.sort_best_selling != null) sortParams.sort_best_selling = selectedSort.sort_best_selling;
    else if (selectedSort?.sort_new != null) sortParams.sort_new = selectedSort.sort_new;

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useProductListInfinite(currentCategory?.id, sexDegree, {
        sub_category_id,
        sub_sub_category_id: subSubCategory?.id,
        limit,
        ...sortParams,
    });

    const products = useMemo(() => data?.pages.flatMap((p) => p.products) ?? [], [data]);

    const totalItemCount =
        (data?.pages[0]?.pagination as { total?: number } | null | undefined)?.total ?? 0;

    const sidebarCategories = useMemo(
        () => apiCategories.filter((c) => categoryMatchesGender(c.sex_degree, sexDegree)),
        [apiCategories, sexDegree]
    );

    const basePath = useMemo(() => {
        if (subSubSlug && subSlug) return `/${gender}/${slug}/${subSlug}/${subSubSlug}`;
        if (subSlug) return `/${gender}/${slug}/${subSlug}`;
        return `/${gender}/${slug}`;
    }, [gender, slug, subSlug, subSubSlug]);

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;
        const el = loadMoreRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) fetchNextPage();
            },
            { rootMargin: "200px", threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleSortSelect = (sortValue: string) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set("sort", sortValue);
        router.push(`${basePath}?${p.toString()}`);
        setIsSortOpen(false);
    };

    const toggleSubBrandDropdown = (panelKey: string) => {
        setOpenSubDropdownIds((prev) => {
            const next = new Set(prev);
            if (next.has(panelKey)) next.delete(panelKey);
            else next.add(panelKey);
            return next;
        });
    };

    /** Expand the brand dropdown when URL is on a sub-sub route. */
    useEffect(() => {
        if (!subSlug || !subSubSlug || !currentCategory) return;
        const sub = currentCategory.sub_categories.find((s) => nameToSlug(s.name) === subSlug);
        const triples = sub?.sub_sub_categories ?? [];
        if (!sub || triples.length === 0) return;
        const key = `${currentCategory.id}-${sub.id}`;
        setOpenSubDropdownIds((prev) => new Set(prev).add(key));
    }, [subSlug, subSubSlug, currentCategory]);

    const toggleSidebarCategory = (catId: number, catSlug: string) => {
        const isCurrentCategory = slug === catSlug;
        if (isCurrentCategory) {
            setCollapsedCatIds((prev) => {
                const next = new Set(prev);
                if (next.has(catId)) next.delete(catId);
                else next.add(catId);
                return next;
            });
        } else {
            setExpandedCatIds((prev) => {
                const next = new Set(prev);
                if (next.has(catId)) next.delete(catId);
                else next.add(catId);
                return next;
            });
        }
    };

    const displayTitle = subSubCategory
        ? subSubCategory.name
        : subCategory
            ? subCategory.name
            : slug.replace(/-/g, " ");

    const breadcrumb = currentCategory
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
                            <h2 className="mb-8 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-300 md:text-[12px]">Navigation</h2>
                            <nav className="flex flex-col space-y-7">
                                {sidebarCategories.map((cat) => {
                                    const catSlug = nameToSlug(cat.name);
                                    const hasSubs = cat.sub_categories.length > 0;
                                    const isCurrentCategory = slug === catSlug;
                                    const isExpanded = isCurrentCategory
                                        ? !collapsedCatIds.has(cat.id)
                                        : expandedCatIds.has(cat.id);
                                    const baseHref = `/${gender}/${catSlug}`;
                                    return (
                                        <div key={cat.id} className="flex flex-col">
                                            <div className="flex items-center justify-between gap-2">
                                                <Link
                                                    href={baseHref}
                                                    className={`text-[10px] font-black uppercase tracking-widest transition-all md:text-[13px] ${slug === catSlug ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                >
                                                    {cat.name}
                                                </Link>
                                                {hasSubs && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            toggleSidebarCategory(cat.id, catSlug);
                                                        }}
                                                        className="-m-1.5 flex shrink-0 cursor-pointer p-1.5 text-zinc-400 transition-colors hover:text-black"
                                                        aria-expanded={isExpanded}
                                                        aria-label={isExpanded ? "Collapse subcategories" : "Expand subcategories"}
                                                    >
                                                        <motion.span
                                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                                            className="block"
                                                        >
                                                            <ChevronDown className="size-[18px]" />
                                                        </motion.span>
                                                    </button>
                                                )}
                                            </div>
                                            <AnimatePresence initial={false}>
                                                {hasSubs && isExpanded && (
                                                    <motion.div
                                                        key={`sub-${cat.id}`}
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <motion.div
                                                            className="mt-6 flex flex-col space-y-4 border-l border-zinc-100 pl-4"
                                                            initial="hidden"
                                                            animate="visible"
                                                            variants={{
                                                                hidden: {},
                                                                visible: {
                                                                    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
                                                                },
                                                            }}
                                                        >
                                                            <motion.div variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}>
                                                                <Link
                                                                    href={baseHref}
                                                                    className={`text-[10px] font-bold uppercase tracking-widest md:text-[11px] ${slug === catSlug && !subSlug ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                                >
                                                                    Shop All
                                                                </Link>
                                                            </motion.div>
                                                            {cat.sub_categories.map((sub) => {
                                                                const subHref = `/${gender}/${catSlug}/${nameToSlug(sub.name)}`;
                                                                const triples = sub.sub_sub_categories ?? [];
                                                                if (triples.length === 0) {
                                                                    const isActive =
                                                                        slug === catSlug &&
                                                                        sub_category_id === sub.id &&
                                                                        !subSubSlug;
                                                                    return (
                                                                        <motion.div
                                                                            key={sub.id}
                                                                            variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                                                                        >
                                                                            <Link
                                                                                href={subHref}
                                                                                className={`text-[10px] font-bold uppercase tracking-widest md:text-[11px] ${isActive ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                                            >
                                                                                {sub.name}
                                                                            </Link>
                                                                        </motion.div>
                                                                    );
                                                                }
                                                                const parentActive =
                                                                    slug === catSlug &&
                                                                    sub_category_id === sub.id &&
                                                                    (!subSubSlug ||
                                                                        triples.some(
                                                                            (ss) =>
                                                                                nameToSlug(ss.name) ===
                                                                                subSubSlug
                                                                        ));
                                                                const subPanelKey = `${cat.id}-${sub.id}`;
                                                                const isBrandDropdownOpen =
                                                                    openSubDropdownIds.has(subPanelKey);
                                                                return (
                                                                    <div key={sub.id} className="flex flex-col">
                                                                        <motion.div
                                                                            variants={{
                                                                                hidden: { opacity: 0, x: -8 },
                                                                                visible: { opacity: 1, x: 0 },
                                                                            }}
                                                                            className="flex items-start justify-between gap-1"
                                                                        >
                                                                            <Link
                                                                                href={subHref}
                                                                                className={`min-w-0 flex-1 text-[10px] font-bold uppercase tracking-widest md:text-[11px] ${parentActive ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                                            >
                                                                                {sub.name}
                                                                            </Link>
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    toggleSubBrandDropdown(subPanelKey);
                                                                                }}
                                                                                aria-expanded={isBrandDropdownOpen}
                                                                                aria-label={
                                                                                    isBrandDropdownOpen
                                                                                        ? "Collapse brands"
                                                                                        : "Expand brands"
                                                                                }
                                                                                className="-m-1 shrink-0 cursor-pointer p-1 text-zinc-400 transition-colors hover:text-black"
                                                                            >
                                                                                <motion.span
                                                                                    animate={{
                                                                                        rotate: isBrandDropdownOpen
                                                                                            ? 180
                                                                                            : 0,
                                                                                    }}
                                                                                    transition={{
                                                                                        duration: 0.25,
                                                                                        ease: "easeInOut",
                                                                                    }}
                                                                                    className="block"
                                                                                >
                                                                                    <ChevronDown className="size-[14px] md:size-4" />
                                                                                </motion.span>
                                                                            </button>
                                                                        </motion.div>
                                                                        <AnimatePresence initial={false}>
                                                                            {isBrandDropdownOpen && (
                                                                                <motion.div
                                                                                    key={`brands-${subPanelKey}`}
                                                                                    initial={{
                                                                                        height: 0,
                                                                                        opacity: 0,
                                                                                    }}
                                                                                    animate={{
                                                                                        height: "auto",
                                                                                        opacity: 1,
                                                                                    }}
                                                                                    exit={{
                                                                                        height: 0,
                                                                                        opacity: 0,
                                                                                    }}
                                                                                    transition={{
                                                                                        duration: 0.28,
                                                                                        ease: [
                                                                                            0.25, 0.46, 0.45,
                                                                                            0.94,
                                                                                        ],
                                                                                    }}
                                                                                    className="overflow-hidden"
                                                                                >
                                                                                    <div className="mt-3 flex flex-col gap-3 border-l border-zinc-100 py-1 pl-3">
                                                                                        {triples.map((ss) => {
                                                                                            const ssHref = `${subHref}/${nameToSlug(ss.name)}`;
                                                                                            const ssSlug =
                                                                                                nameToSlug(ss.name);
                                                                                            const isSsActive =
                                                                                                slug ===
                                                                                                    catSlug &&
                                                                                                sub_category_id ===
                                                                                                    sub.id &&
                                                                                                subSubSlug ===
                                                                                                    ssSlug;
                                                                                            return (
                                                                                                <Link
                                                                                                    key={ss.id}
                                                                                                    href={ssHref}
                                                                                                    className={`text-[10px] font-bold uppercase tracking-widest md:text-[11px] ${isSsActive ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                                                                >
                                                                                                    {ss.name}
                                                                                                </Link>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                </motion.div>
                                                                            )}
                                                                        </AnimatePresence>
                                                                    </div>
                                                                );
                                                            })}
                                                        </motion.div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
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
                            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300 md:text-[12px]">{breadcrumb}</span>
                            <h1 className="text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">{displayTitle}</h1>
                        </div>

                        <div className="flex items-end justify-between md:items-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 md:text-[11px]">
                                Total: {totalItemCount} <span className="hidden sm:inline">Items</span>
                            </p>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 border-b-2 border-black pb-1 text-[10px] font-black uppercase tracking-widest md:text-[12px]"
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
                                                    className={`text-[11px] font-bold uppercase tracking-widest ${currentSort === o.value ? "text-black" : "text-zinc-400 hover:text-black"}`}
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
                                <div key={i} className="aspect-3/4 animate-pulse bg-zinc-100" />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                                },
                            }}
                            className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10"
                        >
                            {(products as ProductItem[]).map((p) => (
                                <motion.div
                                    key={p.id}
                                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="group flex flex-col"
                                >
                                    <div className="relative aspect-3/4 mb-6 overflow-hidden bg-zinc-50 transition-transform duration-500 hover:shadow-xl">
                                        <Link href={`/product/${p.id}`}>
                                            <Image
                                                src={p.image ?? PLACEHOLDER_IMAGE}
                                                alt={p.name}
                                                fill
                                                className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                quality={80}
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
                                        <h3 className="mb-1 truncate text-[11px] font-black uppercase tracking-widest text-zinc-950 md:text-[15px]">
                                            {p.name}
                                        </h3>
                                        <p className="text-[10px] font-medium italic tracking-[0.2em] text-zinc-400 md:text-[13px]">
                                            Seasonal Edition
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <a
                                            href={whatsappPurchaseInquiryHref(p.name, productCanonicalUrl(p.id))}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-3 bg-[#25D366] py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-[#20ba5a] active:scale-95 shadow-sm md:text-[12px]"
                                        >
                                            <MessageCircle className="size-4" />
                                            <span>INQUIRE NOW</span>
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {hasNextPage && (
                        <div ref={loadMoreRef} className="min-h-[120px] py-12">
                            {isFetchingNextPage && (
                                <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="aspect-3/4 animate-pulse bg-zinc-100" />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
