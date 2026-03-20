"use client";

import { useQuery } from "@tanstack/react-query";
import { showProductList } from "@/app/api/api";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

export function useProductList(
    category_id: number | undefined,
    sex_degree: number,
    options?: { sub_category_id?: number; page?: number; limit?: number }
) {
    const page = options?.page ?? DEFAULT_PAGE;
    const limit = options?.limit ?? DEFAULT_LIMIT;

    return useQuery({
        queryKey: ["products", category_id, sex_degree, options?.sub_category_id ?? null, page, limit],
        queryFn: async () => {
            if (category_id == null) return [];
            const res = await showProductList(category_id, sex_degree, {
                sub_category_id: options?.sub_category_id,
                page,
                limit,
            });
            if (Array.isArray(res)) return res;
            if (res?.data && Array.isArray(res.data)) return res.data;
            return [];
        },
        enabled: category_id != null,
    });
}
