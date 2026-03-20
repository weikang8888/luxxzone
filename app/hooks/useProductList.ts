"use client";

import { useQuery } from "@tanstack/react-query";
import { showProductList } from "@/app/api/api";

export function useProductList(category_id: number | undefined, sex_degree: number, sub_category_id?: number) {
    return useQuery({
        queryKey: ["products", category_id, sex_degree, sub_category_id ?? null],
        queryFn: async () => {
            if (category_id == null) return [];
            const res = await showProductList(category_id, sex_degree, sub_category_id);
            if (Array.isArray(res)) return res;
            if (res?.data && Array.isArray(res.data)) return res.data;
            return [];
        },
        enabled: category_id != null,
    });
}
