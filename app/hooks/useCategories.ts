"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/api/api";

export type ApiSubSubCategory = { id: number; name: string };

export type ApiSubCategory = {
    id: number;
    name: string;
    sub_sub_categories?: ApiSubSubCategory[];
};

export type ApiCategory = {
    id: number;
    name: string;
    sex_degree: number;
    sub_categories: ApiSubCategory[];
};

const CATEGORIES_QUERY_KEY = ["categories"] as const;

export function useCategories() {
    return useQuery({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: async () => {
            const res = await getCategories();
            if (res?.data && Array.isArray(res.data)) return res.data as ApiCategory[];
            return [];
        },
    });
}
