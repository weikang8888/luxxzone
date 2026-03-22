"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { showProductList } from "@/app/api/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

const DEFAULT_LIMIT = 12;

function getProductImage(p: Record<string, unknown>): string {
    const fromList = Array.isArray(p.image_list) && p.image_list[0] ? p.image_list[0] : null;
    const fromField = p.image;
    return (fromList ?? fromField ?? PLACEHOLDER_IMAGE) as string;
}

function getBadges(p: Record<string, unknown>): string | string[] | null {
    const isNew = p.new_tag === 1;
    const isBestSelling = p.best_selling_tag === 1;
    if (isNew && isBestSelling) return ["New", "Best Selling"];
    if (isNew) return "New";
    if (isBestSelling) return "Best Selling";
    return (p.badge as string | null) ?? null;
}

function mapProduct(p: Record<string, unknown>) {
    return {
        id: p.id as number,
        name: (p.title ?? p.name ?? "") as string,
        image: getProductImage(p),
        badge: getBadges(p),
    };
}

export function useProductListInfinite(
    category_id: number | undefined,
    sex_degree: number,
    options?: { sub_category_id?: number; limit?: number; sort_title?: number; sort_best_selling?: number; sort_new?: number }
) {
    const limit = options?.limit ?? DEFAULT_LIMIT;

    return useInfiniteQuery({
        queryKey: ["products", "infinite", category_id, sex_degree, options?.sub_category_id ?? null, limit, options?.sort_title, options?.sort_best_selling, options?.sort_new],
        queryFn: async ({ pageParam }) => {
            if (category_id == null) return { products: [], pagination: null };
            const res = await showProductList(category_id, sex_degree, {
                sub_category_id: options?.sub_category_id,
                page: pageParam,
                limit,
                sort_title: options?.sort_title,
                sort_best_selling: options?.sort_best_selling,
                sort_new: options?.sort_new,
            });
            const raw = res?.data?.data ?? (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
            const products = (Array.isArray(raw) ? raw : []).map((p: Record<string, unknown>) => mapProduct(p));
            const pagination = res?.data?.pagination ?? null;
            return { products, pagination };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const p = lastPage.pagination;
            if (!p || typeof p !== "object") return undefined;
            const page = (p as { page?: number }).page ?? 1;
            const totalPages = (p as { total_pages?: number }).total_pages ?? 1;
            return page < totalPages ? page + 1 : undefined;
        },
        enabled: category_id != null,
    });
}
