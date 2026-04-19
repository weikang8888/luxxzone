import type { Metadata } from "next";
import { getProductDetail } from "@/app/api/api";
import { SITE_ORIGIN, defaultBrandOgImageUrl, productCanonicalUrl } from "@/lib/constants";

function toAbsoluteImageUrl(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return `${SITE_ORIGIN}${url}`;
    return `${SITE_ORIGIN}/${url}`;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
        return { title: "Product | LUXXZONE" };
    }

    let title = "Product";
    let description = "Curated fashion collection for the modern individual.";
    let imageUrl = defaultBrandOgImageUrl();

    try {
        const res = await getProductDetail(id);
        const raw = (res as { data?: unknown })?.data ?? res;
        if (raw && typeof raw === "object") {
            const record = raw as Record<string, unknown>;
            const name = (record.title ?? record.name ?? "") as string;
            if (name) title = name;
            const desc = (record.description ?? "") as string;
            if (typeof desc === "string" && desc.trim()) description = desc.slice(0, 160);
            const imageList = record.image_list;
            if (Array.isArray(imageList)) {
                const first = imageList.find((u): u is string => typeof u === "string");
                if (first) imageUrl = toAbsoluteImageUrl(first);
            }
        }
    } catch {
        /* keep defaults */
    }

    const canonical = productCanonicalUrl(id);

    return {
        title: `${title} | LUXXZONE`,
        description,
        alternates: { canonical },
        openGraph: {
            title: `${title} | LUXXZONE`,
            description,
            url: canonical,
            siteName: "LUXXZONE",
            images: [{ url: imageUrl, alt: title }],
            type: "website",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | LUXXZONE`,
            description,
            images: [imageUrl],
        },
    };
}

export default function ProductSegmentLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
