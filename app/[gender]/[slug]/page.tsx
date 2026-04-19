"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CategoryContent from "./_components/CategoryContent";
import { nameToSlug } from "@/lib/nameToSlug";
import { useCategories } from "@/app/hooks/useCategories";
import { categoryMatchesGender } from "@/lib/categoryGender";

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const gender = (params.gender === "men" || params.gender === "women") ? params.gender : "men";
    const slug = typeof params.slug === "string" ? params.slug : "";
    const subParam = searchParams.get("sub");

    const { data: apiCategories = [], isFetched } = useCategories();
    const sexDegree = gender === "men" ? 1 : 2;

    useEffect(() => {
        if (!subParam || !isFetched || apiCategories.length === 0) return;
        const subId = parseInt(subParam, 10);
        const category = apiCategories.find(
            (c) => categoryMatchesGender(c.sex_degree, sexDegree) && nameToSlug(c.name) === slug
        );
        const sub = category?.sub_categories.find((s) => s.id === subId);
        if (sub) {
            const rest = new URLSearchParams(searchParams.toString());
            rest.delete("sub");
            const qs = rest.toString();
            router.replace(`/${gender}/${slug}/${nameToSlug(sub.name)}${qs ? `?${qs}` : ""}`);
        } else {
            const rest = new URLSearchParams(searchParams.toString());
            rest.delete("sub");
            const qs = rest.toString();
            router.replace(`/${gender}/${slug}${qs ? `?${qs}` : ""}`);
        }
    }, [subParam, isFetched, apiCategories, sexDegree, slug, gender, router, searchParams]);

    if (subParam) return null;
    return <CategoryContent gender={gender} slug={slug} />;
}
