"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useCategories } from "@/app/hooks/useCategories";
import CategoryContent, { nameToSlug } from "../_components/CategoryContent";

export default function SubCategoryPage() {
    const params = useParams();
    const router = useRouter();
    const gender = (params.gender === "men" || params.gender === "women") ? params.gender : "men";
    const slug = typeof params.slug === "string" ? params.slug : "";
    const subSlug = typeof params.subSlug === "string" ? params.subSlug : "";

    const { data: apiCategories = [], isFetched } = useCategories();
    const sexDegree = gender === "men" ? 1 : 2;

    const isValidSub = useMemo(() => {
        const category = apiCategories.find((c) => c.sex_degree === sexDegree && nameToSlug(c.name) === slug);
        if (!category) return false;
        return category.sub_categories.some((s) => nameToSlug(s.name) === subSlug);
    }, [apiCategories, sexDegree, slug, subSlug]);

    useEffect(() => {
        if (isFetched && apiCategories.length > 0 && !isValidSub) {
            router.replace(`/${gender}/${slug}`);
        }
    }, [isFetched, apiCategories.length, isValidSub, gender, slug, router]);

    if (isFetched && apiCategories.length > 0 && !isValidSub) {
        return null;
    }

    return <CategoryContent gender={gender} slug={slug} subSlug={subSlug} />;
}
