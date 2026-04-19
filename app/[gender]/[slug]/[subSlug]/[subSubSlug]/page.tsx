"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useCategories } from "@/app/hooks/useCategories";
import CategoryContent from "../../_components/CategoryContent";
import { nameToSlug } from "@/lib/nameToSlug";
import { categoryMatchesGender } from "@/lib/categoryGender";

export default function SubSubCategoryPage() {
    const params = useParams();
    const router = useRouter();
    const gender = params.gender === "men" || params.gender === "women" ? params.gender : "men";
    const slug = typeof params.slug === "string" ? params.slug : "";
    const subSlug = typeof params.subSlug === "string" ? params.subSlug : "";
    const subSubSlug = typeof params.subSubSlug === "string" ? params.subSubSlug : "";

    const { data: apiCategories = [], isFetched } = useCategories();
    const sexDegree = gender === "men" ? 1 : 2;

    const isValidSubSub = useMemo(() => {
        const category = apiCategories.find(
            (c) => categoryMatchesGender(c.sex_degree, sexDegree) && nameToSlug(c.name) === slug
        );
        if (!category) return false;
        const sub = category.sub_categories.find((s) => nameToSlug(s.name) === subSlug);
        const triples = sub?.sub_sub_categories ?? [];
        if (!sub || triples.length === 0) return false;
        return triples.some((ss) => nameToSlug(ss.name) === subSubSlug);
    }, [apiCategories, sexDegree, slug, subSlug, subSubSlug]);

    useEffect(() => {
        if (isFetched && apiCategories.length > 0 && !isValidSubSub) {
            router.replace(`/${gender}/${slug}/${subSlug}`);
        }
    }, [isFetched, apiCategories.length, isValidSubSub, gender, slug, subSlug, router]);

    if (isFetched && apiCategories.length > 0 && !isValidSubSub) {
        return null;
    }

    return <CategoryContent gender={gender} slug={slug} subSlug={subSlug} subSubSlug={subSubSlug} />;
}
