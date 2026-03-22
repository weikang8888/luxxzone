"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/app/api/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

function getProductImage(p: Record<string, unknown>): string {
    const fromList = Array.isArray(p.image_list) && p.image_list[0] ? p.image_list[0] : null;
    const fromField = p.image;
    return (fromList ?? fromField ?? PLACEHOLDER_IMAGE) as string;
}

export function useProductSearch(keyword: string, sex_degree: number, options?: { page?: number; limit?: number }) {
    const page = options?.page ?? DEFAULT_PAGE;
    const limit = options?.limit ?? DEFAULT_LIMIT;
    const trimmed = keyword.trim();

    return useQuery({
        queryKey: ["products", "search", trimmed, sex_degree, page, limit],
        queryFn: async () => {
            if (!trimmed) return { data: [], pagination: null };
            const res = await searchProducts(trimmed, sex_degree, { page, limit });
            const raw = res?.data?.data ?? (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
            const data = raw.map((p: Record<string, unknown>) => ({
                id: p.id,
                name: p.title ?? p.name ?? "",
                image: getProductImage(p),
                badge: (() => {
                    const isNew = p.new_tag === 1;
                    const isBestSelling = p.best_selling_tag === 1;
                    if (isNew && isBestSelling) return ["New", "Best Selling"];
                    if (isNew) return "New";
                    if (isBestSelling) return "Best Selling";
                    return (p.badge as string | null) ?? null;
                })(),
            }));
            return { data, pagination: res?.data?.pagination ?? null };
        },
        enabled: trimmed.length > 0,
    });
}
