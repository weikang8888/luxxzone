"use client";

import { useQuery } from "@tanstack/react-query";
import { getNewestProduct, getBestSellerProduct } from "@/app/api/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

function getProductImage(p: Record<string, unknown>): string {
    const fromList = Array.isArray(p.image_list) && p.image_list[0] ? p.image_list[0] : null;
    const fromField = p.image;
    return (fromList ?? fromField ?? PLACEHOLDER_IMAGE) as string;
}

function mapProduct(p: Record<string, unknown>) {
    return {
        id: p.id as number,
        name: (p.title ?? p.name ?? "") as string,
        image: getProductImage(p),
        badge: p.best_selling_tag ? "Best Selling" : p.new_tag ? "New" : (p.badge as string | null) ?? null,
    };
}

function extractData(res: unknown): Record<string, unknown>[] {
    const r = res as { data?: { data?: unknown } | unknown[] };
    if (r?.data && typeof r.data === "object") {
        const d = (r.data as { data?: unknown }).data ?? r.data;
        return Array.isArray(d) ? d : [];
    }
    return [];
}

export function useFeaturedProducts(limit = 6) {
    return useQuery({
        queryKey: ["featuredProducts", limit],
        queryFn: async () => {
            const [newestRes, bestSellerRes] = await Promise.all([
                getNewestProduct(),
                getBestSellerProduct(),
            ]);
            const newest = extractData(newestRes).map(mapProduct);
            const bestSellers = extractData(bestSellerRes).map(mapProduct);
            const seen = new Set<number>();
            const merged: { id: number; name: string; image: string; badge: string | null }[] = [];
            for (const p of [...newest, ...bestSellers]) {
                if (!seen.has(p.id)) {
                    seen.add(p.id);
                    merged.push(p);
                }
            }
            return merged.slice(0, limit);
        },
    });
}
