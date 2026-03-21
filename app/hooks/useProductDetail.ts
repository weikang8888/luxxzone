"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/app/api/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export type ProductDetail = {
    id: number;
    name: string;
    description: string;
    collection?: string;
    images: string[];
    details?: string[];
};

function mapApiToProduct(raw: Record<string, unknown>): ProductDetail {
    const imageList = raw.image_list;
    const images = Array.isArray(imageList)
        ? imageList.filter((u): u is string => typeof u === "string")
        : [];
    const categoryName = raw.category_name as string | undefined;
    const subCategoryName = raw.sub_category_name as string | undefined;
    const collection = (raw.collection as string) ?? (categoryName && subCategoryName ? `${categoryName} / ${subCategoryName}` : categoryName ?? subCategoryName);
    return {
        id: raw.id as number,
        name: (raw.title ?? raw.name ?? "") as string,
        description: (raw.description ?? "") as string,
        collection,
        images: images.length > 0 ? images : [PLACEHOLDER_IMAGE],
        details: Array.isArray(raw.details) ? raw.details as string[] : undefined,
    };
}

export function useProductDetail(id: number | undefined) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            if (id == null) return null;
            const res = await getProductDetail(id);
            const raw = res?.data ?? res;
            if (!raw || typeof raw !== "object") return null;
            return mapApiToProduct(raw as Record<string, unknown>);
        },
        enabled: id != null,
    });
}
