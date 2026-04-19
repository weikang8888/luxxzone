import type { ApiCategory } from "@/app/hooks/useCategories";
import { categoryMatchesGender } from "@/lib/categoryGender";
import { nameToSlug } from "@/lib/nameToSlug";

export type NavSubChild = { id: number; label: string; href: string };

/** Sub nav row: optional `children` when API exposes sub_sub_categories. */
export type NavSubItem = { id: number; label: string; href: string; children?: NavSubChild[] };

export type NavCategory = { id: number; label: string; slug: string; sub_categories: NavSubItem[] };

export function apiToNavCategories(
    data: ApiCategory[],
    sexDegree: 1 | 2,
    gender: "men" | "women"
): NavCategory[] {
    return data
        .filter((c) => categoryMatchesGender(c.sex_degree, sexDegree))
        .map((c) => {
            const slug = nameToSlug(c.name);
            const baseHref = `/${gender}/${slug}`;
            const sub_categories: NavSubItem[] = c.sub_categories.map((sub) => {
                const subSlug = nameToSlug(sub.name);
                const href = `/${gender}/${slug}/${subSlug}`;
                const triples = sub.sub_sub_categories ?? [];
                if (triples.length === 0) {
                    return { id: sub.id, label: sub.name, href };
                }
                return {
                    id: sub.id,
                    label: sub.name,
                    href,
                    children: triples.map((ss) => ({
                        id: ss.id,
                        label: ss.name,
                        href: `${href}/${nameToSlug(ss.name)}`,
                    })),
                };
            });
            if (sub_categories.length > 0) {
                sub_categories.unshift({ id: 0, label: "Shop All", href: baseHref });
            }
            return { id: c.id, label: c.name, slug, sub_categories };
        });
}
