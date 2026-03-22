"use client";

import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/app/api/api";

export type ReviewItem = {
    id: number;
    quote: string;
    name: string;
    detail: string;
    image?: string;
};

function mapReview(raw: Record<string, unknown>): ReviewItem {
    const quote = (raw.description ?? raw.content ?? raw.quote ?? "") as string;
    const name = (raw.title ?? raw.user_name ?? raw.name ?? "Guest") as string;
    const detail = (raw.product_name ?? raw.detail ?? "") as string;
    const photo = raw.photo ?? raw.image ?? raw.image_url;
    return {
        id: (raw.id ?? 0) as number,
        quote,
        name,
        detail,
        image: typeof photo === "string" ? photo : undefined,
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

export function useReviews(options?: { page?: number; limit?: number; sort_target_id?: number }) {
    return useQuery({
        queryKey: ["reviews", options?.page, options?.limit, options?.sort_target_id],
        queryFn: async () => {
            const res = await getReviews({
                page: options?.page ?? 1,
                limit: options?.limit ?? 10,
                sort_target_id: options?.sort_target_id,
            });
            const raw = extractData(res);
            return raw.map(mapReview);
        },
    });
}
